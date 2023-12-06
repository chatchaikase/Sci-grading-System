import Link from 'next/link'
import React from 'react'

const DetaiPage = () => {
  return (
    <button className='btn btn-primary px-7 py-2'>
      <Link href={'/stockadjustment'}>Stock Adjustment</Link>
      </button>
  )
}

export default DetaiPage