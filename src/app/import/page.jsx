import React from 'react'
import ImportComponent from '../../components/Import/ImportComponent'
import { auth } from '../../lib/auth';
export default async function ImportPage() {
  const session = await auth();
  return (
    <div className='m-4'>
        <div className='bg-[#F5FAF4]'>
        <ImportComponent session={session.user.userId}/>
        </div>
    </div>
  )
}
