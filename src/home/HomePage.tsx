import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import BloodBanksCarousel from '../components/BloodBanksCarousel'
import EditProfileModal from '../components/modals/EditProfileModal'
import PreTriageModal from '../components/modals/PreTriageModal'
import MyDonations from '../components/MyDonations'
import UserCard from '../components/UserCard'

export default function HomePage() {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openPreTriageModal, setOpenPreTriageModal] = useState(false)

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BloodBanksCarousel />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <UserCard
                onEdit={() => setOpenEditModal(true)}
                onFillPreTriage={() => setOpenPreTriageModal(true)}
              />
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
      <PreTriageModal
        open={openPreTriageModal}
        onClose={() => setOpenPreTriageModal(false)}
      />
      <EditProfileModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />
    </>
  )
}
