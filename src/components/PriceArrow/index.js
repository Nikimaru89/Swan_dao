import React from 'react'
import styled from 'styled-components'
import { Text } from '../../Theme'
import { ArrowDown, ArrowUp } from '../Icons'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 32px;
  padding: 0 10px;
  border-radius: 100px;
  background: ${({ up, theme }) => (up ? theme.green : theme.red)};
  color:: ${({ theme }) => (theme.white)};
`

const Text1 = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-left: 6px;
  color: ${({ theme }) => (theme.white)};
`

const PriceArrow = ({ text, up }) => {

  return (
    <Wrapper up={up}>
      {up && <><ArrowUp />{text && <Text1>{text}</Text1>}</>}
      {!up && <><ArrowDown />{text && <Text1>{text}</Text1>}</>}
    </Wrapper>
  )
}

export default PriceArrow
