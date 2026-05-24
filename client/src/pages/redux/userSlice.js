import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        otherUser: null,
        onlineData: null,
        messageData:null,
        isLoading:true
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.isLoading = false;
        },
        setOtherUser: (state, action) => {
            state.otherUser = action.payload
        },
        setOnlineData: (state, action) => {
            state.onlineData = action.payload
        },
        setMessageData: (state, action) => {
            state.messageData = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
})

export const { setUserData, setOtherUser, setOnlineData ,setMessageData,setLoading} = userSlice.actions

export default userSlice.reducer