import { Field } from 'react-final-form'
import RadioGroup from '../inputs/RadioGroup'

type RFFRadioGroupProps = {
  name: string
  label: string
  items: Array<{ label: string; value: boolean; disabled?: boolean }>
  initialValue?: boolean
}

function RFFRadioGroup({
  name,
  initialValue,
  label,
  items,
}: RFFRadioGroupProps) {
  return (
    <Field name={name} initialValue={initialValue}>
      {({ input, meta, ...props }) => (
        <RadioGroup
          {...props}
          {...input}
          items={items}
          label={label}
          name={input.name}
          value={input.value?.toString()}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            input.onChange(event.target.value)
          }
        />
      )}
    </Field>
  )
}

RFFRadioGroup.defaultProps = {
  initialValue: undefined,
}

export default RFFRadioGroup
