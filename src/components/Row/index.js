import styled from 'styled-components'
import { Box } from 'rebass/styled-components'

const Row = styled(Box)`
  display: flex;
  padding: 0;
  align-items: center;
  align-items: ${({ align }) => align && align};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  justify-content: ${({ justify }) => justify};
`

export const RowBetween = styled(Row)`
  justify-content: space-between;
  width: 100%;
`

export const RowUp = styled(RowBetween)`
  align-items: flex-start;
`

export const RowDown = styled(Row)`
  align-items: flex-end;
`

export const RowEnd = styled(Row)`
  justify-content: flex-end;
`

export const AutoRow = styled(Row)`
  flex-wrap: ${({ wrap }) => wrap ?? 'nowrap'};
  gap: ${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap};
  justify-content: center;
`

export const RowFixed = styled(Row)`
  width: fit-content;
`

export default Row
