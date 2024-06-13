import axios from 'axios'
import { User } from '../models/User'

const API_URL = 'https://flightbookingbe-production.up.railway.app/'
// const API_URL = 'http://localhost:7050/'

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
    return null
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
    return false
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
    return false
  }
}

export const getUserByUsername = async (username: string): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API_URL}users/username?username=${username}`)

    return response.data
  } catch (e) {
    console.error('Error fetching users:', e)
    throw e
  }
}

export const verifyCode = async (codeOTP: number, email: string) => {
  try {
    const response = await axios.post(`${API_URL}auth/check-otp`, null, {
      params: {
        codeOTP: codeOTP,
        email: email
      },
      headers: {
        Accept: 'application/hal+json'
      }
    })

    if (response.status === 200) {
      return true
    }
  } catch (error) {
    throw new Error('Vui lòng nhập đầy đủ.')
  }
}

export const resetPassword = async (codeOTP: number, email: string, newPassword: string, confirmPassword: string) => {
  try {
    const response = await axios.put(
      `${API_URL}auth/reset-password`,
      {
        email,
        newPassword,
        confirmPassword,
        otp: codeOTP
      },
      {
        headers: {
          Accept: 'application/hal+json'
        }
      }
    )

    if (response.status === 200) {
      return true
    }
  } catch (error) {
    throw new Error('Vui lòng nhập đầy đủ.')
  }
}

export const userChangeInfor = async (
  token: string,
  fullName: string,
  dayOfBirth: Date,
  gender: string,
  address: string,
  phoneNumber: string,
  personalId: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}users/change-info`,
      {
        token,
        fullName,
        dayOfBirth,
        gender,
        address,
        phoneNumber,
        personalId
      },
      {
        headers: {
          Accept: 'application/hal+json'
        }
      }
    )

    if (response.status === 200) {
      return true
    }
  } catch (error) {
    throw error
  }
}

export const uploadNewAvatar = async (token: string, formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}users/upload-new-avatar?token=${token}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 200) {
      return true
    }
  } catch (error) {
    throw error
  }
}

export { login, signup, forgotPassword }
