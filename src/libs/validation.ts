import { ZodSchema } from 'zod'

export const validate = <T>(schema: ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw result.error
  }
  return result.data
}
