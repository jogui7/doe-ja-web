import { setIn } from 'final-form'
import { BaseSchema, ValidationError } from 'yup'

const yupValidation = (schema: BaseSchema) => async (data: unknown) => {
  try {
    await schema.validate(data, { abortEarly: false })
    return {}
  } catch (err) {
    const error = err as ValidationError
    const errors = error.inner?.reduce(
      (formError, innerError) =>
        setIn(formError, innerError.path || '', innerError.message),
      {}
    )
    return errors
  }
}

export default yupValidation
