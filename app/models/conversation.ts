import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Message from '#models/message'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { v4 as uuid } from 'uuid'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignAvatar(conversation: Conversation) {
    conversation.id = uuid() as string
  }

  @column()
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
}
