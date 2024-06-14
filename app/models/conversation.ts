import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import {
  BaseModel,
  beforeCreate,
  column,
  computed,
  hasMany,
  hasOne,
  manyToMany,
} from '@adonisjs/lucid/orm'
import User from '#models/user'
import Message from '#models/message'
import type { HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(conversation: Conversation) {
    conversation.id = randomUUID()
  }

  @column({
    serialize: (value, _, model) => value || 'Conversation ' + model.id,
  })
  declare title: string | null

  @column()
  declare description: string | null

  @manyToMany(() => User)
  declare users: ManyToMany<typeof User>

  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Message, {
    onQuery: (query) => {
      query.orderBy('created_at', 'desc')
    },
  })
  declare lastMessage: HasOne<typeof Message>
}
