import React from 'react'
import ReactDOM from 'react-dom'
import { ToastProvider } from 'react-toast-notifications';

import ThemeProvider, { GlobalStyle } from './Theme'
import LocalStorageContextProvider, { Updater as LocalStorageContextUpdater } from './contexts/LocalStorage'
import GlobalDataContextProvider from './contexts/GlobalData'
import App from './App'

function ContextProviders({ children }) {
  return (
    <LocalStorageContextProvider>
      <ToastProvider>
        <GlobalDataContextProvider>
          {children}
        </GlobalDataContextProvider>
      </ToastProvider>
    </LocalStorageContextProvider>
  )
}

function Updaters() {
  return (
    <>
      <LocalStorageContextUpdater />
    </>
  )
}

ReactDOM.render(
  <ContextProviders>
    <Updaters />
    <ThemeProvider>
      <>
        <GlobalStyle />
        <App />
      </>
    </ThemeProvider>
  </ContextProviders>,
  document.getElementById('root')
)
