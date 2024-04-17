import LandingPageLayout from '@/layouts/LandingPageLayout'
import LandingPageLayoutLableBlack from '@/layouts/LandingPageLayout/LandingPageLayoutLableBlack'
import { ForgotPassword } from '@/modules/auth/pages/ForgotPassword'
import { SetPassword } from '@/modules/auth/pages/SetPassword'
import { SignUp } from '@/modules/auth/pages/SignUp'
import { Login } from '@/modules/auth/pages/login'
import FlightListing from '@/modules/flight_flow/pages/Flight_Listing'
import HomePage from '@/modules/home/pages/HomePage'
import { useRoutes } from 'react-router-dom'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/home',
      element: (
        <LandingPageLayout>
          <HomePage />
        </LandingPageLayout>
      )
    },

    {
      path: '/',
      element: <Login />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/reset-password',
      element: <SetPassword />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/flight_listing',
      element: (
        <LandingPageLayoutLableBlack>
          <FlightListing />
        </LandingPageLayoutLableBlack>
      )
    }
  ])

  return routeElements
}
