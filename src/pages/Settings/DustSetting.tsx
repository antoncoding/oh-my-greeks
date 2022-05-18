import React, { useState } from 'react'

import SectionTitle from '../../components/SectionHeader'

import { TextInput, Button, useToast, Help } from '@aragon/ui'
import { storePreference, getPreference } from '../../utils/storage'
import { DUST_AMOUNT as DUST_AMOUNT_KEY } from '../../constants/storage'

function DustSetting() {
  const storedDustAmount = Number(getPreference(DUST_AMOUNT_KEY, '0.01'))

  const toast = useToast()

  const [inputDustAmount, setInputDustAmount] = useState(storedDustAmount)

  return (
    <>
      <div style={{ display: 'flex' }}>
        <SectionTitle title="Dust settings" />
        <div style={{ paddingLeft: '10px', paddingTop: '25px' }}>
          <Help hint={'What is this'}>How to be considered a "dust position", and get excluded in the table?</Help>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ paddingTop: 3 }}>
          {' '}
          <TextInput
            type={'number'}
            onChange={event => {
              setInputDustAmount(event.target.value)
            }}
            value={inputDustAmount}
          />{' '}
          <Button
            label="Set Dust"
            onClick={() => {
              storePreference(DUST_AMOUNT_KEY, inputDustAmount.toString())
              toast('Dust amount updated')
            }}
          />
        </div>
      </div>
    </>
  )
}

export default DustSetting
