import type { HttpContext } from '@adonisjs/core/http'
import CategoryService from '#services/category_service'
import ApiResponse from '../helpers/api_response.ts'

export default class CategoryController {
  private categoryService = new CategoryService()

  /**
   * Lista as categorias do usuário autenticado
   */
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const categories = await this.categoryService.index(user.id)

    return ApiResponse.ok(response, 'Categorias listadas com sucesso', categories)
  }

  /**
   * Busca uma categoria específica
   */
  async show({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const categoryId = params.id
    const category = await this.categoryService.show(user.id, categoryId)

    return ApiResponse.ok(response, 'Categoria encontrada com sucesso', category)
  }

  /**
   * Cria uma categoria
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const data = request.only(['name', 'color', 'icon'])
    const category = await this.categoryService.store(user.id, data)

    return ApiResponse.created(response, 'Categoria criada com sucesso', category)
  }

  /**
   * Atualiza uma categoria
   */
  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const categoryId = params.id
    const data = request.only(['name', 'color', 'icon'])
    const category = await this.categoryService.update(user.id, categoryId, data)

    return ApiResponse.ok(response, 'Categoria atualizada com sucesso', category)
  }

  /**
   * Remove uma categoria logicamente
   */
  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const categoryId = params.id

    await this.categoryService.destroy(user.id, categoryId)

    return ApiResponse.ok(response, 'Categoria removida com sucesso')
  }
}
