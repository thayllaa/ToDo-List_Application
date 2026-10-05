import { DateTime } from 'luxon'
import Comment from '#models/comment'
import Task from '#models/task'

export default class CommentService {
  /**
   * Lista todos os comentários de uma task.
   */
  async index(userId: number, taskId: number) {
    const task = await Task.query()
      .where('id', taskId)
      .where('userId', userId)
      .whereNull('deletedAt')
      .first()

    if (!task) {
      throw new Error('Tarefa não encontrada')
    }

    return await Comment.query()
      .where('taskId', taskId)
      .whereNull('deletedAt')
      .orderBy('createdAt', 'desc')
  }

  /**
   * Busca um comentário pelo ID.
   */
  async show(userId: number, taskId: number, commentId: number) {
    const task = await Task.query()
      .where('id', taskId)
      .where('userId', userId)
      .whereNull('deletedAt')
      .first()

    if (!task) {
      throw new Error('Tarefa nao encontrada')
    }

    return await Comment.query()
      .where('id', commentId)
      .where('taskId', taskId)
      .whereNull('deletedAt')
      .preload('tasks')
      .firstOrFail()
  }

  /**
   * Cria um comentário em uma task.
   */
  async store(
    userId: number,
    taskId: number,
    data: {
      content: string
    }
  ) {
    const task = await Task.query()
      .where('id', taskId)
      .where('userId', userId)
      .whereNull('deletedAt')
      .first()
    if (!task) {
      throw new Error('Tarefa nao encontrada')
    }
    return await Comment.create({
      content: data.content,
      taskId,
    })
  }

  /**
   * Atualiza um comentário.
   */
  async update(
    userId: number,
    taskId: number,
    commentId: number,
    data: {
      content?: string
    }
  ) {
    const task = await Task.query()
      .where('id', taskId)
      .where('userId', userId)
      .whereNull('deletedAt')
      .firstOrFail()
    if (!task) {
      throw new Error('Tarefa nao encontrada')
    }

    const comment = await Comment.query()
      .where('id', commentId)
      .where('taskId', taskId)
      .whereNull('deletedAt')
      .firstOrFail()

    comment.merge(data)
    await comment.save()

    return comment
  }

  /**
   * Exclui um comentário de forma lógica.
   */
  async destroy(userId: number, taskId: number, commentId: number) {
    const task = await Task.query()
      .where('id', taskId)
      .where('userId', userId)
      .whereNull('deletedAt')
      .firstOrFail()

    if (!task) {
      throw new Error('Tarefa nao encontrada')
    }

    const comment = await Comment.query()
      .where('id', commentId)
      .where('taskId', taskId)
      .whereNull('deletedAt')
      .first()

    if (!comment) {
      throw new Error('Comentario nao encontrado')
    }

    comment.deletedAt = DateTime.now()
    await comment.save()

    return comment
  }
}
