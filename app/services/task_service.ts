import Tag from '#models/tag'
import Task from '#models/task'
import { DateTime } from 'luxon'

interface TaskFilters {
  search?: string
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  categoryId?: number
  tagId?: number
  dueDateStart?: string
  dueDateEnd?: string
  page?: number
  perPage?: number
}

export default class TaskService {
  /**
   * Lista todas as tarefas de um usuário específico
   */
  async getAll(userId: number, filters: TaskFilters = {}, page: number = 1, perPage: number = 10) {
    const query = Task.query()
      .where('userId', userId)
      .whereNull('deletedAt')
      .preload('category')
      .preload('subtasks')
      .preload('comments')
      .preload('tags')

    // Pesquisa textual
    if (filters.search && filters.search.trim() !== '') {
      const search = `%${filters.search.trim()}%`

      query.where((builder) => {
        builder.where('title', 'like', search).orWhere('description', 'like', search)
      })
    }

    // Filtro por status
    if (filters.status) {
      query.where('status', filters.status)
    }

    // Filtro por prioridade
    if (filters.priority) {
      query.where('priority', filters.priority)
    }

    // Filtro por categoria
    if (filters.categoryId !== undefined) {
      query.where('categoryId', filters.categoryId)
    }

    // Filtro por tag
    if (filters.tagId !== undefined) {
      const tagId = filters.tagId
      query.whereHas('tags', (tagQuery) => {
        tagQuery.where('tags.id', tagId)
      })
    }

    // Data inicial
    if (filters.dueDateStart) {
      query.where('dueDate', '>=', filters.dueDateStart)
    }

    // Data final
    if (filters.dueDateEnd) {
      query.where('dueDate', '<=', filters.dueDateEnd)
    }

    return await query.orderBy('createdAt', 'desc').paginate(page, perPage)
  }

  /**
   * Cria uma nova tarefa vinculada ao usuário
   */
  async create(userId: number, data: any) {
    const task = await Task.create({
      ...data,
      userId,
      status: data.status ?? 'pending',
      priority: data.priority ?? 'medium',
    })

    await task.load('category')

    return task
  }

  /**
   * Adiciona uma tag a uma tarefa
   */
  async addTag(userId: number, taskId: number, tagId: number) {
    // Verifica se a tarefa pertence ao usuário
    const task = await Task.query()
      .where('id', taskId)
      .where('userId', userId)
      .whereNull('deletedAt')
      .firstOrFail()

    // Verifica se a tag pertence ao usuário
    await Tag.query().where('id', tagId).where('userId', userId).firstOrFail()

    // Adiciona a relação na tabela task_tags
    await task.related('tags').attach([tagId])

    // Recarrega as tags
    await task.load('tags')

    return task
  }

  /**
   * Remove uma tag de uma tarefa
   */
  async removeTag(userId: number, taskId: number, tagId: number) {
    const task = await Task.query()
      .where('id', taskId)
      .where('userId', userId)
      .whereNull('deletedAt')
      .firstOrFail()

    // Verifica se a tag pertence ao usuário
    await Tag.query().where('id', tagId).where('userId', userId).firstOrFail()

    await task.related('tags').detach([tagId])

    await task.load('tags')

    return task
  }

  /**
   * Encontra uma tarefa específica do usuário pelo ID
   */
  async findById(userId: number, id: number) {
    return await Task.query()
      .where('id', id)
      .where('userId', userId)
      .whereNull('deletedAt')
      .preload('category')
      .preload('subtasks')
      .preload('comments')
      .preload('tags')
      .firstOrFail()
  }

  /**
   * Atualiza uma tarefa do usuário
   */
  async update(userId: number, id: number, data: any) {
    const task = await this.findById(userId, id)

    task.merge(data)

    // Preenche automaticamente a data de conclusão
    if (data.status === 'completed' && !task.completedAt) {
      task.completedAt = DateTime.now()
    }

    // Remove a data de conclusão caso a tarefa deixe de estar concluída
    if (data.status && data.status !== 'completed') {
      task.completedAt = null
    }

    await task.save()

    await task.load('category')
    await task.load('subtasks')
    await task.load('comments')
    await task.load('tags')

    return task
  }

  /**
   * Deleta uma tarefa do usuário utilizando exclusão lógica
   */
  async delete(userId: number, id: number) {
    const task = await this.findById(userId, id)

    task.deletedAt = DateTime.now()

    await task.save()

    return task
  }
}
