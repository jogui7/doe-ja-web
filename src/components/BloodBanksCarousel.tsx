import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from '@mui/icons-material'
import { Box, ButtonBase, IconButton, Radio } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import Carousel, { ButtonGroupProps, DotProps } from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useApplicationContext } from '../contexts/ApplicationContext'
import api from '../services/api'
import { BloodBank } from '../types/bloodbank.types'
import formatAddress from '../utils/formatters'
import BloodBankLevelCard from './BloodBankLevelCard'

function CustomButtomGroup({ previous, next }: ButtonGroupProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingTop={1}
    >
      <IconButton onClick={previous}>
        <KeyboardArrowLeftRounded />
      </IconButton>
      <IconButton onClick={next}>
        <KeyboardArrowRightRounded />
      </IconButton>
    </Box>
  )
}

function CustomDot({ onClick, active }: DotProps) {
  return (
    <ButtonBase onClick={onClick} type="button" disableRipple>
      <Radio checked={active} disableRipple size="small" />
    </ButtonBase>
  )
}

export default function BloodBanksCarousel() {
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([])
  const { state } = useApplicationContext()

  const fetchBloodBanks = useCallback(async () => {
    const response = await api.get<BloodBank[]>('/hemobanco')

    if (response.ok) {
      setBloodBanks(response.data || [])
    }
  }, [])

  useEffect(() => {
    fetchBloodBanks()
  }, [fetchBloodBanks])

  return (
    <Box position="relative">
      <Carousel
        additionalTransfrom={-8}
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        arrows={false}
        partialVisbile
        customButtonGroup={<CustomButtomGroup />}
        renderButtonGroupOutside
        showDots
        renderDotsOutside
        customDot={<CustomDot />}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
            partialVisibilityGutter: 8,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
          },
        }}
      >
        {bloodBanks.map((bloodBank) => (
          <Box paddingX={1} key={bloodBank.id} height="100%">
            <BloodBankLevelCard
              name={bloodBank.nome}
              level={
                state?.user?.tipoSanguineo
                  ? Number(bloodBank[state.user.tipoSanguineo])
                  : 0
              }
              address={formatAddress({
                rua: bloodBank.rua,
                bairro: bloodBank.bairro,
                cidade: bloodBank.cidade,
                numero: bloodBank.numero,
                uf: bloodBank.uf,
              })}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  )
}
