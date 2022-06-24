import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material'
import { useState, useCallback, useEffect } from 'react'
import { Form } from 'react-final-form'
import { useApplicationContext } from '../../contexts/ApplicationContext'
import { useSnackbar } from '../../contexts/SnackbarContext'
import api from '../../services/api'
import { BloodBank } from '../../types/bloodbank.types'
import { ScheduleDonation } from '../../types/bloodDonation.types'
import { ApiErrorData } from '../../types/general.types'
import formatAddress from '../../utils/formatters'
import RFFDatePicker from '../react-final-forms/RFFDatePicker'
import RFFSelect from '../react-final-forms/RFFSelectField'

type DonateBloodModalProps = {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function DonateBloodModal({
  open,
  onClose,
  onSuccess,
}: DonateBloodModalProps) {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([])
  const { state } = useApplicationContext()
  const { handleMessage } = useSnackbar()

  const fetchBloodBanks = useCallback(async () => {
    const response = await api.get<BloodBank[]>('/hemobanco')

    if (response.ok) {
      setBloodBanks(response.data || [])
    }
  }, [])

  useEffect(() => {
    fetchBloodBanks()
  }, [fetchBloodBanks])

  const onSubmit = async (values: ScheduleDonation) => {
    const response = await api.post<void, ApiErrorData>(`/doacao`, {
      ...values,
      usuarioId: state?.user?.id,
    })

    if (response.ok) {
      handleMessage({ message: 'Dados atualizados!', type: 'success' })
      onSuccess()
      return onClose()
    }
    return handleMessage({
      message: response.data?.message || '',
      type: 'error',
    })
  }

  const getBloodBankOption = ({
    id,
    nome,
    rua,
    bairro,
    cidade,
    numero,
    uf,
  }: BloodBank) => ({
    value: id,
    label: `${nome} - ${formatAddress({ rua, bairro, cidade, numero, uf })}`,
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Agendar doação de sangue</DialogTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} initialValues={state?.user}>
          {({ handleSubmit }) => (
            <form style={{ paddingTop: 8 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <RFFDatePicker
                    name="horarioMarcado"
                    label="Dia e hora"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <RFFSelect
                    name="bancoSangueId"
                    label="Banco de sangue"
                    size="small"
                    items={bloodBanks.map(getBloodBankOption)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1} justifyContent="flex-end">
                    <Grid item xs="auto">
                      <Button variant="text" onClick={onClose} size="small">
                        Cancelar
                      </Button>
                    </Grid>
                    <Grid item xs="auto">
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        type="submit"
                        size="small"
                      >
                        Salvar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  )
}
