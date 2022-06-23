import { Card, CardHeader } from '@mui/material'
import BloodLevel from './BloodLevel'

type BloodBankLevelCardProps = {
  name: string
  address: string
  level: number
}

export default function BloodBankLevelCard({
  name,
  address,
  level,
}: BloodBankLevelCardProps) {
  return (
    <Card elevation={0} sx={{ display: 'flex', height: '100%' }}>
      <CardHeader
        avatar={<BloodLevel level={level} />}
        title={name}
        subheader={address}
      />
    </Card>
  )
}
