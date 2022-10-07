import React, { useState } from 'react';
import { Card, TextField, Button, CircularProgress } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
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
const BottomLink = styled(Link)`
  margin:10px;
  cursor: pointer;
`
const Flex = styled('div')`
  display: flex;
  justify-content: space-between;
`
const Div = styled('div')`
  margin: 10px;
  cursor: pointer;
`

const Confirmation = () => {
  const history = useHistory()
  const { addToast } = useToasts()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  const handleConfirmation = async (event: any) => {
    event.preventDefault()
    setLoading(true)
    try {
      await Auth.confirmSignUp(email, code);
      addToast('Confirming your account success', {
        appearance: 'success',
        autoDismiss: true
      })
    } catch (error: any) {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true
      })
    }
    history.push('/signin')
    setLoading(false)
  }
  const handleResend = async (event: any) => {
    event.preventDefault();
    setLoading(true)
    try {
      await Auth.resendSignUp(email);
      addToast('Re-send verification code success', {
        appearance: 'success',
        autoDismiss: true
      })
    } catch (err: any) {
      addToast('Re-send verification code failed', {
        appearance: 'error',
        autoDismiss: true
      })
    }
    setLoading(false)
  }

  return (
    <>
      <StyledCard >
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          onSubmit={handleConfirmation}
        >
          <h2 style={{ fontWeight: 700, color: '#000000' }}>
            Verify Your Account
          </h2>
          <Field variant='standard' label='Email' type='email' value={email} onChange={(event) => setEmail(event.target.value)} required={true} />
          <Field variant='standard' label='Verification Code' type='number' value={code} onChange={(event) => setCode(event.target.value)} required={true} />
          <Button
            variant='contained'
            size='medium'
            type='submit'
            fullWidth={true}
            disabled={loading}
            sx={{ backgroundColor: '#2979FF' }}
          >
            {loading && <CircularProgress />}
            Verify Your Account
          </Button>
          <Flex>
            <Div onClick={handleResend}>Re-send  confirmation code &rarr;</Div>
            <BottomLink to='/signup'>Registry an account &rarr;</BottomLink>
          </Flex>
        </form>
      </StyledCard>
    </>
  )
}

export default Confirmation