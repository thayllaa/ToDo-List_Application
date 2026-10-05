import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'
import ApiResponse from '../helpers/api_response.ts'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  /**
   * Lista todos os usuários
   */
  async index({ response }: HttpContext) {
    const users = await this.userService.getAll()
    return ApiResponse.ok(response, 'Usuários listados com sucesso', users)
  }

  /**
   * Cadastro (Register)
   */
  async store({ request, response }: HttpContext) {
    const payload = request.only(['username', 'email', 'password'])
    const result = await this.userService.register(payload)
    return ApiResponse.created(response, result.message, {
      user: result.user,
      token: result.token,
    })
  }

  /**
   * Login
   */
  async login({ request, response }: HttpContext) {
    const payload = request.only(['email', 'password'])
    const result = await this.userService.login(payload)
    return ApiResponse.ok(response, result.message, {
      user: result.user,
      token: result.token,
    })
  }

  /**
   * Exibe um usuário específico
   */
  async show({ params, response }: HttpContext) {
    const user = await this.userService.findById(Number(params.id))
    return ApiResponse.ok(response, 'Usuário encontrado com sucesso', user)
  }

  /**
   * Atualiza um usuário
   */
  async update({ params, request, response }: HttpContext) {
    const payload = request.only(['username', 'email', 'password'])
    const user = await this.userService.update(params.id, payload)
    return ApiResponse.ok(response, 'Usuário atualizado com sucesso', user)
  }

  /**
   * Logout
   */
  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const result = await this.userService.logout(user)
    return ApiResponse.ok(response, result.message)
  }

  /**
   * Retorna os dados do usuário autenticado
   */
  async me({ auth, response }: HttpContext) {
    const user = auth.user!
    return ApiResponse.ok(response, 'Dados do usuário autenticado', user)
  }
}
