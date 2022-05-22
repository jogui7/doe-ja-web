import React, { FocusEvent } from 'react'
import { Field } from 'react-final-form'
import { FieldValidator } from 'final-form'
import MaskedField, { MaskedFieldProps } from '../inputs/MaskedField'

export type RFFMaskFieldProps = MaskedFieldProps & {
  name: string
  initialValue?: unknown
  mask: Array<string | RegExp> | ((value: string) => Array<string | RegExp>)
  validate?: FieldValidator<unknown>
}

const handleOnBlur = (
  event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  callbacks: Array<
    | ((e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void)
    | undefined
  >
) => {
  for (let index = 0; index < callbacks.length; index += 1) {
    const callback = callbacks[index]
    if (callback) {
      callback(event)
    }
  }
}

function RFFMaskedField({
  name,
  initialValue,
  validate,
  ...rest
}: RFFMaskFieldProps) {
  return (
    <Field name={name} validate={validate} initialValue={initialValue}>
      {({ input, meta }) => (
        <MaskedField
          {...input}
          {...rest}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          onBlur={(event) => handleOnBlur(event, [input.onBlur, rest.onBlur])}
        />
      )}
    </Field>
  )
}

RFFMaskedField.defaultProps = {
  validate: undefined,
  initialValue: '',
}

export default RFFMaskedField
