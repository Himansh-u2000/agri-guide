import React from 'react'

export default function PrimaryButton({ className, children }) {
  return (
    <div className={`bg-primary mt-2 text-center text-white p-2 rounded-md hover:cursor-pointer duration-150 ease-in-out hover:bg-primary-shade shadow-sm hover:shadow-xl ${className}`}>
      {children}
    </div>
  )
}
