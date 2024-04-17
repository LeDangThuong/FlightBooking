import { useEffect } from 'react'
import useRouteElements from './hooks/useRouteElements'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token')

    const role = localStorage.getItem('role')

    if (!isLoggedIn && role === 'CUSTOMER') {
      navigate('/home')
    }
  }, [])

  const routeElements = useRouteElements()

  return <>{routeElements}</>
}

export default App
