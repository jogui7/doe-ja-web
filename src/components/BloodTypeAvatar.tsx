import { Box, Typography } from '@mui/material'
import { BloodType, BloodTypeEnum } from '../types/bloodbank.types'
import BloodIcon from './icons/BloodIcon'

type BloodTypeAvatarProps = {
  bloodType: BloodType
}

export default function BloodTypeAvatar({ bloodType }: BloodTypeAvatarProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <BloodIcon color="primary" sx={{ fontSize: 72 }} />
      <Typography sx={{ position: 'absolute', marginTop: 2.5 }}>
        {BloodTypeEnum[bloodType]}
      </Typography>
    </Box>
  )
}
