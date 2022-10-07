import React, { useState } from 'react'
import styled from 'styled-components'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { Amplify, Auth } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

import { awsConfig } from './config/aws-config';
import { useCombinedDetailsData, useCombinedChartData } from './contexts/GlobalData'
import LocalLoader from './components/LocalLoader'
import Header from './components/Header'
import Footer from './components/Footer'
import Analytics from './pages/Analytics'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import Confirmation from './pages/Auth/Confirmation'
import Middleware from './pages/Auth/Middleware'

Amplify.configure(awsConfig);

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
`

const ContentWrapper = styled.div`
  width: 100%;
  padding: 40px 0 60px;
`

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Header />
      <div className='container'>
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </div>
      <Footer />
    </>
  )
}

function App() {

  const detailsData = useCombinedDetailsData()
  const combinedChartData = useCombinedChartData()

  return (
    <AppWrapper>
      {detailsData &&
        Object.keys(detailsData).length > 0 &&
        combinedChartData &&
        Object.keys(combinedChartData).length > 0 ? (

        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <LayoutWrapper>
                <Middleware />
              </LayoutWrapper>
            </Route>
            <Route exact path="/analytics">
              <LayoutWrapper>
                <Analytics />
              </LayoutWrapper>
            </Route>
            <Route exact path="/signin">
              <LayoutWrapper>
                <SignIn />
              </LayoutWrapper>
            </Route>
            <Route exact path="/signup">
              <LayoutWrapper>
                <SignUp />
              </LayoutWrapper>
            </Route>
            <Route exact path="/confirmation">
              <LayoutWrapper>
                <Confirmation />
              </LayoutWrapper>
            </Route>
            <Redirect to="/signin" />
          </Switch>
        </BrowserRouter>

      ) : (
        <LocalLoader fill="true" />
      )}
    </AppWrapper>
  )
}

export default App
