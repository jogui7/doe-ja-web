import {
  InputBaseComponentProps,
  TextField,
  TextFieldProps,
} from '@mui/material'
import MaskedInput from 'react-text-mask'

function CustomTextMask({ mask, ...props }: InputBaseComponentProps) {
  return (
    <MaskedInput
      {...props}
      ref={(ref) => (ref ? ref.inputElement : null)}
      mask={mask}
    />
  )
}

export type MaskedFieldProps = TextFieldProps & {
  mask: Array<string | RegExp> | ((value: string) => Array<string | RegExp>)
}

function MaskedField({
  mask,
  label,
  inputProps,
  InputProps,
  ...props
}: MaskedFieldProps) {
  return (
    <TextField
      label={label}
      inputProps={{ mask, ...inputProps }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      InputProps={{
        inputComponent: CustomTextMask,
        ...InputProps,
      }}
      {...props}
    />
  )
}

export default MaskedField
