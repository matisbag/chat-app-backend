import Conversation from '#models/conversation'
import MessagePolicy from '#policies/message_policy'
import { createMessageValidator } from '#validators/message'
import type { HttpContext } from '@adonisjs/core/http'

export default class MessagesController {
  /**
   * Display a list of resource
   */
  async index({ params, bouncer }: HttpContext) {
    const conversation = await Conversation.findOrFail(params.id)

    await bouncer.with(MessagePolicy).authorize('viewList', conversation)

    const messages = conversation
      .related('messages')
      .query()
      .preload('user')
      .orderBy('created_at', 'desc')

    return messages
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request, auth, bouncer }: HttpContext) {
    const conversation = await Conversation.findOrFail(params.id)

    await bouncer.with(MessagePolicy).authorize('create', conversation)

    const payload = await request.validateUsing(createMessageValidator)

    const message = await conversation.related('messages').create({
      ...payload,
      userId: auth.user!.id,
    })

    return message
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
