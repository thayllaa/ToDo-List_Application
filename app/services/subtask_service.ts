import Subtask from '#models/subtask'
import Task from '#models/task'
import { DateTime } from 'luxon'

export default class SubtaskService {
  /**
   * Lista todas as subtarefas de uma tarefa
   */
  async index(userId: number, taskId: number) {
    await Task.query()
      .where('id', taskId)
      .where('userId', userId)
      .whereNull('deleted_at')
      .firstOrFail()

    return await Subtask.query()
      .where('taskId', taskId)
      .whereNull('deleted_at')
      .orderBy('createdAt', 'desc')
  }

  /**
   * Busca uma subtask específica
   */
  async show(userId: number, taskId: number, subtaskId: number) {
    await Task.query()
      .where('id', taskId)
      .where('userId', userId)
      .whereNull('deleted_at')
      .firstOrFail()

    return await Subtask.query()
      .where('id', subtaskId)
      .where('taskId', taskId)
      .whereNull('deleted_at')
      .firstOrFail()
  }

  /**
   * Cria uma nova subtask
   */
  async store(
    userId: number,
    taskId: number,
    data: {
      title: string
      isCompleted?: boolean
    }
  ) {
    await Task.query()
      .where('id', taskId)
      .where('userId', userId)
      .whereNull('deleted_at')
      .firstOrFail()

    return await Subtask.create({
      title: data.title,
      isCompleted: data.isCompleted ?? false,
      taskId,
    })
  }

  /**
   * Atualiza uma subtask
   */
  async update(
    userId: number,
    taskId: number,
    subtaskId: number,
    data: {
      title?: string
      isCompleted?: boolean
    }
  ) {
    await Task.query()
      .where('id', taskId)
      .where('userId', userId)
      .whereNull('deleted_at')
      .firstOrFail()

    const subtask = await Subtask.query()
      .where('id', subtaskId)
      .where('taskId', taskId)
      .whereNull('deleted_at')
      .firstOrFail()
    subtask.merge(data)
    await subtask.save()

    return subtask
  }

  /**
   * Remove uma subtask logicamente
   */
  async destroy(userId: number, taskId: number, subtaskId: number) {
    await Task.query()
      .where('id', taskId)
      .where('userId', userId)
      .whereNull('deleted_at')
      .firstOrFail()

    const subtask = await Subtask.query()
      .where('id', subtaskId)
      .where('taskId', taskId)
      .whereNull('deleted_at')
      .firstOrFail()

    subtask.deletedAt = DateTime.now()
    await subtask.save()

    return subtask
  }
}
