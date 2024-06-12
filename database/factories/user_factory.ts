import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { ConversationFactory } from './conversation_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      pseudo: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('conversations', () => ConversationFactory)
  .build()
