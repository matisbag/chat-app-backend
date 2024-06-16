import { DateTime } from 'luxon'
import Conversation from '#models/conversation'
import User from '#models/user'
import { BaseModel, afterCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Ws from '#services/ws_service'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare conversationId: string

  @belongsTo(() => Conversation)
  declare conversation: BelongsTo<typeof Conversation>

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @afterCreate()
  static async broadcastMessage(message: Message) {
    await message.load('user')
    Ws.io?.to(`conversation_${message.conversationId}`).emit('newMessage', message)
  }
}
