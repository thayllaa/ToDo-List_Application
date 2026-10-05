import { ExceptionHandler, type HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { errors as vineErrors } from '@vinejs/vine'
import { errors as authErrors } from '@adonisjs/auth'
import { errors as lucidErrors } from '@adonisjs/lucid'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: any, ctx: HttpContext) {
    // Validação (VineJS)
    if (error instanceof vineErrors.E_VALIDATION_ERROR) {
      return ctx.response.status(422).send({
        success: false,
        message: 'Dados inválidos',
        errors: error.messages,
      })
    }

    // Registro não encontrado (findOrFail)
    if (error instanceof lucidErrors.E_ROW_NOT_FOUND) {
      return ctx.response.status(404).send({
        success: false,
        message: 'Registro não encontrado',
      })
    }

    // Autenticação
    if (error instanceof authErrors.E_INVALID_CREDENTIALS) {
      return ctx.response.status(401).send({
        success: false,
        message: 'Credenciais inválidas',
      })
    }

    // Duplicidade no MySQL (seu caso)
    if (error.code === 'ER_DUP_ENTRY') {
      return ctx.response.status(409).send({
        success: false,
        message: 'Registro já existe',
        errors: [{ field: this.extractField(error.sqlMessage), rule: 'unique' }],
      })
    }

    return super.handle(error, ctx)
  }

  private extractField(sqlMessage: string) {
    // "Duplicate entry 'thalya' for key 'users.users_username_unique'"
    return sqlMessage?.match(/key '\w+\.(\w+)_unique'/)?.[1]?.replace(/^\w+?_/, '')
  }
}
