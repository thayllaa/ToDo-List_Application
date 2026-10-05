import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import TagService from '#services/tag_service'
import ApiResponse from '../helpers/api_response.ts'

@inject()
export default class TagsController {
  constructor(protected tagService: TagService) { }

  /**
   * Lista todas as tags do usuário autenticado
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    if (!user) {
      return response.unauthorized({ message: 'Usuário não autenticado' })
    }
    const tags = await this.tagService.getAll(user.id)
    if (!tags) {
      return response.notFound({ message: 'Nenhuma tag encontrada' })
    }
    return ApiResponse.ok(response, 'Tags listadas com sucesso', tags)
  }

  /**
   * Cria uma nova tag
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    if (!user) {
      return response.unauthorized({ message: 'Usuário não autenticado' })
    }
    const payload = request.only(['name', 'color'])
    if (!payload) {
      return response.badRequest({ message: 'Dados incompletos' })
    }
    const tag = await this.tagService.create(user.id, payload)
    if (!tag) {
      return response.badRequest({ message: 'Erro ao criar tag' })
    }

    return ApiResponse.created(response, 'Tag criada com sucesso', tag)
  }

  /**
   * Exibe uma tag específica
   */
  async show({ auth, params, response }: HttpContext) {
    const user = auth.user!
    if (!user) {
      return response.unauthorized({ message: 'Usuário não autenticado' })
    }
    const tag = await this.tagService.findById(user.id, params.id)
    if (!tag) {
      return response.notFound({ message: 'Tag nao encontrada' })
    }

    return ApiResponse.ok(response, 'Tag encontrada com sucesso', tag)
  }

  /**
   * Atualiza uma tag
   */
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    if (!user) {
      return response.unauthorized({ message: 'Usuário não autenticado' })
    }

    const payload = request.only(['name', 'color'])
    if (!payload) {
      return response.badRequest({ message: 'Dados incompletos' })
    }

    const tag = await this.tagService.update(user.id, params.id, payload)
    if (!tag) {
      return response.badRequest({ message: 'Erro ao atualizar tag' })
    }

    return ApiResponse.ok(response, 'Tag atualizada com sucesso', tag)
  }

  /**
   * Deleta uma tag
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!
    if (!user) {
      return response.unauthorized({ message: 'Usuário não autenticado' })
    }

    await this.tagService.delete(user.id, params.id)
    return ApiResponse.ok(response, 'Tag deletada com sucesso')
  }

  /**
   * Vincula uma tag a uma tarefa
   */
  async attachToTask({ auth, params, response }: HttpContext) {
    const user = auth.user!
    if (!user) {
      return response.unauthorized({ message: 'Usuário não autenticado' })
    }

    const tag = await this.tagService.attachToTask(user.id, params.id, params.taskId)
    if (!tag) {
      return response.badRequest({ message: 'Erro ao vincular tag' })
    }

    return ApiResponse.ok(response, 'Tag vinculada à tarefa com sucesso', tag)
  }

  /**
   * Remove uma tag de uma tarefa
   */
  async detachFromTask({ auth, params, response }: HttpContext) {
    const user = auth.user!
    if (!user) {
      return response.unauthorized({ message: 'Usuário não autenticado' })
    }

    const tag = await this.tagService.detachFromTask(user.id, params.id, params.taskId)
    if (!tag) {
      return response.badRequest({ message: 'Erro ao remover tag' })
    }

    return ApiResponse.ok(response, 'Tag removida da tarefa com sucesso', tag)
  }
}
