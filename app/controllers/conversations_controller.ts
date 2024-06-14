import Conversation from '#models/conversation'
import type { HttpContext } from '@adonisjs/core/http'

export default class ConversationsController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    return await auth.user?.related('conversations').query().preload('lastMessage')
    // .join('messages', 'conversations.id', 'messages.conversation_id')
    // .orderBy('messages.id')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
