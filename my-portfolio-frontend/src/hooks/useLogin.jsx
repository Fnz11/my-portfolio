import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [IsLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    
    
    
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch(`http://localhost:8000/api/user/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setIsLoading(false)
        } else {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }
    return {login, IsLoading, error}
}