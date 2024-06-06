import React, { useState } from 'react'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { StripeCardElementOptions } from '@stripe/stripe-js'

const cardElementOptions: StripeCardElementOptions = {
  style: {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      fontWeight: '300',
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#CFD7E0'
      }
    },
    invalid: {
      iconColor: '#e5424d',
      color: '#e5424d'
    }
  }
  //   showIcon: true
}

const CheckoutForm: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const cardNumberElement = elements.getElement(CardNumberElement)
    const cardExpiryElement = elements.getElement(CardExpiryElement)
    const cardCvcElement = elements.getElement(CardCvcElement)

    if (cardNumberElement && cardExpiryElement && cardCvcElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement
      })

      if (error) {
        setMessage(error.message || 'An unexpected error occurred.')
      } else {
        setMessage('Payment method created successfully!')
        console.log('Payment Method:', paymentMethod)
      }

      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Payment Information</h2>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Card Number</label>
          <div className='p-2 border rounded-md'>
            <CardNumberElement options={cardElementOptions} className='w-full' />
          </div>
        </div>
        <div className='flex mb-4'>
          <div className='w-1/2 pr-2'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Expiration</label>
            <div className='p-2 border rounded-md'>
              <CardExpiryElement options={cardElementOptions} className='w-full' />
            </div>
          </div>
          <div className='w-1/2 pl-2'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>CVC</label>
            <div className='p-2 border rounded-md'>
              <CardCvcElement options={cardElementOptions} className='w-full' />
            </div>
          </div>
        </div>
        <div className='flex mb-4'>
          <div className='w-1/2 pr-2'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Country</label>
            <select className='p-2 border rounded-md w-full'>
              <option value='US'>United States</option>
              <option value='CA'>Canada</option>
              <option value='GB'>United Kingdom</option>
              <option value='AU'>Australia</option>
              <option value='VN'>Vietnam</option>
              {/* Add more countries as needed */}
            </select>
          </div>
          <div className='w-1/2 pl-2'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>ZIP</label>
            <input type='text' className='p-2 border rounded-md w-full' placeholder='12345' />
          </div>
        </div>
        <button
          type='submit'
          disabled={!stripe || isLoading}
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300'
        >
          {isLoading ? 'Processing...' : 'Pay'}
        </button>
        {message && <div className='mt-4 text-center text-red-500'>{message}</div>}
      </form>
    </div>
  )
}

export default CheckoutForm
