import Conversation from '#models/conversation'
import { createConversationValidator } from '#validators/conversation'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ConversationsController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    const lastMessageQuery = db
      .raw(
        `(SELECT MAX(messages.created_at) FROM messages WHERE messages.conversation_id = conversations.id)`
      )
      .wrap('(', ') as last_message_created_at')

    return await auth.user
      ?.related('conversations')
      .query()
      .select('*', lastMessageQuery)
      .preload('lastMessage')
      .orderBy('last_message_created_at', 'desc')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(createConversationValidator)

    // create a conversation
    const conversation = await Conversation.create({
      title: payload.title,
      description: payload.description,
    })

    // attach users to the conversation
    await conversation.related('users').attach([auth.user!.id, ...payload.userIds])

    await conversation.load('users')

    return conversation
  }

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
