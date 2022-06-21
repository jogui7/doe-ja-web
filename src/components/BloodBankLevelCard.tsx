import { Card, CardHeader } from '@mui/material'
import BloodLevel from './BloodLevel'

export default function BloodBankLevelCard() {
  return (
    <Card elevation={0}>
      <CardHeader
        avatar={<BloodLevel level={75} />}
        title="Hemepar"
        subheader="Tv. João Prosdócimo, 145 - Alto da XV, Curitiba - PR"
      />
    </Card>
  )
}
