import LandingPageLayout from '@/layouts/LandingPageLayout'

import MainLayout from '@/layouts/MainLayout'

import LandingPageLayoutLableBlack from '@/layouts/LandingPageLayout/LandingPageLayoutLableBlack'
import { ForgotPassword } from '@/modules/auth/pages/ForgotPassword'
import { SetPassword } from '@/modules/auth/pages/SetPassword'
import { SignUp } from '@/modules/auth/pages/SignUp'
import { VerifyCode } from '@/modules/auth/pages/VerifyCode'
import { Login } from '@/modules/auth/pages/login'
import { BookingDetails } from '@/modules/flight_flow/pages/Booking_Details'
import { DetailsFlight } from '@/modules/flight_flow/pages/Details_Flight'
import FlightListing from '@/modules/flight_flow/pages/Flight_Listing'
import { PassengerInformation } from '@/modules/flight_flow/pages/Passenger_Information'

import HomePage from '@/modules/home/pages/HomePage'
import ProfilePage from '@/modules/profile/pages/ProfilePage'
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
      path: '/profile',
      element: (
        <MainLayout>
          <ProfilePage />
        </MainLayout>


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
      path: '/verify-code',
      element: <VerifyCode />
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
    },
    {
      path: '/detail_flight',
      element: (
        <LandingPageLayoutLableBlack>
          <DetailsFlight />
        </LandingPageLayoutLableBlack>
      )
    },
    {
      path: '/booking_detail',
      element: (
        <LandingPageLayoutLableBlack>
          <BookingDetails />
        </LandingPageLayoutLableBlack>
      )
    },
    {
      path: '/passenger_information',
      element: (
        <LandingPageLayoutLableBlack>
          <PassengerInformation />
        </LandingPageLayoutLableBlack>

      )
    }
  ])

  return routeElements
}
