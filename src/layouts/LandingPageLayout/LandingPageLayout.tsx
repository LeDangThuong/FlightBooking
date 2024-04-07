import React from 'react'

import Header from '../Header'
import Footer from '../Footer'

interface LandingPageLayoutProps {
  children?: React.ReactNode
}

export default function LandingPageLayout({ children }: LandingPageLayoutProps) {
  return (
    <>
      <Header className=' absolute z-10' />
      {children}
      <Footer />
    </>
  )
}
