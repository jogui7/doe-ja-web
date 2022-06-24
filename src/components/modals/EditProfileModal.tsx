import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material'
import { Form } from 'react-final-form'
import { useApplicationContext } from '../../contexts/ApplicationContext'
import { useSnackbar } from '../../contexts/SnackbarContext'
import useUpload from '../../hooks/useUpload'
import api from '../../services/api'
import { bloodTypeOptions } from '../../types/bloodbank.types'
import { ApiErrorData } from '../../types/general.types'
import { BaseUser, EditUser } from '../../types/user.types'
import { inputConfig } from '../react-final-forms/inputConfigs'
import RFFPickImage from '../react-final-forms/RFFPickImage'
import RFFSelect from '../react-final-forms/RFFSelectField'
import RFFTextField from '../react-final-forms/RFFTextField'

type EditProfileModalProps = {
  open: boolean
  onClose: () => void
}

export default function EditProfileModal({
  open,
  onClose,
}: EditProfileModalProps) {
  const { state, updateUser } = useApplicationContext()
  const { handleMessage } = useSnackbar()
  const upload = useUpload()

  const onSubmit = async (values: EditUser) => {
    const response = await api.put<BaseUser, ApiErrorData>(
      `/cadastro/${state?.user?.id}`,
      values
    )

    if (response.ok) {
      handleMessage({ message: 'Dados atualizados!', type: 'success' })

      if (response.data) updateUser(response.data)

      return onClose()
    }
    return handleMessage({
      message: response.data?.message || '',
      type: 'error',
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Editar perfil</DialogTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} initialValues={state?.user}>
          {({ handleSubmit, initialValues }) => (
            <form style={{ paddingTop: 8 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <RFFPickImage
                    name="linkImagem"
                    acceptTypes={['image/*']}
                    formatValue={upload.image}
                    defaultValue={initialValues.linkImagem}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <RFFTextField
                        {...inputConfig}
                        label="nome completo"
                        name="nome"
                        initialValue={initialValues.nome}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RFFSelect
                        fullWidth
                        size="small"
                        label="tipo sanguíneo"
                        name="tipoSanguineo"
                        items={bloodTypeOptions}
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
      </DialogContent>
    </Dialog>
  )
}
