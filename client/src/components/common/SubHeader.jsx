import React from 'react'

export default function SubHeader({
  label = "",

}) {
  return (
    <h2 className='md:text-2xl text-lg text-center font-semibold text-primary'>
      {label}
      <div className='max-w-32 h-0.5 mx-auto bg-black'></div>
    </h2>
  )
}
