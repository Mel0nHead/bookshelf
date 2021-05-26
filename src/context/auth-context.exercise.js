import React from 'react'

export const AuthContext = React.createContext()

export function useAuthContext() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within AuthContext.Provider')
  }

  return context
}

export function AuthContextProvider({children}) {
  return <AuthContext.Provider>{children}</AuthContext.Provider>
}
