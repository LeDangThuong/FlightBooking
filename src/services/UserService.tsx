import axios from 'axios'

const API_URL = 'https://flightbookingbe-production.up.railway.app/'

const login = async (username: string, password: string) => {
  console.log(username, password)
  try {
    const response = await axios.post(`${API_URL}auth/signin`, {
      username,
      password
    })

    const tokenAccess = response.data.tokenAccess
    const role = response.data.role

    localStorage.setItem('tokenAccess', tokenAccess)
    localStorage.setItem('role', role)
    return tokenAccess
  } catch (error) {
    throw new Error('Đăng nhập thất bại. Vui lòng thử lại.')
  }
}

const signup = async (username: string, password: string, email: string, fullName: string, dayOfBirth: Date) => {
  try {
    const response = await axios.post(`${API_URL}auth/signup`, {
      username,
      password,
      email,
      fullName,
      dayOfBirth
    })

    if (response.status === 200) {
      return true
    }
  } catch (error) {
    throw new Error('Đăng ký thất bại. Vui lòng thử lại.')
  }

  return false
}

const forgotPassword = async (email: string) => {
  try {
    const response = await axios.put(`${API_URL}auth/forgot-password`, null, {
      params: {
        email: email // Đây là ví dụ, bạn cần thay đổi giá trị của email tùy thuộc vào dữ liệu thực tế.
      },
      headers: {
        Accept: 'application/hal+json'
      }
    })

    if (response.status === 200) {
      return true
    }
  } catch (error) {
    throw new Error('Vui lòng thử lại.')
  }
}

export { login, signup, forgotPassword }
