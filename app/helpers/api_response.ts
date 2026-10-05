import type { HttpContext } from '@adonisjs/core/http'

type Response = HttpContext['response']

export default class ApiResponse {
  static ok(response: Response, message: string, data?: unknown) {
    return response.ok(this.payload(message, data))
  }

  static created(response: Response, message: string, data?: unknown) {
    return response.created(this.payload(message, data))
  }

  private static payload(message: string, data?: unknown) {
    return {
      success: true,
      message,
      ...(data === undefined ? {} : { data }),
    }
  }
}
