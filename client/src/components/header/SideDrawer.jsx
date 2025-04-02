import React, { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import Drawer from 'react-modern-drawer'

export default function SideDrawer({
  isOpen,
  toggleDrawer
}) {
  return (
    <>
      <nav className='flex md:hidden justify-center text-xl text-white'>
        
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction='right'
          className='bla bla bla'
        >

        </Drawer>
      </nav>
    </>
  )
}
