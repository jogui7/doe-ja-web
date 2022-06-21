import { Box, Grid } from '@mui/material'
import BloodBanksCarousel from '../components/BloodBanksCarousel'
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
          <Grid item xs={12}>
            <Box bgcolor="green" height={250}>
              Bancos vinculados
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box bgcolor="green" height={250}>
              algum gráfico
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box bgcolor="green" height={400}>
              últimas doações
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
