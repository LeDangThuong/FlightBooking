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
    localStorage.setItem('tokenAccess', tokenAccess)
    return tokenAccess
  } catch (error) {
    throw new Error('Đăng nhập thất bại. Vui lòng thử lại.')
  }
}

export { login }
