import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Dialog, DialogContent, Slide, SlideProps } from '@mui/material'
import { initializeApp } from 'firebase/app'
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth'
import * as React from 'react'
import {
  FirebaseSignInUIProps,
  FSUIContext,
  iconKeys,
  stateTypes,
  TranslateKeys,
  useFSUI,
  userTypes
} from './context'
import { ForgetBox } from './firebase-ui/ForgetBox'
import { Loading } from './firebase-ui/Loading'
import { RegisterBox } from './firebase-ui/RegisterBox'
import { Root } from './firebase-ui/Root'
import { SignedBox } from './firebase-ui/Signed'
import { SignInWithEmail } from './firebase-ui/SignInWithEmail'

library.add(fas, fab)

const VariantRoot = (props: { children: React.ReactNode }) => {
  const { variant, open, onClose, componentProps } = useFSUI()

  return variant === 'dialog' ? (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open || false}
      onClose={onClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'down' } as SlideProps}
    >
      <DialogContent>
        <Root {...componentProps?.container} noBorder>
          {props.children}
        </Root>
      </DialogContent>
    </Dialog>
  ) : (
    <React.Fragment>
      <Root {...componentProps?.container}>{props.children}</Root>
    </React.Fragment>
  )
}

export const FirebaseSignInUI = (props: FirebaseSignInUIProps) => {
  const [auth, setAuth] = React.useState<Auth>()
  const [user, setUser] = React.useState<userTypes>({
    loading: true,
    data: null
  })
  const [state, setState] = React.useState<stateTypes>({
    loading: false,
    tab: 'emailpass'
  })

  const getIcon = (key: iconKeys, fallback: JSX.Element) =>
    props?.icons?.[key] || fallback
  const t = (text: TranslateKeys, fallback?: string) => {
    const dict: { [key in TranslateKeys]: string } = Object.assign(
      {},
      {
        'auth/auth-not-found': 'Auth not found',
        'auth/email-already-in-use': 'E-mail already in use',
        'auth/invalid-email': 'Invalid E-mail',
        'auth/wrong-password': 'Wrong Password',
        'auth/user-not-found': 'User not found',
        Back: 'Back',
        ConfirmPassword: 'Confirm Password',
        Email: 'E-mail',
        ForgetPassword: 'Forget Password',
        InvalidFormat: 'Invalid Format',
        Password: 'Password',
        Password8Chars: 'Passwords must be at least 8 characters',
        PasswordNotMatch: 'Password not match',
        PleaseWait: 'Please wait',
        SendEmail: 'Send E-mail',
        SignIn: 'Sign In',
        SignOut: 'Sign Out',
        SignUp: 'Sign Up'
      },
      props.translate
    )
    return dict[text] || fallback || text
  }

  React.useEffect(() => {
    if (props.firebaseConfig) {
      const app = initializeApp(props.firebaseConfig)
      const auth = getAuth(app)
      setAuth(auth)
      return onAuthStateChanged(auth, (user) => {
        setUser((s) => ({ ...s, data: user, loading: false }))
      })
    } else {
      return () => {}
    }
  }, [props.firebaseConfig])

  return (
    <FSUIContext.Provider
      value={{ ...props, auth, getIcon, state, setState, user, setUser, t }}
    >
      <VariantRoot>
        {user.loading ? (
          <Loading />
        ) : user.data ? (
          <SignedBox />
        ) : (
          <React.Fragment>
            {state.tab === 'emailpass' && <SignInWithEmail />}
            {state.tab === 'register' && <RegisterBox />}
            {state.tab === 'forget' && <ForgetBox />}
          </React.Fragment>
        )}
      </VariantRoot>
    </FSUIContext.Provider>
  )
}

export {
  iconKeys,
  ProviderTypes,
  FSUIConfig,
  FirebaseSignInUIProps,
  FSUIContextTypes,
  TranslateKeys
} from './context'
