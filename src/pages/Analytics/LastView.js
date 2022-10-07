import React from 'react'
import styled from 'styled-components'
import { useMedia } from 'react-use'

import { usePoolNames, usePoolPercentages } from '../../contexts/GlobalData'
import Box from '../../components/Box'
import { Text } from '../../Theme'
import { AutoColumn } from '../../components/Column'
import DonutChart from '../../components/ApexChart/DonutChart'
import { AutoRow, RowBetween } from '../../components/Row'
import Column from '../../components/Column'
import PriceArrow from '../../components/PriceArrow'

const LeftWrapper = styled.div`
  width: 50%;

  @media(max-width: 1100px) {
    width: 100%;
  }
`

const TopWrapper = styled(Box)`
  padding: 24px;
  height: 173px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BottomWrapper = styled(TopWrapper)`
  width: 50%;
`

const RightWrapper = styled(Box)`
  min-width: 590px;
  max-width: 644px;

  @media(max-width: 1100px) {
    max-width: 100%;
  }
`

const DonutWrapper = styled.div`
  height: 320px;
  width: 600px;
  margin: 0 auto;
`

const Text1 = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`

const Text2 = styled(Text)`
  font-size: 40px;
  font-weight: 700;
  line-height: 56px;
`

const Text3 = styled(Text)`
  font-size: 24px;
  font-weight: 700;
  line-height: 34px;
`

const Text4 = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  line-height: 26px;
  padding: 24px 24px 0;
`

const LastView = () => {

  const bellow1100 = useMedia('(max-width: 1100px)')
  let poolPercentage = usePoolPercentages()
  let poolNames = usePoolNames()

  poolPercentage = poolPercentage.length > 0 && poolPercentage.sort((a, b) => (a.key > b.key ? 1 : -1))
  poolNames = poolNames.length > 0 && poolNames.sort((a, b) => (a.key > b.key ? 1 : -1))

  const LayoutWrapper = ({ children }) => {
    return (
      <>
        {bellow1100 && <AutoColumn gap="24px">{children}</AutoColumn>}
        {!bellow1100 && <AutoRow gap="24px">{children}</AutoRow>}
      </>
    )
  }

  return (
    <LayoutWrapper>
      <LeftWrapper>
        <AutoColumn gap="24px">
          <TopWrapper>
            <RowBetween>
              <Column>
                <Text1 color="textDarker">Current Treasury Total</Text1>
                <Text2 color="textDarker">$5,123</Text2>
              </Column>
              <PriceArrow text="2.28%" up />
            </RowBetween>
          </TopWrapper>
          <AutoRow gap="24px">
            <BottomWrapper>
              <RowBetween>
                <Column>
                  <Text1 color="textDarker">Token Price</Text1>
                  <Text3 color="textDarker">$1,034</Text3>
                </Column>
                <PriceArrow down />
              </RowBetween>
            </BottomWrapper>
            <BottomWrapper>
              <RowBetween>
                <Column>
                  <Text1 color="textDarker">Other Price</Text1>
                  <Text3 color="textDarker">$1,034</Text3>
                </Column>
                <PriceArrow up />
              </RowBetween>
            </BottomWrapper>
          </AutoRow>
        </AutoColumn>
      </LeftWrapper>
      <RightWrapper>
        <AutoColumn>
          <Text4>Contribution by Strategy</Text4>
          <DonutWrapper>
            {poolPercentage && Object.keys(poolPercentage).length > 0 &&
              <DonutChart poolNames={poolNames} poolPercentData={poolPercentage} />}
          </DonutWrapper>
        </AutoColumn>
      </RightWrapper>
    </LayoutWrapper>
  )
}

export default LastView
