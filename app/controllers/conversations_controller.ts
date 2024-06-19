import Conversation from '#models/conversation'
import { createConversationValidator, updateConversationValidator } from '#validators/conversation'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ConversationsController {
  /**
   * List all conversations
   */
  async index({ auth }: HttpContext) {
    const userId = auth.user?.id as number

    const lastMessageQuery = db
      .raw(
        `(SELECT MAX(messages.created_at) FROM messages WHERE messages.conversation_id = conversations.id)`
      )
      .wrap('(', ')')

    return await auth.user
      ?.related('conversations')
      .query()
      .preload('lastMessage')
      .preload('users', (usersQuery) => {
        usersQuery.whereNot('id', userId)
      })
      .orderBy(lastMessageQuery, 'desc')
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
  async update({ params, request, auth }: HttpContext) {
    const payload = await request.validateUsing(updateConversationValidator)

    const conversation = await Conversation.findOrFail(params.id)

    await conversation
      .merge({
        title: payload.title,
        description: payload.description,
      })
      .save()

    await conversation.related('users').sync([auth.user!.id, ...payload.userIds])

    return conversation.load('users')
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
