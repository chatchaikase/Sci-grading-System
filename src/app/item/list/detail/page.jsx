import Link from 'next/link'
import React from 'react'

const DetailPage = () => {
  return (
    <button className='btn btn-primary px-7 py-2'>
      <Link href={'/item/list/detail'}>Item</Link>
    </button>
  )
}

export default DetailPage