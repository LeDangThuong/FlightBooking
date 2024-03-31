import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/modules/home/pages/HomePage'
import { useRoutes } from 'react-router-dom'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      )
    }
  ])

  return routeElements
}
