import { useState, useEffect } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0aHVvbmdsZSIsImlhdCI6MTcxNzY4MjM2MiwiZXhwIjoxNzE3Njk2NzYyfQ.vpamDBm-JX9_vMT77vTQ4I9R3VImA1bUvztMgv9GTvk');

  const baseUrl = 'http://localhost:7050/payment';
  const email = 'ledangthuong2003@gmail.com';

  useEffect(() => {
    const fetchCustomerAndPaymentMethods = async () => {
      try {
        const customerResponse = await axios.post(`${baseUrl}/create-customer`, null, {
          params: { email }
        });
        setCustomerId(customerResponse.data.customerId);

        const paymentMethodsResponse = await axios.get(`${baseUrl}/payment-methods`, {
          params: { email },
          headers: { Authorization: `Bearer ${token}` }
        });
        setPaymentMethods(paymentMethodsResponse.data);
      } catch (error) {
        console.error('Error fetching customer or payment methods:', error);
      }
    };

    fetchCustomerAndPaymentMethods();
  }, [token]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    if (showNewCardForm) {
      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) {
        setMessage('Card element not found');
        setIsLoading(false);
        return;
      }

      try {
        if (!customerId) {
          throw new Error('Customer ID not found');
        }

        const setupIntentResponse = await axios.post(`${baseUrl}/create-setup-intent`, null, {
          params: { customerId }
        });
        const clientSecret = setupIntentResponse.data.clientSecret;

        const confirmResult = await stripe.confirmCardSetup(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        if (confirmResult.error) {
          throw new Error(confirmResult.error.message);
        }

        const paymentMethodId = confirmResult.setupIntent.payment_method;

        await axios.post(`${baseUrl}/attach-payment-method`, null, {
          params: { customerId, paymentMethodId }
        });

        setMessage('Card added successfully!');

        const response = await axios.get(`${baseUrl}/payment-methods`, {
          params: { email },
          headers: { Authorization: `Bearer ${token}` }
        });
        setPaymentMethods(response.data);
        setShowNewCardForm(false);
      } catch (error: any) {
        console.error('Error occurred during card setup process:', error);
        if (axios.isAxiosError(error)) {
          setMessage(`Network Error: ${error.message}`);
        } else {
          setMessage(error.message || 'An unexpected error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        if (!customerId) {
          throw new Error('Customer ID not found');
        }
        if (!selectedPaymentMethod) {
          throw new Error('Payment method not selected');
        }

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
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Information</h2>
        {showNewCardForm ? (
          <>
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
          </>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select a card</label>
            <select
              className="p-2 border rounded-md w-full"
              value={selectedPaymentMethod || ''}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
              <option value="">Select a card</option>
              {paymentMethods.map((method: any) => (
                <option key={method.stripePaymentMethodId} value={method.stripePaymentMethodId}>
                  {method.cardBrand} **** **** **** {method.cardLast4}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setShowNewCardForm((prev) => !prev)}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
          >
            {showNewCardForm ? 'Cancel' : 'Add New Card'}
          </button>
          <button
            type="submit"
            disabled={!stripe || isLoading}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isLoading ? 'Processing...' : showNewCardForm ? 'Add Card' : 'Pay'}
          </button>
        </div>
        {message && <div className="mt-4 text-center text-red-500">{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
