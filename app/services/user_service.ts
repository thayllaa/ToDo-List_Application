import User from '#models/user'

export default class UserService {
  /**
   * Lista todos os usuários
   */
  async getAll() {
    return await User.query().preload('categories').preload('tasks').orderBy('createdAt', 'desc')
  }

  /**
   * Cria um novo usuário e gera o token de acesso
   */
  async register(data: { username: string; email: string; password: string }) {
    const user = await User.create(data)
    const token = await User.accessTokens.create(user)

    return {
      message: 'Usuário registrado com sucesso',
      token: token.value!.release(),
      user,
    }
  }

  /**
   * Encontra um usuário pelo ID
   */
  async findById(id: number) {
    return await User.query().where('id', id).preload('categories').preload('tasks').firstOrFail()
  }

  /**
   * Autentica as credenciais e gera um token de acesso
   */
  async login(data: { email: string; password: string }) {
    const user = await User.verifyCredentials(data.email, data.password)
    const token = await User.accessTokens.create(user)

    return {
      message: 'Login realizado com sucesso',
      token,
      user,
    }
  }

  /**
   * Atualiza os dados de um usuário
   */
  async update(
    id: number,
    data: {
      username?: string
      email?: string
      password?: string
    }
  ) {
    const user = await User.findOrFail(id)
    user.merge(data)
    await user.save()

    return user
  }

  /**
   * Realiza logout revogando o token atual
   */
  async logout(user: User) {
    const currentAccessToken = user.currentAccessToken

    if (currentAccessToken) {
      await User.accessTokens.delete(user, currentAccessToken.identifier)
    }

    return {
      message: 'Logout realizado com sucesso',
    }
  }
}
