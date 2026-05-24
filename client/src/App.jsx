import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import "./App.css"
import ShowMovie from "./pages/ShowMovie"
import AllUsers from "./pages/AllUsers"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import useGetCurrentUser from "./pages/useGetCurrectUser"
import useGetAllUser from "./pages/useGetAllUser"
import SendMessage from "./pages/SendMessage"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
import { setOnlineData } from "./pages/redux/userSlice"
import Profile from "./pages/Profile"
import Sports from "./pages/Sports"
import Admin from "./pages/Admin"
import socket from "./pages/socketConnect"
function App() {
  useGetCurrentUser()
  useGetAllUser()

  // const socket = io.connect("http://192.168.43.163:8000")
  // const socket = io.connect("http://localhost:8000")


  let dispatch = useDispatch()


  let { userData, isLoading } = useSelector(state => state.user)
  let [loading, setLoading] = useState(true)
  let [adminAlert, setAdminAlert] = useState()

  useEffect(() => {
    if (userData?._id) {
      socket.emit("checkOnline", userData._id)
    }

    socket.on("onlineUser", (userList) => {
      dispatch(setOnlineData(userList))
    })

    return () => socket.off("onlineUser")
  }, [userData?._id])

  const timer = setTimeout(() => {
    setLoading(false)

    return () => clearTimeout(timer)
  }, 1000);


  useEffect(() => {
    socket.on("sendMessageAdmin", (data) => {
      console.log("admin ne message bheja :", data)
      // alert(`📢 OnlyPlus : ${data}`);
      setAdminAlert(data)
      console.log("admin ne message bheja :", messageData)


    })
    return () => socket.off("sendMessageAdmin")

  }, [])



  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p>Loading...</p>
      </div>
    )
  }


  let date = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });




  return (

    <>

      {
        adminAlert &&
        <div className="sendAllUserDivMess">
          <div className="sendAdminMesDiv">
            <h1  id="adServerText" style={{ display: "flex", alignItems: "center", fontFamily: "arial black",position:"absolute",top:"9px",textShadow:"0.3px 0.3px 3px rgb(0, 0, 0)"}}>⚡ OnlyPlus Live Update</h1>
            <p id="adServerText" style={{ display: "flex", alignItems: "center", fontFamily: "arial black",position:"absolute",top:"29px",textShadow:"0.3px 0.3px 3px rgb(0, 0, 0)"}}>{date}</p>
            <p id="adServerTextMEs" >{adminAlert}</p>
            <button id="accept" onClick={()=>{setAdminAlert(false)}}>Accept</button>
          </div>
        </div>

      }


      <Routes>
        <Route path="/" element={userData?.role === "admin" ? <Admin /> : <Home />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:id" element={<ShowMovie />} />
        <Route path="/message" element={<AllUsers />} />
        <Route path="/send-message/:id" element={<SendMessage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </>
  )
}

export default App


