import React from 'react'
import styled from 'styled-components'
import { useToasts } from 'react-toast-notifications';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

import { getImg } from '../../utils'
import Row, { RowBetween, RowFixed } from '../Row'
import { Text } from '../../Theme'
import { Analytics, Setting, Support, Withdraw } from '../Icons'

const HeaderWrapper = styled(RowBetween)`
  background: white;
  height: 88px;
`

const MenuWrapper = styled(RowFixed)`
  width: auto;
  gap: 40px;
`

const Menu = styled(Row)`
  svg {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  &:hover {
    cursor: pointer;
  }

  &.active {
    svg path {
      fill: ${({ theme }) => (theme.textActive)}
    }

    div {
      font-weight: 700;
      color: ${({ theme }) => (theme.textActive)}
    }
  }
`

const WithdrawMenu = styled(Menu)`
  border: 1px solid #2979FF7f;
  border-radius: 100px;
  padding: 6px 16px;

  svg {
    width: 20px;
    height: 20px;
  }
`

const Text1 = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  line-height: 23.2px;
`

const Text2 = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
`

const Header = () => {

  const { addToast } = useToasts()
  const history = useHistory()

  const handleSignOut = async (event) => {
    event.preventDefault()
    try {
      await Auth.signOut();
      addToast('Sign Out Succeeded', {
        appearance: 'success',
        autoDismiss: true
      })
    } catch (error) {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true
      })
    }
    history.push('/signin')
  }

  return (
    <HeaderWrapper>
      <div className="container">
        <img src={getImg('logo-blue.svg')} alt="loading-icon" />
        <MenuWrapper>
          <Menu className="active">
            <Analytics color="textLighter" /><Text1 color="textLighter">Analytics</Text1>
          </Menu>
          <Menu>
            <Support color="textLighter" /><Text1 color="textLighter">Support</Text1>
          </Menu>
          <Menu>
            <Setting color="textLighter" /><Text1 color="textLighter">Setting</Text1>
          </Menu>
          <WithdrawMenu>
            <Withdraw color="textLighter" /><Text2 color="textLighter">Withdraw</Text2>
          </WithdrawMenu>
          <Menu onClick={handleSignOut}>
            <Text1 color="textLighter">Log Out</Text1>
          </Menu>
        </MenuWrapper>
      </div>
    </HeaderWrapper>
  )
}

export default Header