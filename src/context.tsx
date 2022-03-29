import { BoxProps, TextFieldProps } from '@mui/material'
import { createContext, useContext } from 'react'
import { Auth, User } from 'firebase/auth'
import { FirebaseOptions } from '@firebase/app'

export type iconKeys = 'visibility' | 'visibilityOff' | 'signin'
export type ProviderTypes =
  | 'google'
  | 'facebook'
  | 'apple'
  | 'twitter'
  | 'github'
  | 'microsoft'
  | 'yahoo'

export interface userTypes {
  loading: boolean
  data: User | null
}
export type stateTypes = {
  loading: boolean
  tab: string
  error?: string
}

export type TranslateKeys =
  | 'auth/auth-not-found'
  | 'auth/email-already-in-use'
  | 'auth/invalid-email'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'Back'
  | 'ConfirmPassword'
  | 'Email'
  | 'ForgetPassword'
  | 'InvalidFormat'
  | 'Password'
  | 'Password8Chars'
  | 'PasswordNotMatch'
  | 'PleaseWait'
  | 'SendEmail'
  | 'SignIn'
  | 'SignOut'
  | 'SignUp'

export interface FSUIConfig {
  providers?: ProviderTypes[]
  callback: (user: User) => void
  onError?: (error: Error) => void
}

export interface FirebaseSignInUIProps {
  firebaseConfig: FirebaseOptions
  variant?: 'dialog' | 'fluid'
  title?: React.ReactNode
  open?: boolean
  onClose?: () => void
  componentProps?: {
    container?: Omit<BoxProps, 'children'> & { noBorder?: boolean }
    textField?: Omit<TextFieldProps, 'value' | 'onChange' | 'label'>
  }
  icons?: { [key in iconKeys]: JSX.Element }
  config: FSUIConfig
  translate?: { [key in TranslateKeys]?: string }
}

export type TFunc = (value: TranslateKeys, fallback?: string) => string

export interface FSUIContextTypes
  extends Omit<FirebaseSignInUIProps, 'auth' | 'firebaseConfig'> {
  auth?: Auth
  getIcon: (key: iconKeys, fallback: JSX.Element) => JSX.Element | null
  state: stateTypes
  setState: React.Dispatch<React.SetStateAction<stateTypes>>
  user: userTypes
  setUser: React.Dispatch<React.SetStateAction<userTypes>>
  firebaseConfig?: FirebaseOptions
  t: TFunc
}
export const FSUIContext = createContext<FSUIContextTypes>({
  getIcon: () => null,
  state: { loading: false, tab: 'emailpass' },
  setState: () => {},
  user: { loading: true, data: null },
  setUser: () => {},
  config: {
    callback: () => {}
  },
  translate: {},
  t: () => ''
})

export const useFSUI = () => useContext(FSUIContext)
