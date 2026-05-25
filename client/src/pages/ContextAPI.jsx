import React, { createContext } from "react"
export const dataContext = createContext()
function ContextAPI({ children }) {
    // const serverUrl = "http://localhost:8000"
    const serverUrl = "https://onlyplus-backend.onrender.com"


    const value = {
        serverUrl
    }
    return (
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>

    )
}
export default ContextAPI




