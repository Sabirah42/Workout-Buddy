import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        // reset Error in case this has been set to true following a previous request
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // saving user to local storage to keep them logged in
            localStorage.setItem('user', JSON.stringify(json))

            //update AuthContext
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}