import LiquidFillGauge from 'react-liquid-gauge'

type BloodLevelProps = {
  level: number
}

export default function BloodLevel({ level }: BloodLevelProps) {
  return (
    <LiquidFillGauge
      style={{ margin: '0 auto' }}
      margin={0}
      innerRadius={1}
      height={50}
      width={50}
      value={level}
      percent="%"
      textSize={1.5}
      textOffsetX={0}
      textOffsetY={6}
      riseAnimation
      waveAnimation
      waveFrequency={2}
      waveAmplitude={1}
      circleStyle={{
        fill: '#FFF',
      }}
      waveStyle={{
        fill: '#e63e3d',
      }}
      textStyle={{
        fill: '#444',
      }}
      waveTextStyle={{
        fill: '#fff',
      }}
    />
  )
}
