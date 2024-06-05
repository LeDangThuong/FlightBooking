import LandingPageLayout from '@/layouts/LandingPageLayout'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/modules/home/pages/HomePage'
import ProfilePage from '@/modules/profile/pages/ProfilePage'
import { useRoutes } from 'react-router-dom'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
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
      )
    }
  ])

  return routeElements
}
