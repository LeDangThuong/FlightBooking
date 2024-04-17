import React from 'react'

import Footer from '../Footer'
import HeaderLableBlack from '../Header/HeaderLableBlack'

interface LandingPageLayoutProps {
  children?: React.ReactNode
}

export default function LandingPageLayoutLableBlack({ children }: LandingPageLayoutProps) {
  return (
    <div>
      <HeaderLableBlack className=' absolute z-10' />
      {children}
      <Footer />
    </div>
  )
}
