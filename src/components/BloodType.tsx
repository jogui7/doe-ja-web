import { Box, Typography } from '@mui/material'
import BloodIcon from './icons/BloodIcon'

export default function BloodType() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <BloodIcon color="primary" sx={{ fontSize: 72 }} />
      <Typography sx={{ position: 'absolute', marginTop: 2.5 }}>AB+</Typography>
    </Box>
  )
}
