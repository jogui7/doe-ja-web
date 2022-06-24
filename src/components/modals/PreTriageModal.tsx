import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import { useApplicationContext } from '../../contexts/ApplicationContext'
import { useSnackbar } from '../../contexts/SnackbarContext'
import api from '../../services/api'
import { ApiErrorData } from '../../types/general.types'
import { EditUserPreTriage, UserPreTriage } from '../../types/user.types'
import { inputConfig } from '../react-final-forms/inputConfigs'
import RFFRadioGroup from '../react-final-forms/RFFRadioGroup'

type PreTriageModalProps = {
  open: boolean
  onClose: () => void
}

const booleanOptions = [
  { label: 'não', value: false },
  { label: 'sim', value: true },
]

export default function PreTriageModal({ open, onClose }: PreTriageModalProps) {
  const [initialData, setInitialData] = useState<UserPreTriage>()
  const { state } = useApplicationContext()
  const { handleMessage } = useSnackbar()

  const fetchInitialValues = useCallback(async () => {
    if (!open) return
    const response = await api.get<UserPreTriage[], ApiErrorData>(
      `/pretriagem/${state?.user?.id}`
    )

    if (response.ok && response.data) {
      setInitialData(response.data[0])
    }
  }, [state?.user?.id, open])

  const onSubmit = async (values: EditUserPreTriage) => {
    const response = await (initialData?.id
      ? api.put<UserPreTriage, ApiErrorData>(`/pretriagem/${initialData.id}`, {
          ...values,
          ist: values.dst,
          usuarioId: state?.user?.id,
        })
      : api.post<UserPreTriage, ApiErrorData>(`/pretriagem`, {
          ...values,
          ist: values.dst,
          usuarioId: state?.user?.id,
        }))

    if (response.ok) {
      handleMessage({ message: 'Pré-triagem realizada!', type: 'success' })

      return onClose()
    }
    return handleMessage({
      message: response.data?.message || '',
      type: 'error',
    })
  }

  useEffect(() => {
    fetchInitialValues()
  }, [fetchInitialValues])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Pré-triagem</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Alert severity="info">
              A pré-triagem serve para agilizar o processo de cadastro nos
              bancos de sangue, é possível realizar a pré-triagem na hora doação
              caso prefira
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Form onSubmit={onSubmit} initialValues={initialData}>
              {({ handleSubmit, initialValues }) => (
                <form style={{ paddingTop: 8 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <RFFRadioGroup
                            {...inputConfig}
                            label="Fez tatuagem nos ultimos 12 meses?"
                            name="tatuagem"
                            items={booleanOptions}
                            initialValue={initialValues?.tatuagem}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <RFFRadioGroup
                            {...inputConfig}
                            label="Já usou algum tipo de droga ilícita injetável?"
                            name="droga"
                            items={booleanOptions}
                            initialValue={initialValues?.droga}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <RFFRadioGroup
                            {...inputConfig}
                            label="Tem alguma DSTs, ISTs ou outra transmissível através do sangue?"
                            name="dst"
                            items={booleanOptions}
                            initialValue={initialValues?.dst}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <RFFRadioGroup
                            {...inputConfig}
                            label="Teve e/ou tem algum tipo de câncer?"
                            name="cancer"
                            items={booleanOptions}
                            initialValue={initialValues?.cancer}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <RFFRadioGroup
                            {...inputConfig}
                            label="Fez algum transplante de orgão ou medula?"
                            name="transplante"
                            items={booleanOptions}
                            initialValue={initialValues?.transplante}
                          />
                        </Grid>
                      </Grid>
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
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
