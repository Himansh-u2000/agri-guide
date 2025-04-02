import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/AgriGuideLgoBW.png';
import { ROUTE } from '../../routes/route';


export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <>
      <header className="bg-primary">
        <div className="mx-auto px-4 flex items-center justify-between">

          <div className="flex items-center w-20 h-20">
            <NavLink to={`/`}>
              <img src={logo} alt="logo" className='h-20 w-20 object-cover' />
            </NavLink>
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden focus:outline-none"
          >
            <RxHamburgerMenu className="h-6 w-6 text-white" />
          </button>

          <nav className="hidden md:flex space-x-6">
            {ROUTE.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) =>
                  `text-white ${isActive ? 'underline ' : ''}`
                }
              >
                <span className='flex gap-4'>
                  {item.icon}
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Mobile side drawer */}
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${drawerOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
              }`}
            onClick={() => setDrawerOpen(false)}
          ></div>
          {/* Drawer */}
          <aside
            className={`fixed left-0 top-0 h-full w-64 bg-primary text-white p-4 shadow-xl z-50 transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            <nav className="flex flex-col space-y-4">
              {ROUTE.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  onClick={() => setDrawerOpen(false)}
                  className={({ isActive }) =>
                    `hover:font-semibold text-white ${isActive ? 'font-semibold' : ''}`
                  }
                >
                  <span className='flex gap-4'>
                    {item.icon}
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      </header>
    </>
  )
}