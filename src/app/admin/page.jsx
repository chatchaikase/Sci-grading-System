"use client"
import React from 'react'
import AdminUserList from '../../components/Admin/AdminUserList'


export default function AdminPage() {
  return (
    <div className='flex flex-col p-5 h-screen bg-gray-100'>
      <AdminUserList/>
    </div>
  )
}
