import User from '#models/user'
import Message from '#models/message'
import Conversation from '#models/conversation'
import { BasePolicy } from '@adonisjs/bouncer'

export default class MessagePolicy extends BasePolicy {
  async viewList(user: User, conversation: Conversation): Promise<boolean> {
    const isUserInConversation = await conversation
      .related('users')
      .query()
      .where('user_id', user.id)
      .first()

    return !!isUserInConversation
  }
}
