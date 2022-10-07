import styled from 'styled-components'

export const OptionButton = styled.div`
  border-radius: 11px;
  padding: 4.5px 12px;
  background-color: ${({ active, theme }) => active && theme.blue};
  font-size: 11px;
  font-weight: 700;
  line-height: 15px;
  color: ${({ active, theme }) => active ? theme.optionActive : theme.textLight}

  :hover {
    cursor: ${({ disabled }) => !disabled && 'pointer'};
  }
`