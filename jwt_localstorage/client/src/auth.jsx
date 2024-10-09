import { createContext, useContext, useState } from "react"

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
            const [token , setTokenState] = useState(localStorage.getItem('token') || null)


            const setToken = (newToken)=>{
                        setTokenState(newToken);
                        localStorage.setItem('token', newToken);
            }

            const clearToken = ()=>{
                        setTokenState(null)
                        localStorage.removeItem('token')
            }


            return (

                        <AuthContext.Provider value={{token , setToken , clearToken}}>
                                    {children}
                        </AuthContext.Provider>
            )
}

export const useAuth = () => useContext(AuthContext)