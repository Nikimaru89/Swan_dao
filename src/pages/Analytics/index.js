import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { Text } from '../../Theme'
import { AutoColumn } from '../../components/Column'

import Overview from './Overview'
import PnlView from './PnlView'
import LastView from './LastView'

const Wrapper = styled(AutoColumn)`
`

const Text1 = styled(Text)`
  font-weight: 700;
  font-size: 28px;
  line-height: 40.6px;
  margin-bottom: 24px;
`

const Analytics = () => {

  return (
    <>
      <Text1 color="textLight">Current Strategies with Swan</Text1>
      <Wrapper gap="56px">
        <Overview />
        <PnlView />
        <LastView />
      </Wrapper>
    </>
  )
}

export default withRouter(Analytics)
