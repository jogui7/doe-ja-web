import React, { FocusEvent } from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { Field } from 'react-final-form'

type RFFTextFieldProps = TextFieldProps & {
  name: string
  initialValue?: unknown
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

function RFFTextField({ name, initialValue, ...rest }: RFFTextFieldProps) {
  return (
    <Field name={name} initialValue={initialValue}>
      {({ input, meta }) => (
        <TextField
          {...input}
          {...rest}
          error={meta.touched && !!meta.error}
          helperText={meta && meta.error}
          onBlur={(event) => handleOnBlur(event, [input.onBlur, rest.onBlur])}
        />
      )}
    </Field>
  )
}

RFFTextField.defaultProps = {
  initialValue: '',
}

export default RFFTextField
