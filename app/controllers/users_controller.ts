import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * List all users
   */
  async index({ request, auth }: HttpContext) {
    const userId = auth.user?.id as number
    const pseudo = request.input('pseudo')

    const users = User.query().whereNot('id', userId).limit(10)

    if (pseudo) {
      users.where('pseudo', 'like', `%${pseudo}%`)
    }

    return users
  }
}
