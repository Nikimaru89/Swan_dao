import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components'
import { useDarkModeManager } from '../contexts/LocalStorage'
import styled from 'styled-components'

export default function ThemeProvider({ children }) {
  const [darkMode] = useDarkModeManager()

  return <StyledComponentsThemeProvider theme={theme(darkMode)}>{children}</StyledComponentsThemeProvider>
}

const theme = (darkMode, color) => ({
  customColor: color,
  textColor: darkMode ? color : 'black',

  bgDefault: darkMode ? '#000000' : '#F5F5F5',
  bgDark: darkMode ? '' : '#0F2D60',

  textLighter: darkMode ? '' : '#A0A0A0',
  textLight: darkMode ? '' : '#1A1A1A',
  textDark: darkMode ? '' : '#444444',
  textDarker: darkMode ? '' : '#09101D',
  textActive: darkMode ? '' : '#2979FF',
  optionActive: darkMode ? '' : '#FFFFFF',

  border: darkMode ? '' : '#DCDCDC',

  white: '#FFFFFF',
  green: '#02B935',
  red: '#DA1414',
  blue: '#2979FF',
})


const TextWrapper = styled.div`
  color: ${({ color, theme }) => theme[color]};
`

export const Text = (props) => {
  return <TextWrapper color={props.color} {...props} />
}

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fasthand&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  * { font-family: 'Poppins', cursive; }
  
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.bgDefault};
  }

  * {
    box-sizing: border-box;
  }

  .container {
    width: 100%;
    max-width: 1332px;
    margin: 0 auto;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a {
    text-decoration: none;

    :hover {
      text-decoration: none
    }
  }

  .tv-lightweight-charts{
    width: 100% !important;
    
    & > * {
      width: 100% !important;
    }
  }

  .apexchartsCumulativexPnl,
  .apexchartsDailyxPnl,
  .apexchartsHeat,
  .apexchartsoverview,
  .apexchartscumulative {
    width: 100% !important;

    & > svg {
    width: 100% !important;
    }
  }

 .apexcharts-xaxis-custom-area{ 
    margin: 50px !important;
    padding: 50px !important;
  }

  .apexcharts-legend.apexcharts-align-center{
    top: 0 !important;
    right: 5px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    margin-top: -55px !important;
  }

  .apexcharts-legend-series {
    height: 35px !important;
  }

  * {
    scrollbar-width: auto;
    scrollbar-color: #f8f8f8 #c0c0c0;
  }

  /* Scrollbar Chrome, Edge, and Safari */

  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-track {
    background: #f8f8f8 !important;
    /* background: #f8f8f8 !important; */
  }

  *::-webkit-scrollbar-thumb {
    background-color: #c0c0c0;
    border-radius: 8px;
    border: 4px solid #f8f8f8;
  }
`