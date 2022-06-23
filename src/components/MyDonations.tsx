import { Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'hemobanco', headerName: 'Banco de Sangue', width: 150 },
  { field: 'endereco', headerName: 'Endereço', width: 400 },
  { field: 'data', headerName: 'Data', flex: 1 },
  { field: 'status', headerName: 'status', width: 150 },
]

const rows = [
  {
    id: 1,
    hemobanco: 'Hemepar',
    endereco: 'Tv. João Prosdócimo, 145 - Alto da XV, Curitiba - PR',
    data: new Date().toLocaleString('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }),
    status: 'cancelado',
  },
  {
    id: 2,
    hemobanco: 'Hemepar',
    endereco: 'Tv. João Prosdócimo, 145 - Alto da XV, Curitiba - PR',
    data: new Date().toLocaleString('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }),
    status: 'realizado',
  },
  {
    id: 3,
    hemobanco: 'Hemepar',
    endereco: 'Tv. João Prosdócimo, 145 - Alto da XV, Curitiba - PR',
    data: new Date().toLocaleString('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }),
    status: 'realizado',
  },
  {
    id: 4,
    hemobanco: 'Hemepar',
    endereco: 'Tv. João Prosdócimo, 145 - Alto da XV, Curitiba - PR',
    data: new Date().toLocaleString('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }),
    status: 'realizado',
  },
]

export default function MyDonations() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Minhas doações</Typography>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
          disableColumnMenu
        />
      </Grid>
    </Grid>
  )
}
