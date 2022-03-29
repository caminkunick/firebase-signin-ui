import React, { useState } from 'react'
import { FirebaseOptions } from 'firebase/app'
import { FirebaseSignInUI, FSUIConfig, TranslateKeys } from '@caminkunick/firebase-signin-ui'
import '@caminkunick/firebase-signin-ui/dist/index.css'
import { Typography } from '@mui/material'

export let firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
}

const App = () => {
  const [open, setOpen] = useState<boolean>(true)

  const handleOpen = (open: boolean) => () => setOpen(open)
  const config: FSUIConfig = {
    providers: ['google'],
    callback: (user) => console.log(user),
    onError: (err) => console.warn(err.message)
  }
  const translate:{ [key in TranslateKeys]:string } = {
    "auth/auth-not-found":  "ไม่พบ Auth",
    "auth/email-already-in-use":  "อีเมลได้ถูกใช้งานแล้ว",
    "auth/invalid-email": "อีเมลไม่ถูกต้อง",
    "auth/user-not-found":  "ไม่พบผู้ใช้งานนี้",
    "auth/wrong-password":  "รหัสผ่านไม่ถูกต้อง",
    "Back": "กลับ",
    "ConfirmPassword":  "ยืนยันรหัสผ่าน",
    "Email":  "อีเมล",
    "ForgetPassword": "ลืมรหัสผ่าน",
    "InvalidFormat":  "ไม่ถูกต้อง",
    "Password": "รหัสผ่าน",
    "Password8Chars": "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
    "PasswordNotMatch": "รหัสผ่านไม่ตรงกัน",
    "PleaseWait": "กรุณารอสักครู่",
    "SendEmail":  "ส่งอีเมล",
    "SignIn": "เข้าสู่ระบบ",
    "SignOut": "ออกจากระบบ",
    "SignUp": "สมัครสมาชิก"
  }

  return (
    <FirebaseSignInUI
      variant="dialog"
      firebaseConfig={firebaseConfig}
      title={
        <Typography variant='h3' align='center' paragraph>
          Welcome
        </Typography>
      }
      open={open}
      onClose={handleOpen(false)}
      config={config}
      translate={translate}
    />
  )
}

export default App
