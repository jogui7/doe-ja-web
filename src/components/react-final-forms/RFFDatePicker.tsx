/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValidator } from 'final-form'
import { Field } from 'react-final-form'
import {
  DateTimePicker,
  DateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker'
import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import 'moment/locale/pt-br'

type RFFDatePickerProps = {
  name: string
  validate?: FieldValidator<Date | string | null>
  fullWidth?: boolean
  value?: Date | null
  onChange?: (date: any) => void
  inputVariant?: 'standard' | 'outlined' | 'filled'
  variant?: 'dialog' | 'inline' | 'static'
} & Omit<DateTimePickerProps<any, any>, 'renderInput'>

function RFFDatePicker({ name, validate, ...otherProps }: RFFDatePickerProps) {
  return (
    <Field name={name} validate={validate}>
      {({ input, ...props }) => (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-BR">
          <DateTimePicker
            {...input}
            {...props}
            {...otherProps}
            value={input.value || null}
            onChange={(date: any) => input.onChange(date)}
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth />
            )}
          />
        </LocalizationProvider>
      )}
    </Field>
  )
}

RFFDatePicker.defaultProps = {
  inputVariant: 'outlined',
  variant: 'inline',
  fullWidth: false,
  value: null,
  onChange: () => ({}),
  validate: () => ({}),
}

export default RFFDatePicker
