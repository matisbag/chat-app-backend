import factory from '@adonisjs/lucid/factories'
import Conversation from '#models/conversation'
import { UserFactory } from './user_factory.js'
import { MessageFactory } from './message_factory.js'

export const ConversationFactory = factory
  .define(Conversation, async ({ faker }) => {
    return {}
  })
  .relation('users', () => UserFactory)
  .relation('messages', () => MessageFactory)
  .build()
