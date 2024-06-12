import { ConversationFactory } from '#database/factories/conversation_factory'
import { MessageFactory } from '#database/factories/message_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const NUM_CONVERSATIONS = getRandomNumber(5, 10)
    const NUM_USERS_PER_CONVERSATION = getRandomNumber(2, 5)
    const NUM_MESSAGES_PER_CONVERSATION = getRandomNumber(5, 10)
    const NUM_MESSAGES_PER_USER = getRandomNumber(1, 3)

    const conversations = await ConversationFactory.with(
      'users',
      NUM_USERS_PER_CONVERSATION
    ).createMany(NUM_CONVERSATIONS)

    for (const conversation of conversations) {
      const users = await conversation.related('users').query()
      for (let i = 0; i < NUM_MESSAGES_PER_CONVERSATION; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)]
        const randomUserId = randomUser.id

        await MessageFactory.merge({
          userId: randomUserId,
          conversationId: conversation.id,
        }).createMany(NUM_MESSAGES_PER_USER)
      }
    }
  }
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
