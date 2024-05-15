import type WheelField from '../../core/types/WheelField.type'


type WheelData = {
  value: WheelField,
  label?: string
  background: string,
}[]

const $t = (somthing: any, something: any) => 'FIELD'

const wheelFields: WheelData = [
  {
    value: 0,
    background: '#B4B4B4'
  },
  {
    value: 25,
    background: '#FD7D96'
  },
  {
    value: 50,
    background: '#343399'
  },
  {
    value: 75,
    background: '#FEFE00'
  },
  {
    value: 100,
    background: '#FE4600'
  },
  {
    value: 150,
    background: '#00A500'
  },
  {
    value: 200,
    background: '#C9FE00'
  },
  {
    value: 'PRIZE',
    label: 'components.wheel.fields.prize',
    background: '#C89601'
  },
  {
    value: 250,
    background: '#FE9900'
  },
  {
    value: 300,
    background: '#343399'
  },
  {
    value: 350,
    background: '#DF009D'
  },
  {
    value: 400,
    background: '#FE4600'
    
  },
  {
    value: 'BANKRUPT',
    label: 'components.wheel.fields.bankrupt',
    background: '#000'
  },
  {
    value: 450,
    background: '#FD7D96'
  },
  {
    value: 500,
    background: '#FE4600'
  },
  {
    value: 1000,
    background: '#FEFE00'
  },
  {
    value: 1500,
    background: '#343399'
  },
  {
    value: 2000,
    background: '#FE9900'
  },
  {
    value: 5000,
    background: '#00A500'
  },
  {
    value: 'LOSE_TURN',
    label: 'components.wheel.fields.loseTurn',
    background: '#B4B4B4'
  }
]

export default wheelFields