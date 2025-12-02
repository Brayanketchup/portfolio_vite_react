import React from 'react'
import { Nav } from '../minicomponents'

export const Navbar = () => {
  return (
    <nav className=' sticky top-0  z-20 place-items-end'>
        <Nav
          items={[
            { label: 'Home', href: '#Home' },
            { label: 'About', href: '#About' },
            { label: 'Projects', href: '#Projects' },

          ]}
          activeHref="/"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#000000"
          pillColor="#000000"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#ffffff"
        />
    </nav>
  )
}
