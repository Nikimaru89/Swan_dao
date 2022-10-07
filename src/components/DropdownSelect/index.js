import React, { useState } from 'react'
import styled from 'styled-components'

import { RowBetween } from '../Row'
import { AutoColumn } from '../Column'
import { ChevronDown as Arrow } from 'react-feather'
import { Text } from '../../Theme'

const Wrapper = styled.div`
  z-index: 20;
  position: relative;
  background-color: ${({ theme }) => (theme.blue)};
  width: 204px;
  height: 40px;
  padding: 0 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
  }
`

const Text1 = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  color: white;
`

const Text2 = styled(Text1)`
  color: black;
`

const Dropdown = styled.div`
  position: absolute;
  top: 41px;
  right: 0;
  width: 204px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px 10px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  color: black;

  :hover {
    cursor: pointer;
  }
`

const Option = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
`

const ArrowStyled = styled(Arrow)`
  height: 14px;
  width: 14px;
  margin-left: 6px;
`

const DropdownSelect = ({ options, active, setActive, color }) => {
  const [showDropdown, toggleDropdown] = useState(false)

  return (
    <Wrapper open={showDropdown} color={color} onClick={() => toggleDropdown(!showDropdown)}>
      <RowBetween>
        <Text1>{active}</Text1><Text1><ArrowStyled /></Text1>
      </RowBetween>
      {showDropdown && (
        <Dropdown>
          <AutoColumn gap="1px">
            {Object.keys(options).map((key, index) => {
              let option = options[key]
              return (
                option !== active && (
                  <Option
                    onClick={() => {
                      toggleDropdown(!showDropdown)
                      setActive(option)
                    }}
                    key={index}
                  >
                    <Text2>{option}</Text2>
                  </Option>
                )
              )
            })}
          </AutoColumn>
        </Dropdown>
      )}
    </Wrapper>
  )
}

export default DropdownSelect
