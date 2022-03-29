import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  Button,
  TextField,
  TextFieldProps,
  Typography
} from '@mui/material'
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { TFunc, useFSUI } from '../context'
import { PasswordField } from './PasswordField'

type valuesTypes = {
  email: string
  password: string
  confirmPassword: string
}

const emailCheck = (
  email: string,
  t: TFunc
): Pick<TextFieldProps, 'error' | 'helperText'> => {
  const valid = email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  if (valid !== null || email.length === 0) {
    return {}
  } else {
    return { error: true, helperText: t('InvalidFormat') }
  }
}

const passwordCheck = (
  password: string,
  t: TFunc
): Pick<TextFieldProps, 'error' | 'helperText'> => {
  if (password.length > 0 && password.length < 8) {
    return {
      error: true,
      helperText: t('Password8Chars')
    }
  }
  return {}
}
const confirmPasswordCheck = (
  password: string,
  confirmPassword: string,
  t: TFunc
): Pick<TextFieldProps, 'error' | 'helperText'> => {
  if (confirmPassword.length > 0 && password !== confirmPassword) {
    return { error: true, helperText: t('PasswordNotMatch') }
  }
  return {}
}

export const RegisterBox = () => {
  const inputRef = useRef({})
  const { auth, config, setState, t } = useFSUI()
  const [values, setValues] = useState<valuesTypes>({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errText, setErrText] = useState<'auth/email-already-in-use' | ''>('')

  const isComplete = Object.values(values).every((value) => Boolean(value))
  const handleChange =
    (key: string) =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setValues((s) => ({ ...s, [key]: value }))
      setErrText('')
    }
  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleRegister()
    }
  }
  const handleRegister = async (): Promise<boolean> => {
    setErrText('')
    const isComplete = Object.keys(values).every((key) => {
      if (!values[key]) {
        inputRef.current?.[key]?.focus?.()
      }
      return Boolean(values[key])
    })

    if (emailCheck(values.email, t).error === true) {
      inputRef.current?.['email']?.focus?.()
    } else if (passwordCheck(values.password, t).error === true) {
      inputRef.current?.['password']?.focus?.()
    } else if (
      confirmPasswordCheck(values.password, values.confirmPassword, t).error ===
      true
    ) {
      inputRef.current?.['confirmPassword']?.focus?.()
    }

    if (isComplete && auth) {
      const UserCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).catch((err) => {
        setErrText(err.code)
        config?.onError?.(err)
      })
      if (UserCredential && UserCredential?.user) {
        config?.callback?.(UserCredential.user)
        setState((s) => ({ ...s, tab: 'emailpass' }))
      }
    }

    return false
  }

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
        inputRef={(ref) => {
          inputRef.current['email'] = ref
        }}
        fullWidth
        label={t('Email')}
        value={values.email}
        onChange={handleChange('email')}
        onKeyUp={handleKeyUp}
        {...emailCheck(values.email, t)}
      />
      <PasswordField
        ref={(ref) => {
          inputRef.current['password'] = ref
        }}
        value={values.password}
        onChange={handleChange('password')}
        onKeyDown={handleKeyUp}
        {...passwordCheck(values.password, t)}
      />
      <PasswordField
        ref={(ref) => {
          inputRef.current['confirmPassword'] = ref
        }}
        uid='cf-pass'
        label={t('ConfirmPassword')}
        value={values.confirmPassword}
        onChange={handleChange('confirmPassword')}
        onKeyDown={handleKeyUp}
        {...confirmPasswordCheck(values.password, values.confirmPassword, t)}
      />
      {errText && (
        <Typography
          variant='caption'
          color='error'
          component='div'
          sx={{ mt: 2 }}
        >
          {t(errText)}
        </Typography>
      )}
      <Button
        fullWidth
        variant='outlined'
        size='large'
        startIcon={<FontAwesomeIcon icon={['fas', 'sign']} />}
        onClick={handleRegister}
        sx={{ mt: 2 }}
        disabled={!isComplete}
        onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
          if (e.key === ' ') {
            e.persist()
          }
        }}
      >
        {t('SignUp')}
      </Button>
    </div>
  )
}
