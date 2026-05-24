import axios from "axios"
import React, { useContext, useEffect } from "react"
import { useDispatch } from "react-redux"
import { dataContext } from "./ContextAPI"
import { setLoading, setUserData } from "./redux/userSlice"

function useGetCurrentUser() {
    let dispatch = useDispatch()
    let {serverUrl} = useContext(dataContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get(`${serverUrl}/get-current-user`, { withCredentials: true })
                console.log(res)
                dispatch(setUserData(res.data))
            } catch (error) {
                console.log(error)
                dispatch(setLoading(false))
            }
        }
        fetchData()
    }, [])
}

export default useGetCurrentUser