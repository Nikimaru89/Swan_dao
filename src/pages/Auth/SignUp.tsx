import React, { useState } from 'react';
import { Button, TextField, Card, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useToasts } from 'react-toast-notifications';

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
const SignUp = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    setLoading(true)
    if (password !== confirmPassword) {
      addToast('Password and Confirm Password must be same.', {
        appearance: 'warning',
        autoDismiss: true,
      })
    }
    try {
      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          phone_number: phone
        },
      });
      addToast('Account Registration Success!', {
        appearance: 'success',
        autoDismiss: true,
      })
      history.push('/confirmation')
    } catch (error: any) {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true,
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
        onSubmit={handleSignUp}
      >
        <h2 style={{ fontWeight: 700, color: '#000000' }}>
          New Account Registration
        </h2>
        <Field variant='standard' label='Name' value={name} onChange={(event) => setName(event.target.value)} required={true} />
        <Field variant='standard' label='Email' type='email' value={email} onChange={(event) => setEmail(event.target.value)} required={true} />
        <Field variant='standard' label='Phone Number' type='tel' value={phone} onChange={(event) => setPhone(event.target.value)} required={false} />
        <Field variant='standard' label='Password' value={password} type='password' onChange={(event) => setPassword(event.target.value)} required={true} />
        <Field variant='standard' label='Confirm Password' value={confirmPassword} type='password' onChange={(event) => setConfirmPassword(event.target.value)} required={true} />
        <Button
          variant='contained'
          size='medium'
          type='submit'
          fullWidth={true}
          disabled={loading}
          sx={{ backgroundColor: '#2979FF' }}
        >
          {loading && <CircularProgress />}
          Sign Up
        </Button>
      </form>
    </StyledCard>
  )
}

export default SignUp