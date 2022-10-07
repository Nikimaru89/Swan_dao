import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

const Middleware = () => {
  const history = useHistory()
  const [isAuthenticated, setUser] = useState(null)
  useEffect(() => {
    (async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
        history.push('/analytics')
      } catch (error) {
        console.log('error:', error)
        history.push('/signin')
      }
    })()
  }, [])

  return (
    <>
    </>
  )
}

export default Middleware