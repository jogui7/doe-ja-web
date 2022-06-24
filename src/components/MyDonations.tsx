import { Box, Grid, LinearProgress, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import moment from 'moment'
import { Donation } from '../types/bloodDonation.types'
import formatAddress from '../utils/formatters'

type MyDonationsProps = {
  donations: Donation[]
  loading: boolean
}

const columns: GridColDef[] = [
  { field: 'hemobanco', headerName: 'Banco de Sangue', width: 400 },
  { field: 'endereco', headerName: 'Endereço', width: 400 },
  { field: 'data', headerName: 'Data', flex: 1 },
  { field: 'status', headerName: 'status', width: 150 },
]

function NoRowsOverlay() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Typography> Você ainda não tem nenhuma doação</Typography>
    </Box>
  )
}

export default function MyDonations({ donations, loading }: MyDonationsProps) {
  const rows = donations.map((donation) => ({
    id: donation.id,
    hemobanco: donation?.bancoSangue?.nome || '',
    endereco: donation?.bancoSangue
      ? formatAddress({ ...donation?.bancoSangue })
      : '',
    data: new Date(donation.horarioMarcado).toLocaleString('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }),
    status: moment(donation.horarioMarcado).isBefore()
      ? 'realizado'
      : 'agendado',
  }))

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Minhas doações</Typography>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[5]}
          autoHeight
          disableColumnMenu
          loading={loading}
          components={{
            LoadingOverlay: LinearProgress,
            NoRowsOverlay,
          }}
        />
      </Grid>
    </Grid>
  )
}
