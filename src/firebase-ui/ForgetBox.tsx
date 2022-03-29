import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useFSUI } from '../context'
import { sendPasswordResetEmail } from 'firebase/auth'

const timeleft = 120

export const ForgetBox = () => {
  const { auth, t, setState, config } = useFSUI()
  const [values, setValues] = useState({
    email: '',
    current: Date.now(),
    error: '',
    lastSubmit: 0
  })

  const getTime = Math.floor((values.current - values.lastSubmit) / 1000)
  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    setValues((s) => ({ ...s, email: value, error: '' }))
  }
  const handleSendEmail = async () => {
    if (auth && values.email) {
      setValues((s) => ({ ...s, lastSubmit: Date.now() }))
      await sendPasswordResetEmail(auth, values.email).catch((err) => {
        config?.onError?.(err)
        setValues((s) => ({ ...s, error: t(err.code), lastSubmit: 0 }))
      })
    }
  }

  useEffect(() => {
    setValues((s) => ({ ...s, current: Date.now() }))
    const timeCurrent = setInterval(() => {
      setValues((s) => ({ ...s, current: Date.now() }))
    }, 1000)
    return () => {
      clearInterval(timeCurrent)
    }
  }, [])

  return (
    <div>
      <Box mb={2}>
        <Button
          startIcon={<FontAwesomeIcon icon={['fas', 'chevron-left']} />}
          onClick={() => setState((s) => ({ ...s, tab: 'emailpass' }))}
        >
          {t('Back')}
        </Button>
      </Box>
      <TextField
        fullWidth
        label={t('Email')}
        value={values.email}
        onChange={handleChange}
        error={Boolean(values.error)}
        helperText={values.error}
      />
      {values.lastSubmit === 0 || timeleft - getTime < 0 ? (
        <Button
          fullWidth
          variant='outlined'
          size='large'
          sx={{ mt: 2 }}
          startIcon={<FontAwesomeIcon icon={['fas', 'paper-plane']} />}
          onClick={handleSendEmail}
          disabled={!values.email}
        >
          {t('SendEmail')}
        </Button>
      ) : (
        <Button
          fullWidth
          variant='outlined'
          size='large'
          sx={{ mt: 2 }}
          startIcon={<FontAwesomeIcon icon={['fas', 'ban']} />}
          disabled
        >
          {t('PleaseWait')} ({timeleft - getTime})
        </Button>
      )}
    </div>
  )
}
