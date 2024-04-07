import LandingPageLayout from '@/layouts/LandingPageLayout'
import HomePage from '@/modules/home/pages/HomePage'
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
    }
  ])

  return routeElements
}
