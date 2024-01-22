import React from 'react'
import ImportMain from '../../../components/Import/ImportMain'
import { auth } from '../../../lib/auth';
export default async function ImportPage() {
  const session = await auth();
  return (
    <div className='m-4'>
        <div className='bg-[#F5FAF4]'>
        <ImportMain session={session.user.userId}/>
        </div>
    </div>
  )
}
