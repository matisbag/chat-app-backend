import factory from '@adonisjs/lucid/factories'
import Message from '#models/message'
import { ConversationFactory } from './conversation_factory.js'
import { UserFactory } from './user_factory.js'

export const MessageFactory = factory
  .define(Message, async ({ faker }) => {
    return {
      content: faker.lorem.sentence(),
    }
  })
  .relation('conversation', () => ConversationFactory)
  .relation('user', () => UserFactory)
  .build()
