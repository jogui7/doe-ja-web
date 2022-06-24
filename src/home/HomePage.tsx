import { Grid } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import BloodBanksCarousel from '../components/BloodBanksCarousel'
import DonateBloodModal from '../components/modals/DonateBloodModal'
import EditProfileModal from '../components/modals/EditProfileModal'
import PreTriageModal from '../components/modals/PreTriageModal'
import MyDonations from '../components/MyDonations'
import UserCard from '../components/UserCard'
import { useApplicationContext } from '../contexts/ApplicationContext'
import api from '../services/api'
import { Donation } from '../types/bloodDonation.types'

export default function HomePage() {
  const { state } = useApplicationContext()
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openPreTriageModal, setOpenPreTriageModal] = useState(false)
  const [openDonateBloodModal, setOpenDonateBloodModal] = useState(false)

  const [donations, setDonations] = useState<Donation[]>([])
  const [loadingDonations, setLoadingDonations] = useState(true)

  const fetchDonations = useCallback(async () => {
    setLoadingDonations(true)
    const response = await api.get<Donation[]>(`/doacao/${state?.user?.id}`)

    if (response.ok) {
      setDonations(response.data || [])
    }
    setLoadingDonations(false)
  }, [])

  useEffect(() => {
    fetchDonations()
  }, [fetchDonations])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BloodBanksCarousel />
        </Grid>
        <Grid item xs={12} sm={4} xl={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <UserCard
                onEdit={() => setOpenEditModal(true)}
                onFillPreTriage={() => setOpenPreTriageModal(true)}
                onDonateBlood={() => setOpenDonateBloodModal(true)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} xl={10}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MyDonations donations={donations} loading={loadingDonations} />
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
      <DonateBloodModal
        open={openDonateBloodModal}
        onClose={() => setOpenDonateBloodModal(false)}
        onSuccess={fetchDonations}
      />
    </>
  )
}
