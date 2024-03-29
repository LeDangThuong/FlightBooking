import React from 'react'
import { Login } from './layouts/auth/login'
import { SignUp } from './layouts/auth/SignUp'
import { ForgotPassword } from './layouts/auth/ForgotPassword'
import { VerifyCode } from './layouts/auth/VerifyCode'
import { SetPassword } from './layouts/auth/SetPassword'

function App() {
  return (
    <>
      <div>
        <SetPassword />
      </div>
    </>
  )
}

export default App
