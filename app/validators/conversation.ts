import vine from '@vinejs/vine'

export const createConversationValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(1).maxLength(255).optional(),
    description: vine.string().minLength(1).maxLength(1024).optional(),
    userIds: vine
      .array(
        vine.number().exists(async (db, value) => {
          const userExists = await db.from('users').where('id', value).first()
          return !!userExists
        })
      )
      .minLength(1),
  })
)
