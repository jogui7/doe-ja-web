import { AddRounded, DeleteRounded } from '@mui/icons-material'
import {
  CircularProgress,
  Typography,
  FormHelperText,
  Grid,
  Theme,
  IconButton,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Field, FieldInputProps } from 'react-final-form'
import { css } from '@emotion/css'
import { getMediaCover, IMedia, readImageAsBase64 } from '../../lib/medias.lib'
import PickImage from '../inputs/PickImage'
import useClasses from '../../hooks/useClasses'

const DEFAULT_MAX_SIZE = 2097152

const useStyles = (theme: Theme) => ({
  addButtonContainer: css({
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: theme.spacing(20),
    height: theme.spacing(20),
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.grey[100],
    },
  }),
  mediaActionContainer: css({
    position: 'relative',
    height: '100%',
    '& .ActionButton': {
      zIndex: 998,
      transition: 'opacity 0.2s ease-out',
    },
    '&:hover': {
      '& .ActionButton': {
        opacity: 1,
      },
    },
  }),
  img: css({
    objectFit: 'cover',
    borderRadius: theme.spacing(1 / 2),
  }),
  mediaControlsTop: css({
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    right: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  }),
})

type AcceptType = 'image/*' | 'video/*'
type RFFPickImageProps = {
  defaultValue?: string | [string]
  multiple?: boolean
  name: string
  fileMaxSize?: number
  acceptTypes: AcceptType[]
  formatValue: (files: File) => Promise<string>
  onClear?: () => void
}

const buildDefaultValue = (files: string | string[] | undefined): IMedia[] => {
  if (!files) {
    return []
  }
  const filesUrl = Array.isArray(files) ? files : [files]
  const filesWithCover = filesUrl.map((url) => ({ url }))
  return filesWithCover
}

function RFFPickImage({
  multiple,
  defaultValue,
  name,
  acceptTypes,
  onClear,
  formatValue,
  fileMaxSize,
}: RFFPickImageProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [filesUrl, setfilesUrl] = useState<IMedia[]>([])
  const [invalidSize, setInvalidSize] = useState<boolean>(false)
  const classes = useClasses(useStyles)

  useEffect(() => {
    setfilesUrl(buildDefaultValue(defaultValue))
  }, [defaultValue])

  const isAllFileSizeValid = (files: File[], maxSize: number) => {
    // eslint-disable-next-line consistent-return
    files.forEach((file) => {
      if (file.size > maxSize) {
        return false
      }
    })

    return true
  }

  const onChange = async (
    files: File[],
    fileInput: FieldInputProps<string, HTMLElement>
  ) => {
    setLoading(true)
    const isValid = fileMaxSize && isAllFileSizeValid(files, fileMaxSize)
    setInvalidSize(!isValid)

    if (!isValid) {
      setLoading(false)
      return
    }

    const newfilesUrl: IMedia[] = []
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < files.length; index++) {
      const currentFile = files[index]
      // eslint-disable-next-line no-await-in-loop
      const fb64 = await readImageAsBase64(currentFile)
      newfilesUrl.push({ file: currentFile, url: fb64 as string })
    }

    setfilesUrl(newfilesUrl)

    const proccessedFiles = await formatValue(files[0])

    fileInput.onChange(proccessedFiles)

    setLoading(false)
  }

  const accept = acceptTypes.join(',')
  return (
    <Field name={name}>
      {({ input, meta }) => {
        const onAdd = (files: File[]) => {
          onChange(files, input)
        }

        const handleClean = () => {
          input.onChange(undefined)
          setfilesUrl([])
          if (onClear) {
            onClear()
          }
        }

        if (filesUrl.length > 0) {
          return (
            <div className={classes.mediaActionContainer}>
              {filesUrl.map((fileB64, index) => (
                <img
                  // eslint-disable-next-line react/no-array-index-key
                  key={`file-${index}`}
                  alt={fileB64?.file?.name ?? `file-${index}`}
                  src={getMediaCover(fileB64)}
                  width="100%"
                  height="100%"
                  className={classes.img}
                />
              ))}

              <div className={classes.mediaControlsTop}>
                <IconButton onClick={handleClean}>
                  <DeleteRounded />
                </IconButton>
              </div>
            </div>
          )
        }

        return (
          <>
            <PickImage
              id={`pick-image-${name}`}
              onChange={onAdd}
              accept={accept}
            >
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                  border: (theme) => `2px dashed ${theme.palette.primary.main}`,
                  borderRadius: 1 / 2,
                  paddingY: 1,
                }}
              >
                <Grid item>
                  <div className={classes.addButtonContainer}>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <AddRounded color="primary" fontSize="large" />
                    )}
                  </div>
                </Grid>
                <Grid item>
                  <Typography>Adicione uma foto de perfil</Typography>
                </Grid>
              </Grid>
              {invalidSize && (
                <Typography variant="caption" color="primary">
                  Selecione arquivo
                  {multiple ? 's' : ''} com até{' '}
                  {Math.floor((fileMaxSize || DEFAULT_MAX_SIZE) / 1000000)}
                  MB
                </Typography>
              )}
            </PickImage>
            {meta.invalid && (
              <FormHelperText error>Selecione um arquivo válido</FormHelperText>
            )}
          </>
        )
      }}
    </Field>
  )
}

RFFPickImage.defaultProps = {
  defaultValue: null,
  multiple: false,
  fileMaxSize: DEFAULT_MAX_SIZE,
  onClear: () => ({}),
}

export default RFFPickImage
