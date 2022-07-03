import axios, { AxiosResponse } from 'axios'

axios.defaults.baseURL = '/api'

type Credentials = {
  email: string
  password: string
}

type ApiResponse<T = any> = {
  message: string
  data: T
  code: number
}

export const login = async ({ email, password }: Credentials) => {
  const {
    data,
  }: AxiosResponse<
    ApiResponse<{
      token: string
      user: {
        id: number
        email: string
        name: string
        uuid: string
      }
    }>
  > = await axios.post('auth/login', {
    email,
    password,
  })
  if (data.code !== 200) {
    throw new Error(data.message)
  }
  return data.data
}

export const register = async ({
  email,
  password,
}: Credentials): Promise<ApiResponse> => {
  const { data }: AxiosResponse<ApiResponse<null>> = await axios.post(
    'users/register',
    {
      email,
      password,
    }
  )
  if (data.code !== 200) {
    throw new Error(data.message)
  }
  return data
}

export const profile = async (token: string) => {
  return axios.get('user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updateProfile = async (token, data) => {
  return axios.post('user/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const generateTokens = async (refreshToken, userId) => {
  return axios.post('auth/refreshtoken', {
    refreshToken,
    userId,
  })
}
