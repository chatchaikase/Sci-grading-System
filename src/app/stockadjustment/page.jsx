import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <button className='btn btn-primary px-7 py-2'>
      <Link href={'/stockadjustment/list/detail'}>stock detail</Link>
      </button>
      <button className='btn btn-secondary px-7 py-2'>
      <Link href={'/stockadjustment/list/maintain'}>stock maintain</Link>
      </button>
    </div>
  )
}

export default page