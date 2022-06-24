import {
  FormControl,
  FormLabel,
  Grid,
  FormControlLabel,
  Radio,
  FormHelperText,
  RadioGroup as MuiRadioGroup,
} from '@mui/material'

export type RadioGroupProps = {
  color?: 'primary' | 'secondary'
  column?: boolean
  error?: boolean
  helperText?: string
  items: Array<{ label: string; value: boolean; disabled?: boolean }>
  label: string
  name: string
  defaultValue?: boolean
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void
  radioLabelPlacement?: 'start' | 'end' | 'bottom' | 'top'
}

function RadioGroup({
  color,
  column,
  defaultValue,
  error,
  helperText,
  items,
  label,
  name,
  radioLabelPlacement,
  value,
  onChange,
}: RadioGroupProps) {
  return (
    <FormControl error={error} component="fieldset" fullWidth>
      <FormLabel color={color} component="legend">
        {label}
      </FormLabel>
      <MuiRadioGroup
        row={!column}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        name={name}
      >
        <Grid container>
          {items.map((item) => (
            <Grid item xs sm="auto">
              <FormControlLabel
                key={item.label}
                value={item.value}
                control={<Radio color={color} />}
                label={item.label}
                labelPlacement={radioLabelPlacement}
                disabled={item.disabled}
              />
            </Grid>
          ))}
        </Grid>
      </MuiRadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

RadioGroup.defaultProps = {
  error: false,
  color: 'primary',
  radioLabelPlacement: 'end',
  column: false,
  helperText: undefined,
  defaultValue: false,
}

export default RadioGroup
