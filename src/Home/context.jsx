// for send token with request headers we use this context 
import { createContext, useState } from "react";
export const AuthContext = createContext() ;

export function AuthProvider({children}){
   const [token ,setToken] =useState(null) ;

    return (

    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>

    )
}