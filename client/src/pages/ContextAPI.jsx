import React, { createContext } from "react"
export const dataContext = createContext()
function ContextAPI({ children }) {
    // const serverUrl = "http://192.168.43.163:8000"
    const serverUrl = "http://localhost:8000"


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




