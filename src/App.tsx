import { useEffect } from 'react'
import useRouteElements from './hooks/useRouteElements'
import { useNavigate } from 'react-router-dom'
import CustomerChat from './modules/chat/CustomerChat'
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


  return <>{routeElements}
    <CustomerChat /></>

}

export default App

// import React from 'react'
// import { loadStripe } from '@stripe/stripe-js'
// import { Elements } from '@stripe/react-stripe-js'
// import CheckoutForm from './modules/checkout/components/CheckoutForm'

// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// const stripePromise = loadStripe(
//   'pk_test_51OVwerA7WrEjctnX9STvulzywtvSiHbBfwpWtPz1qUisHRlxGoqeYEsezmX3wub802xxdEyo6N65w2zLu77HLP3200k4IHYlWU'
// )

// const App: React.FC = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   )
// }

// export default App
