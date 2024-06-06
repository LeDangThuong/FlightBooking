import { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aHVvbmdsZSIsImlhdCI6MTcxNzY3MzI0NywiZXhwIjoxNzE3NjgwNDQ3fQ.b1aonwxPjVqPbuhRrB8u0mUXlPaeoSnmeDEwzUpOZOY';
  const baseUrl = 'http://localhost:7050/payment';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      setMessage('Card element not found');
      setIsLoading(false);
      return;
    }

    try {
      // Tạo khách hàng trên Stripe
      const customerResponse = await axios.post(`${baseUrl}/create-customer`, null, {
        params: { email: 'ledangthuong2003@gmail.com' } // sửa email của người dùng
      });
      let customerId = customerResponse.data.customerId;

      // Tạo SetupIntent để lấy client_secret
      const setupIntentResponse = await axios.post(`${baseUrl}/create-setup-intent`, null, {
        params: { customerId }
      });
      const clientSecret = setupIntentResponse.data.clientSecret;

      // Xác nhận SetupIntent trên client
      const confirmResult = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (confirmResult.error) {
        throw new Error(confirmResult.error.message);
      }

      const paymentMethodId = confirmResult.setupIntent.payment_method;

      // Gắn PaymentMethod vào Customer
      await axios.post(`${baseUrl}/attach-payment-method`, null, {
        params: { customerId, paymentMethodId }
      });

      // Tạo PaymentIntent để tiến hành thanh toán
      const paymentResponse = await axios.post(`${baseUrl}/create-payment`, null, {
        params: { token, amount: 5000, flightId: 1 }
        // Đoạn này set token với amount của người dùng nhé, flight ID thì là cái flight đặt
      });
      const paymentIntentClientSecret = paymentResponse.data.clientSecret;

      // Xác nhận thanh toán trên client
      const paymentConfirmResult = await stripe.confirmCardPayment(paymentIntentClientSecret);

      if (paymentConfirmResult.error) {
        throw new Error(paymentConfirmResult.error.message);
      }

      setMessage('Payment successful!');
    } catch (error: any) {
      console.error('Error occurred during payment process:', error);
      if (axios.isAxiosError(error)) {
        setMessage(`Network Error: ${error.message}`);
      } else {
        setMessage(error.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Information</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <div className="p-2 border rounded-md">
            <CardNumberElement className="w-full" />
          </div>
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
            <div className="p-2 border rounded-md">
              <CardExpiryElement className="w-full" />
            </div>
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
            <div className="p-2 border rounded-md">
              <CardCvcElement className="w-full" />
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {isLoading ? 'Processing...' : 'Pay'}
        </button>
        {message && <div className="mt-4 text-center text-red-500">{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
