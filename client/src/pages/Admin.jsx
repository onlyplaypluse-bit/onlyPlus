import React, { useState } from "react";
import OnLogo from "../assets/OnLogo.png"
import { RiMenu3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import dp from "../assets/dp.png"
import { GoPlus } from "react-icons/go";
import { io } from "socket.io-client";
import socket from "./socketConnect";
import { SlLogout } from "react-icons/sl";
import axios from "axios";
import { useContext } from "react";
import { dataContext } from "./ContextAPI";
import { useNavigate } from "react-router";
import { setUserData } from "./redux/userSlice";

function Admin() {
    // const socket = io.connect("http://localhost:8000")

    let { userData, onlineData } = useSelector(state => state.user)
    let [loading, setLoading] = useState(false)
    let [send, setSend] = useState(false)
    let [input, setInput] = useState()

    console.log(onlineData)
    let onlineUser = onlineData ? onlineData.length : 0


    const sendMessage = () => {
        try {
            socket.emit("adminMessage", input)
            console.log(input)
            setInput("")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    let {serverUrl} = useContext(dataContext)
    let dispatch = useDispatch()
    let nav = useNavigate()


    const logout = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.get(`${serverUrl}/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            nav("/")
        } catch (error) {
            console.log(error.data.response.message)

        }
    }




    return (
        <div className="">
            <div className="headDiv">
                <img src={OnLogo} id="logoImg" />
                <p id="headSign" style={{ position: "absolute", right: "9px" }} onClick={logout}><SlLogout /></p>
            </div>
            <div className="SearchDiv">
                <hr id="hrTM" />
            </div>

            <h1 id="adServerText" style={{ display: "flex", alignItems: "center", fontFamily: "arial black" }}> <GoDotFill style={{ color: "green" }} /> {userData ? "Server Online" : "Server Offline"}</h1>
            <div className="SearchDiv">
                <hr id="hrTM" />
            </div>
            <h1 id="adServerText" style={{ display: "flex", alignItems: "center", fontFamily: "arial black" }}> <GoDotFill style={{ color: "green" }} />{onlineUser} Users Online  <GoPlus style={{ position: "absolute", right: "9px", fontSize: "30px", cursor: "pointer" }} onClick={(prev) => { setSend(prev => !prev) }} /></h1>
            {
                send &&
                <div className="sendAllUserDiv">
                    <div className="sendAllUser">
                        <h1 id="adServerText" style={{ display: "flex", alignItems: "center", fontFamily: "arial black" }}>Global Notification</h1>
                        <input type="text" placeholder="Message all users..." id="sendAdmin" onChange={(e) => { setInput(e.target.value) }} value={input} />
                        <button onClick={sendMessage} id="singupBtn" disabled={loading}>{loading ? "Loading..." : "Send"}</button>

                    </div>
                </div>
            }

            {/* <div className="adminAnalysisDiv">
                {
                    onlineData?.map((value, index) => (
                        <div className="adminAnalysis" key={index}>
                            <img src={value.image || dp} id="userDP" />
                            <div className="onAdList">
                                <p id="emailAdminN">{value.userName}</p>
                                <p id="emailAdmin">{value.email}kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</p>
                            </div>
                        </div>
                    ))
                }
            </div> */}

        </div>
    )
}

export default Admin