import type { HttpContext } from '@adonisjs/core/http'
import CommentService from '#services/comment_service'
import { inject } from '@adonisjs/core'
import ApiResponse from '../helpers/api_response.ts'

@inject()
export default class CommentsController {
  constructor(private commentService: CommentService) {}

  /**
   * Lista os comentários de uma task.
   */
  async index({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const userId = Number(user.id)
    const taskId = Number(params.taskId)

    const comments = await this.commentService.index(userId, taskId)

    return ApiResponse.ok(response, 'Comentários listados com sucesso', comments)
  }

  /**
   * Exibe um comentário.
   */
  async show({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const userId = Number(user.id)
    if (!userId) {
      return response.unauthorized({ message: 'Usuário nao autenticado' })
    }

    const taskId = Number(params.taskId)
    if (!taskId) {
      return response.badRequest({ message: 'Tarefa nao encontrada' })
    }

    const comment = await this.commentService.show(userId, taskId, params.id)
    if (!comment) {
      return response.notFound({ message: 'Comentário nao encontrado' })
    }

    return ApiResponse.ok(response, 'Comentário encontrado com sucesso', comment)
  }

  /**
   * Cria um comentário.
   */
  async store({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const userId = Number(user.id)
    const taskId = Number(params.taskId)

    const payload = request.only(['content'])
    const comment = await this.commentService.store(userId, taskId, payload)

    return ApiResponse.created(response, 'Comentário criado com sucesso', comment)
  }

  /**
   * Atualiza um comentário.
   */
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const userId = Number(user.id)
    const taskId = Number(params.taskId)

    const payload = request.only(['content'])
    const comment = await this.commentService.update(userId, taskId, params.id, payload)

    return ApiResponse.ok(response, 'Comentário atualizado com sucesso', comment)
  }

  /**
   * Exclui um comentário.
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const userId = Number(user.id)
    const taskId = Number(params.taskId)

    await this.commentService.destroy(userId, taskId, params.id)

    return ApiResponse.ok(response, 'Comentário excluído com sucesso')
  }
}
