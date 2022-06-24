import {
  EditRounded,
  LogoutRounded,
  BloodtypeRounded,
  FilterAltRounded,
} from '@mui/icons-material'
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from '@mui/material'
import { useApplicationContext } from '../contexts/ApplicationContext'
import { IMAGE_DEFAULT_COVER_PATH } from '../lib/medias.lib'
import { MenuOption } from '../types/general.types'
import BloodTypeAvatar from './BloodTypeAvatar'

type UserCardProps = {
  onEdit: () => void
  onFillPreTriage: () => void
  onDonateBlood: () => void
}

export default function UserCard({
  onEdit,
  onFillPreTriage,
  onDonateBlood,
}: UserCardProps) {
  const { state } = useApplicationContext()
  const { handleLogout } = useApplicationContext()

  if (!state) return null

  const { user } = state

  if (!user) return null

  const menuOptions: MenuOption[] = [
    {
      icon: <EditRounded />,
      label: 'Editar perfil',
      onClick: onEdit,
    },
    {
      icon: <FilterAltRounded />,
      label: 'Pré-triagem',
      onClick: onFillPreTriage,
    },
    {
      icon: <BloodtypeRounded />,
      label: 'Doar sangue',
      onClick: onDonateBlood,
    },
    {
      icon: <LogoutRounded />,
      label: 'Sair',
      onClick: handleLogout,
    },
  ]

  return (
    <Card elevation={0}>
      <CardMedia
        src={user.linkImagem || IMAGE_DEFAULT_COVER_PATH}
        component="img"
        height="250"
      />
      <CardHeader
        avatar={<BloodTypeAvatar bloodType={user?.tipoSanguineo} />}
        title={user.nome || ''}
      />
      <Divider />
      <CardContent>
        <MenuList>
          {menuOptions.map(({ icon, label, onClick }) => (
            <MenuItem onClick={onClick} key={label}>
              <ListItemText>{label}</ListItemText>
              <ListItemIcon>{icon}</ListItemIcon>
            </MenuItem>
          ))}
        </MenuList>
      </CardContent>
    </Card>
  )
}
