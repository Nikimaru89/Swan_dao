import React, { useState } from 'react';
import { Card, TextField, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useHistory, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Auth } from 'aws-amplify';

const StyledCard = styled(Card)`
  width:500px;
  margin:100px auto;
  padding:40px;
`
const Field = styled(TextField)`
  margin: 10px;
  & .MuiInputLabel-root {
    font-size:15px;
  }
  & .MuiInput-root {
    color: #000000;
    font-weight: 400;
  }
`
const BottomLink = styled(Link)`
  margin: 10px 0;
  text-align: right;
`

const SignIn = () => {
  const history = useHistory()
  const { addToast } = useToasts()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    setLoading(true)
    try {
      const user = await Auth.signIn(email, password);
      addToast('Sign in succeeded', {
        appearance: 'success',
        autoDismiss: true
      })
      history.push('/analytics')
    } catch (error: any) {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true
      })
    }
    setLoading(false)
  }
  return (
    <StyledCard >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        onSubmit={handleSignIn}
      >
        <h2 style={{ fontWeight: 700, color: '#000000' }}>
          Sign In
        </h2>
        <Field variant='standard' label='Email' type='email' value={email} onChange={(event) => setEmail(event.target.value)} required={true} />
        <Field variant='standard' label='Password' value={password} type='password' onChange={(event) => setPassword(event.target.value)} required={true} />
        <Button
          variant='contained'
          size='medium'
          type='submit'
          fullWidth={true}
          disabled={loading}
          sx={{ backgroundColor: '#2979FF' }}
        >
          {loading && <CircularProgress />}
          Sign In
        </Button>
        <BottomLink to='/signup'>make an account &rarr;</BottomLink>
      </form>
    </StyledCard>
  )
}

export default SignIn