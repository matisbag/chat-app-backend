import User from '#models/user'
import Message from '#models/message'
import Conversation from '#models/conversation'
import { BasePolicy } from '@adonisjs/bouncer'

export default class MessagePolicy extends BasePolicy {
  private async isUserInConversation(user: User, conversation: Conversation): Promise<boolean> {
    const userInConversation = await conversation
      .related('users')
      .query()
      .where('user_id', user.id)
      .first()

    return !!userInConversation
  }

  async viewList(user: User, conversation: Conversation): Promise<boolean> {
    return this.isUserInConversation(user, conversation)
  }

  async create(user: User, conversation: Conversation): Promise<boolean> {
    return this.isUserInConversation(user, conversation)
  }
}
