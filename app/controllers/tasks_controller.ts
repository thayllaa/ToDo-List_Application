import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import TaskService from '../services/task_service.ts'
import ApiResponse from '../helpers/api_response.ts'

@inject()
export default class TasksController {
  constructor(protected taskService: TaskService) {}

  /**
   * Lista todas as tarefas do usuário autenticado
   */
  async index({ auth, request, response }: HttpContext) {
    const user = auth.user!

    const filters = {
      search: request.input('search'),
      status: request.input('status'),
      priority: request.input('priority'),
      categoryId: request.input('categoryId') ? Number(request.input('categoryId')) : undefined,
      tagId: request.input('tagId') ? Number(request.input('tagId')) : undefined,
      dueDateStart: request.input('dueDateStart'),
      dueDateEnd: request.input('dueDateEnd'),
    }

    const page = Math.max(Number(request.input('page', 1)), 1)
    const perPage = Math.min(Math.max(Number(request.input('perPage', 10)), 1), 100)

    const tasks = await this.taskService.getAll(Number(user.id), filters, page, perPage)

    return ApiResponse.ok(response, 'Tarefas listadas com sucesso', tasks)
  }

  /**
   * Cria uma nova tarefa
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!

    const payload = request.only([
      'categoryId',
      'title',
      'description',
      'status',
      'priority',
      'dueDate',
    ])

    const task = await this.taskService.create(Number(user.id), payload)

    return ApiResponse.created(response, 'Tarefa criada com sucesso', task)
  }

  /**
   * Adiciona uma tag a uma tarefa
   */
  async addTag({ auth, params, response }: HttpContext) {
    const user = auth.user!

    const task = await this.taskService.addTag(
      Number(user.id),
      Number(params.id),
      Number(params.tagId)
    )

    return ApiResponse.ok(response, 'Tag adicionada à tarefa com sucesso', task)
  }

  /**
   * Remove uma tag de uma tarefa
   */
  async removeTag({ auth, params, response }: HttpContext) {
    const user = auth.user!

    const task = await this.taskService.removeTag(
      Number(user.id),
      Number(params.id),
      Number(params.tagId)
    )

    return ApiResponse.ok(response, 'Tag removida da tarefa com sucesso', task)
  }

  /**
   * Exibe uma tarefa específica
   */
  async show({ auth, params, response }: HttpContext) {
    const user = auth.user!

    const task = await this.taskService.findById(Number(user.id), Number(params.id))

    return ApiResponse.ok(response, 'Tarefa encontrada com sucesso', task)
  }

  /**
   * Atualiza uma tarefa
   */
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!

    const payload = request.only([
      'categoryId',
      'title',
      'description',
      'status',
      'priority',
      'dueDate',
      'completedAt',
    ])

    const task = await this.taskService.update(Number(user.id), Number(params.id), payload)

    return ApiResponse.ok(response, 'Tarefa atualizada com sucesso', task)
  }

  /**
   * Deleta uma tarefa utilizando exclusão lógica
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!

    const task = await this.taskService.delete(Number(user.id), Number(params.id))

    return ApiResponse.ok(response, 'Tarefa deletada com sucesso', {
      deletedAt: task.deletedAt,
    })
  }
}
