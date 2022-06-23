import { Box, Grid } from '@mui/material'
import BloodBanksCarousel from '../components/BloodBanksCarousel'
import MyDonations from '../components/MyDonations'
import UserCard from '../components/UserCard'

export default function HomePage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BloodBanksCarousel />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <UserCard />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box bgcolor="green" height={200}>
              últimas doações
            </Box>
          </Grid>
          <Grid item xs={12}>
            <MyDonations />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
