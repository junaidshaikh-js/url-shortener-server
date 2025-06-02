import { ZodSchema } from 'zod'

export const validate = <T>(schema: ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data)
  if (!result.success) {
    const error = result.error.errors[0].message
    throw new Error(error)
  }
  return result.data
}
