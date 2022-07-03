import { createContext, useEffect, useState } from 'react'
import config from '../config'
import parseJwt from '../utils/strings/parseJwt'

interface IAuthContext {
  auth?: {
    user: {
      id: number
      uuid: string
      name: string
      email: string
    }
    token: string
  }
  login: (auth: this['auth']) => void
  logout: () => void
}

interface IPayloadJwt {
  sub: string
  exp: number
  iat: number
}

const { userKeyItem } = config

const AuthContext = createContext<IAuthContext>({
  login: () => {},
  logout: () => {},
})

const AuthProvider = function ({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<IAuthContext['auth']>(() => {
    const auth = localStorage.getItem(userKeyItem)
    return auth ? JSON.parse(auth) : undefined
  })

  function login(auth: IAuthContext['auth']) {
    setAuth(auth)
    localStorage.setItem(userKeyItem, JSON.stringify(auth))
  }

  function logout() {
    setAuth(undefined)
    localStorage.removeItem(userKeyItem)
  }

  useEffect(() => {
    ;(async function () {
      try {
        if (!auth) return
        const { token } = auth
        const dataToken = parseJwt<IPayloadJwt>(token)
        const now = new Date()
        const expires = new Date(dataToken.exp * 1000)

        if (now.getTime() >= expires.getTime()) {
          logout()
        }
      } catch (error) {
        console.error('Error effect AuthProvider', error)
        logout()
      }
    })()
  }, [auth])

  const value = {
    auth,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
