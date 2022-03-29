# @caminkunick/firebase-signin-ui

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/@caminkunick/firebase-signin-ui.svg)](https://www.npmjs.com/package/@caminkunick/firebase-signin-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @caminkunick/firebase-signin-ui
```

## Usage

```tsx
import React, { useState } from 'react'
import { FirebaseOptions } from 'firebase/app'
import { FirebaseSignInUI, FSUIConfig } from '@caminkunick/firebase-signin-ui'
import '@caminkunick/firebase-signin-ui/dist/index.css'
import { Typography } from '@mui/material'

export let firebaseConfig: FirebaseOptions = { ...config }

const App = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = (open: boolean) => () => setOpen(open)
  const config: FSUIConfig = {
    providers: ['google'],
    callback: (user) => console.log(user),
    onError: (err) => console.warn(err.message)
  }

  return (
    <FirebaseSignInUI
      firebaseConfig={firebaseConfig}
      title='Welcome'
      open={open}
      onClose={handleOpen(false)}
      config={config}
    />
  )
}
```

<br>
<br>

## Property

| Prop             | Type                                                                                                            | Default | Description                                        |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------- |
| firebaseConfig\* | FirebaseOptions                                                                                                 |         | config value from firebase console                 |
| title            | ReactNode                                                                                                       |         | title Element of tab sign in with E-mail           |
| variant          | 'dialog' \| 'fluid'                                                                                             | 'fluid' | title Element of tab sign in with E-mail           |
| open             | boolean                                                                                                         | false   | visibility state if variant is **"dialog"**        |
| onClose          | func                                                                                                            |         | close function when click backdrop or close button |
| componentProps   | {<br>&emsp;&emsp;container?: { noBorder?: boolean } & BoxProps,<br>&emsp;&emsp;textField?: TextFieldProps <br>} |         | additions properties for component                 |
| config\*         | FSUIConfig                                                                                                      |         | [config](#config) values                           |
| translate        | { [key in TranslateKeys]?: string }                                                                             |         | translate dict                                     |

<br>
<br>

## <a name="config"></a> Config

| Prop       | Type                                                                                                                        | Default | Description                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| providers  | Array< 'google'<br />\| 'facebook'<br />\| 'apple'<br />\| 'twitter'<br />\| 'github'<br />\| 'microsoft'<br />\| 'yahoo' > |         | array of provider                                                                             |
| callback\* | func                                                                                                                        |         | Signature:<br />**function(user: User) => void**<br />**User** is prop from **firebase/auth** |
| onError    | func                                                                                                                        |         | Signature:<br>**function(error:Error) => void**                                               |

<br>
<br>

## Translate

| **Key**                   |
| ------------------------- |
| auth/auth-not-found       |
| auth/email-already-in-use |
| auth/invalid-email        |
| auth/user-not-found       |
| auth/wrong-password       |
| Back                      |
| ConfirmPassword           |
| Email                     |
| ForgetPassword            |
| InvalidFormat             |
| Password                  |
| Password8Chars            |
| PasswordNotMatch          |
| PleaseWait                |
| SendEmail                 |
| SignIn                    |
| SignOut                   |
| SignUp                    |

<br>
<br>

```jsx
const translate:{ [key in TranslateKey]:string } = {
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
```

<br>
<br>

## License

MIT © [caminkunick](https://github.com/caminkunick)
