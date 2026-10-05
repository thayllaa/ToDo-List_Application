import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import SubtaskService from '#services/subtask_service'
import ApiResponse from '../helpers/api_response.ts'

@inject()
export default class SubtaskController {
  constructor(private subtaskService: SubtaskService) { }

  /**
   * Lista as subtarefas de uma tarefa
   */
  async index({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const taskId = Number(params.taskId)

    const subtasks = await this.subtaskService.index(user.id, taskId)

    return ApiResponse.ok(response, 'Subtarefas listadas com sucesso', subtasks)
  }

  /**
   * Busca uma subtarefa específica
   */
  async show({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const taskId = Number(params.taskId)
    const subtaskId = params.id

    const subtask = await this.subtaskService.show(user.id, taskId, subtaskId)

    return ApiResponse.ok(response, 'Subtarefa encontrada com sucesso', subtask)
  }

  /**
   * Cria uma nova subtarefa
   */
  async store({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const taskId = Number(params.taskId)

    const data = request.only(['title', 'isCompleted'])

    const subtask = await this.subtaskService.store(user.id, taskId, data)

    return ApiResponse.created(response, 'Subtarefa criada com sucesso', subtask)
  }

  /**
   * Atualiza uma subtarefa
   */
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const taskId = Number(params.taskId)
    const subtaskId = params.id

    const data = request.only(['title', 'isCompleted'])

    const subtask = await this.subtaskService.update(user.id, taskId, subtaskId, data)

    return ApiResponse.ok(response, 'Subtarefa atualizada com sucesso', subtask)
  }

  /**
   * Remove uma subtarefa logicamente
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const taskId = Number(params.taskId)
    const subtaskId = params.id

    await this.subtaskService.destroy(user.id, taskId, subtaskId)

    return ApiResponse.ok(response, 'Subtarefa removida com sucesso')
  }
}
