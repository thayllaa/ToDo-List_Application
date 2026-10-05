import Tag from '#models/tag'

export default class TagService {
  /**
   * Lista todas as tags do usuário autenticado
   */
  async getAll(userId: number) {
    return await Tag.query().where('userId', userId).preload('tasks').orderBy('createdAt', 'desc')
  }

  /**
   * Cria uma nova tag vinculada ao usuário
   */
  async create(
    userId: number,
    data: {
      name: string
      color?: string | null
    }
  ) {
    const tag = await Tag.create({
      ...data,
      userId,
    })

    return tag
  }

  /**
   * Encontra uma tag específica do usuário
   */
  async findById(userId: number, id: number) {
    return await Tag.query().where('id', id).where('userId', userId).preload('tasks').firstOrFail()
  }

  /**
   * Atualiza uma tag do usuário
   */
  async update(
    userId: number,
    id: number,
    data: {
      name?: string
      color?: string | null
    }
  ) {
    const tag = await this.findById(userId, id)
    tag.merge(data)
    await tag.save()

    return tag
  }

  /**
   * Deleta uma tag do usuário
   */
  async delete(userId: number, id: number) {
    const tag = await this.findById(userId, id)
    await tag.delete()

    return true
  }

  /**
   * Vincula uma tag a uma tarefa
   */
  async attachToTask(userId: number, tagId: number, taskId: number) {
    const tag = await this.findById(userId, tagId)
    await tag.related('tasks').attach([taskId])

    return await this.findById(userId, tagId)
  }

  /**
   * Remove uma tag de uma tarefa
   */
  async detachFromTask(userId: number, tagId: number, taskId: number) {
    const tag = await this.findById(userId, tagId)
    await tag.related('tasks').detach([taskId])

    return await this.findById(userId, tagId)
  }
}
