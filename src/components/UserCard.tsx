import {
  EditRounded,
  LogoutRounded,
  BloodtypeRounded,
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
import { MenuOption } from '../types/general.types'
import BloodType from './BloodType'

export default function UserCard() {
  const { handleLogout } = useApplicationContext()
  const menuOptions: MenuOption[] = [
    {
      icon: <EditRounded />,
      label: 'Editar perfil',
      onClick: () => ({}),
    },
    {
      icon: <BloodtypeRounded />,
      label: 'Doar sangue',
      onClick: () => ({}),
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
        src="https://media-exp1.licdn.com/dms/image/C5603AQEeH8-gYBMExA/profile-displayphoto-shrink_800_800/0/1592441154721?e=1661385600&v=beta&t=Om1Nq9ZN83IyRM5WYT1NWaksMHKoVMtL4TId832q0BM"
        component="img"
        height="194"
      />
      <CardHeader
        avatar={<BloodType />}
        title="João Guis"
        subheader="Pode doar novamente!"
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
