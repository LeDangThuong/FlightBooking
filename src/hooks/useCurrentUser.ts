import { useState, useEffect } from 'react'

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // Your logic to fetch the current user goes here
    // For example, you can make an API call to retrieve the user data
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/currentUser')
        const data = await response.json()
        setCurrentUser(data)
      } catch (error) {
        console.error('Error fetching current user:', error)
      }
    }

    fetchCurrentUser()
  }, [])

  return currentUser
}

export default useCurrentUser
