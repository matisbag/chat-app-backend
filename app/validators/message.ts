import vine from '@vinejs/vine'

/**
 * Validator for creating a message
 */
export const createMessageValidator = vine.compile(
  vine.object({
    content: vine.string().minLength(1).maxLength(1024),
  })
)
