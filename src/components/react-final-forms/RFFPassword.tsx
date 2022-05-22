import React, { useState } from 'react'
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import { TextFieldProps, InputAdornment, IconButton } from '@mui/material'
import RFFTextField from './RFFTextField'

type RFFPasswordProps = {
  name: string
} & Omit<TextFieldProps, 'type'>

function RFFPassword({ name, label, ...rest }: RFFPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <RFFTextField
      type={showPassword ? 'text' : 'password'}
      label={label}
      name={name || 'password'}
      {...rest}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default RFFPassword
