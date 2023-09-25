import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useChangePassword = () => {
    const [error, setError] = useState(null)
    const [IsLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const changePassword = async (username, currentPassword, verifPassword, newPassword) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:8000/api/user/changepassword`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, currentPassword, verifPassword, newPassword})
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
    return {changePassword, IsLoading, error}
}