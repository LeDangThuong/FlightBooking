
import axios from 'axios'

const API_URL = 'https://flightbookingbe-production.up.railway.app'

// export const fetchCustomerAndPaymentMethods = async (email: string) => {
//     try {
//       const customerResponse = await axios.post(`${API_URL}/create-customer`, null, {
//         params: { email }
//       });
//       setCustomerId(customerResponse.data.customerId);

//       const paymentMethodsResponse = await axios.get(`${baseUrl}/payment-methods`, {
//         params: { email },
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setPaymentMethods(paymentMethodsResponse.data);
//     } catch (error) {
//       console.error('Error fetching customer or payment methods:', error);
//     }
// };
  

export const createCustomer = async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/payment/create-customer`, null, {
          params: { email },
        
      });
      return response;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
};


export const createPaymentMethod = async (email: string, token: string) => {
    try {
      const response = await axios.get(`${API_URL}/payment/payment-methods?email=${email}`, );
      return response;
    } catch (error) {
      console.error('Error creating payment method:', error);
      throw error;
    }
};

export const createSetupIntent = async (customerId: string) => {

    try {
        const setupIntentResponse = await axios.post(`${API_URL}/payment/create-setup-intent`, null, {
            params: { customerId }
        });

        return setupIntentResponse;
    } catch (error) {
        console.error('Error creating setup intent:', error);
        throw error;
    }
  
    

}


export const attachPaymentMethod = async (customerId: string, paymentMethodId: string) => {   

    try {
        const response = await axios.post(`${API_URL}/payment/attach-payment-method`, null, {
            params: { customerId, paymentMethodId }
        });

        return response;

    }catch(error) {
        console.error('Error attaching payment method:', error);
        throw error;
    }
}

export const createPayment = async (token: string, amount: number, flightId: number, bookingData: any) => {
    try {
        const paymentResponse = await axios.post(`${API_URL}/payment/create-payment`, bookingData, {
            params: { token, amount, flightId }
            ,
            // Đoạn này set token với amount của người dùng nhé, flight ID thì là cái flight đặt
        });
        return paymentResponse;
    }catch(error) {
        console.error('Error creating payment:', error);
        throw error;
    }
}
    


