import { Stack } from '@mui/material'
import {
  AuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  TwitterAuthProvider
} from 'firebase/auth'
import React from 'react'
import { ProviderTypes, useFSUI } from '../context'
import { IconButtonPopup } from './IconButtonPopup'
import { IconStyled } from './IconStyled'

const providers: { [key in ProviderTypes]: () => AuthProvider } = {
  google: () => new GoogleAuthProvider(),
  facebook: () => new FacebookAuthProvider(),
  apple: () => new OAuthProvider('apple.com'),
  twitter: () => new TwitterAuthProvider(),
  github: () => new GithubAuthProvider(),
  microsoft: () => new OAuthProvider('microsoft.com'),
  yahoo: () => new OAuthProvider('yahoo.com')
}
const icons: { [key in ProviderTypes]: JSX.Element } = {
  google: <IconStyled icon={['fab', 'google']} />,
  facebook: <IconStyled icon={['fab', 'facebook-f']} />,
  apple: <IconStyled icon={['fab', 'apple']} />,
  twitter: <IconStyled icon={['fab', 'twitter']} />,
  github: <IconStyled icon={['fab', 'github']} />,
  microsoft: <IconStyled icon={['fab', 'microsoft']} />,
  yahoo: <IconStyled icon={['fab', 'yahoo']} />
}

export const SignInWithProvider = () => {
  const { auth, config, setState, firebaseConfig } = useFSUI()
  const lists: ProviderTypes[] = [
    'apple',
    'facebook',
    'github',
    'google',
    'microsoft',
    'twitter',
    'yahoo'
  ]

  const handleSignInWithPopup = (provider: AuthProvider) => () => {
    if (auth) {
      signInWithPopup(auth, provider)
        .then(({ user }) => {
          config?.callback?.(user)
        })
        .catch((err) => {
          config?.onError?.(err)
          setState((s) => ({ ...s, error: err.message }))
          if (
            process.env.NODE_ENV === 'development' &&
            err.code === 'auth/operation-not-allowed'
          ) {
            console.warn(
              `please config provider at https://console.firebase.google.com/project/${firebaseConfig?.projectId}/authentication/providers`
            )
          }
        })
    }
  }

  return config?.providers?.length ? (
    <Stack direction={'row'} justifyContent='center' sx={{ mt: 6 }} spacing={1}>
      {lists.map((key) =>
        config?.providers?.includes(key) ? (
          <IconButtonPopup
            onClick={handleSignInWithPopup(providers?.[key]?.())}
            key={key}
          >
            {icons[key]}
          </IconButtonPopup>
        ) : null
      )}
    </Stack>
  ) : null
}
