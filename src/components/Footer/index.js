import React from 'react'
import styled from 'styled-components'

import { getImg } from '../../utils'
import { AutoRow, RowBetween } from '../Row'
import { Text } from '../../Theme'
import Link from '../Link'

const Wrapper = styled(RowBetween)`
  background: ${({ theme }) => (theme.bgDark)};
  height: 88px;
`

const SocailLink = styled(Link)`

  img {
    width: 32px;
  }
`

const Text1 = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`

const Text2 = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  line-height: 17px;
`

const Footer = () => {

  return (
    <Wrapper>
      <div className='container'>
        <img src={getImg('logo-white.svg')} alt="logo white" />
        <AutoRow gap="24px">
          <Text1 color="white">Analytics</Text1>
          <Text1 color="white">Support</Text1>
          <Text1 color="white">Settings</Text1>
          <Text1 color="white">Withdraw</Text1>
          <Text1 color="white">Log Out</Text1>
          <Text1 color="white">Privacy Policy</Text1>
        </AutoRow>
        <AutoRow gap="17px">
          <SocailLink href="#"><img src={getImg('discord.svg')} alt="discord" /></SocailLink>
          <SocailLink href="#"><img src={getImg('twitter.svg')} alt="twitter" /></SocailLink>
          <SocailLink href="#"><img src={getImg('instagram.svg')} alt="instagram" /></SocailLink>
          <SocailLink href="#"><img src={getImg('spotify.svg')} alt="spotify" /></SocailLink>
          <SocailLink href="#"><img src={getImg('youtube.svg')} alt="youtube" /></SocailLink>
        </AutoRow>
        <Text2 color="white">© 2022 SwanDao</Text2>
      </div>
    </Wrapper>
  )
}

export default Footer