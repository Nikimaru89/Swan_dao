import React from 'react'
import styled from 'styled-components'

import Box from '../../components/Box'
import { AutoRow, RowBetween } from '../../components/Row'
import { Text } from '../../Theme'
import Column from '../../components/Column'
import PriceArrow from '../../components/PriceArrow'

const Wrapper = styled(Box)`
  padding: 24px;
  height: 124px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WrapperSmall = styled(Wrapper)`
  width: 50%;
`;

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

const LivePrice = () => {

  return (
    <AutoRow gap="24px">
      <Wrapper>
        <RowBetween>
          <Column>
            <Text1 color="textDarker">Current Treasury Total</Text1>
            <Text2 color="textDarker">$5,123</Text2>
          </Column>
          <PriceArrow text="2.28%" up />
        </RowBetween>
      </Wrapper>
      <WrapperSmall>
        <RowBetween>
          <Column>
            <Text1 color="textDarker">Token Price</Text1>
            <Text3 color="textDarker">$1,034</Text3>
          </Column>
          <PriceArrow down />
        </RowBetween>
      </WrapperSmall>
      <WrapperSmall>
        <RowBetween>
          <Column>
            <Text1 color="textDarker">Other Price</Text1>
            <Text3 color="textDarker">$1,034</Text3>
          </Column>
          <PriceArrow up />
        </RowBetween>
      </WrapperSmall>
    </AutoRow>
  )
}

export default LivePrice
