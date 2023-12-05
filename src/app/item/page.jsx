import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <button className='btn btn-primary px-7 py-2'>
      <Link href={'/item/list/detail'}>item detail</Link>
      </button>
      <button className='btn btn-secondary px-7 py-2'>
      <Link href={'/item/list/maintain'}>item maintain</Link>
      </button>
    </div>
  )
}

export default page