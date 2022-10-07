import styled from 'styled-components'

const Box = styled.div`
  width: 100%;
  background: #FFFFFF;
  box-shadow: 8px 8px 40px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`

export const OverviewDetailBox = styled.div`
  max-width: 394.67px;
  min-width: 300px;
  width: 33%;
  height: 93px;
  background: #FFFFFF;
  border: 1px solid ${({ theme }) => (theme.border)};
  border-radius: 12px;
  padding: 24px;
`

export const PnlDetailBox = styled.div`
  max-width: 133.33px;
  min-width: 130px;
  width: 11%;
  height: 82px;
  background: #FFFFFF;
  border: 1px solid ${({ theme }) => (theme.border)};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Box