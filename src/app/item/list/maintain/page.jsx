import Link from 'next/link'
import React from 'react'

const MaintainPage = () => {
  return (
    <div>
      <button className='btn btn-primary px-7 py-2'>
      <Link href={'/item'}>Item</Link>
      </button>
    </div>
  )
}

export default MaintainPage