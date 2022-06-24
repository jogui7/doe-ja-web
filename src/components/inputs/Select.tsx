import {
  InputLabelProps,
  FormControlProps,
  MenuItemProps,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from '@mui/material'

export type SelectProps = MuiSelectProps & {
  disabled: boolean
  helperText: string
  error: boolean
  fullWidth: boolean
  label: string
  showEmpty?: boolean
  emptyLabel?: string
  items?: Array<{ value: string | number | string[]; label: string }>
  inputLabelProps?: InputLabelProps
  formControlProps?: FormControlProps
  menuItemProps?: MenuItemProps
}

function Select({
  children,
  disabled,
  helperText,
  error,
  fullWidth,
  label,
  items,
  formControlProps,
  variant,
  onBlur,
  inputLabelProps,
  showEmpty,
  emptyLabel = 'selecione',
  menuItemProps,
  ...props
}: SelectProps) {
  return (
    <FormControl
      {...formControlProps}
      error={error}
      fullWidth={fullWidth}
      variant={variant}
      disabled={disabled}
    >
      <InputLabel {...inputLabelProps} shrink>
        {label}
      </InputLabel>
      <MuiSelect
        fullWidth={fullWidth}
        variant={variant}
        label={label}
        onBlur={onBlur}
        disabled={disabled}
        {...props}
      >
        {showEmpty && (
          <MenuItem value="" {...menuItemProps}>
            {emptyLabel}
          </MenuItem>
        )}
        {children ||
          items?.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={index} value={item.value} {...menuItemProps}>
              {item.label}
            </MenuItem>
          ))}
      </MuiSelect>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

Select.defaultProps = {
  showEmpty: false,
  emptyLabel: 'selecione',
  items: [],
  menuItemProps: undefined,
  inputLabelProps: undefined,
  formControlProps: undefined,
}

export default Select
