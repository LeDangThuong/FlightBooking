import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default MainLayout
