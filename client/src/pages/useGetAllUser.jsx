
import axios from "axios"
import React, { useContext, useEffect } from "react"
import { useDispatch } from "react-redux"
import { dataContext } from "./ContextAPI"
import { setOtherUser } from "./redux/userSlice"

function useGetAllUser() {
    let dispatch = useDispatch()
    let {serverUrl} = useContext(dataContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await axios.get(`${serverUrl}/get-all-users`, { withCredentials: true })
                console.log(res)
                dispatch(setOtherUser(res.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
}

export default useGetAllUser
