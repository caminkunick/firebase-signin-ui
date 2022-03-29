import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, TextField, Typography } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { ChangeEvent, Fragment, useRef, useState } from 'react'
import { useFSUI } from '../context'
import { PasswordField } from './PasswordField'
import { SignInWithProvider } from './Popup'
import { RegisForget } from './RegisForget'

export const SignInWithEmail = () => {
  const { auth, title, getIcon, componentProps, config, state, setState, t } =
    useFSUI()
  const inputRef = useRef({})
  const [values, setValues] = useState<{
    email: string
    password: string
  }>({
    email: '',
    password: ''
  })

  const handleChange =
    (key: 'email' | 'password') => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setValues((s) => ({ ...s, [key]: value }))
      setState((s) => ({ ...s, error: undefined }))
    }
  const handleSignIn = async () => {
    setState((s) => ({ ...s, error: undefined }))
    const isComplete = ['email', 'password'].every((key) => {
      if (!values[key]) {
        inputRef.current?.[key]?.focus()
      }
      return Boolean(values[key])
    })
    if (isComplete) {
      if (auth) {
        setState((s) => ({ ...s, loading: true }))
        await signInWithEmailAndPassword(auth, values.email, values.password)
          .then(({ user }) => {
            config?.callback?.(user)
            setState((s) => ({ ...s, loading: false }))
          })
          .catch((err) => {
            config?.onError?.(err)
            setState((s) => ({
              ...s,
              loading: false,
              error: t(err.code, err.message)
            }))
            setTimeout(() => {
              if (err.code.includes('email')) {
                inputRef.current['email'].focus()
              } else if (err.code.includes('password')) {
                inputRef.current['password'].focus()
              }
            }, 250)
          })
        return true
      } else {
        config?.onError?.(new Error(t('auth/auth-not-found')))
        setState((s) => ({ ...s, error: t('auth/auth-not-found') }))
      }
    }
    return false
  }
  const handleTextFieldKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const key = event.key
    if (key === 'Enter') {
      event.preventDefault()
      handleSignIn()
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) =>
    event.persist()

  return (
    <Fragment>
      {title}
      <TextField
        inputRef={(ref) => {
          inputRef.current['email'] = ref
        }}
        label={t('Email')}
        fullWidth
        variant='outlined'
        {...componentProps?.textField}
        onKeyDown={handleTextFieldKeyDown}
        tabIndex={1}
        value={values.email}
        onChange={handleChange('email')}
        disabled={state.loading}
      />
      <PasswordField
        ref={(ref) => {
          inputRef.current['password'] = ref
        }}
        value={values.password}
        onChange={handleChange('password')}
        onKeyDown={handleTextFieldKeyDown}
        disabled={state.loading}
      />
      {state.error && (
        <Typography
          variant='caption'
          color='error'
          sx={{ mt: 2 }}
          component='div'
        >
          {state.error}
        </Typography>
      )}
      <Button
        fullWidth
        variant='outlined'
        size='large'
        startIcon={getIcon(
          'signin',
          <FontAwesomeIcon icon={['fas', 'sign-in']} />
        )}
        type='submit'
        sx={{ mt: 2 }}
        onClick={handleSignIn}
        onKeyDown={handleKeyDown}
        disabled={state.loading}
      >
        {t("SignIn")}
      </Button>
      <SignInWithProvider />
      <RegisForget />
    </Fragment>
  )
}
