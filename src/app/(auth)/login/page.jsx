import React from 'react'
import LoginForm from '../../../components/Login/LoginForm'
import { auth } from '../../../lib/auth'

export default async function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[500px] bg-gray-300 p-[50px] flex flex-col text-center gap-[30px] rounded-md">
        <LoginForm />
      </div>
    </div>
  )
}
