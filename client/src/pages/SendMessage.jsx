import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { io } from "socket.io-client"
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import { dataContext } from "./ContextAPI";
import { setMessageData } from "./redux/userSlice";
import { useRef } from "react";
import { MdVerified } from "react-icons/md";
import dp from "../assets/dp.png"
import { IoMdArrowBack } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import socket from "./socketConnect";
// const socket = io.connect("http://192.168.43.163:8000")
// const socket = io.connect("http://localhost:8000")


function SendMessage() {
    let { id: friend } = useParams()
    let { userData, messageData } = useSelector(state => state.user)
    let [input, setInput] = useState("")
    // let [message, setMessage] = useState([])
    let [roomId, setRoomId] = useState("")
    let typingTimeoutRef = useRef()
    let { onlineData } = useSelector(state => state.user)
    let { serverUrl } = useContext(dataContext)
    let [chatuser, setChatuser] = useState()
    let [del, setDel] = useState(false)
    let [type, setType] = useState(false)




    let dispatch = useDispatch()










    useEffect(() => {
        const handleAPi = async () => {
            try {
                let res = await axios.get(`${serverUrl}/get-user/${friend}`, { withCredentials: true })
                console.log(res.data)
                setChatuser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        handleAPi()
    }, [])



    useEffect(() => {
        if (userData?._id) {
            const uniqueId = [userData._id, friend].sort().join("_")
            setRoomId(uniqueId)
            socket.emit("roomId", uniqueId)
        }

    }, [userData, friend])



    useEffect(() => {
        const handleAPI = async () => {
            if (roomId) {
                try {
                    let res = await axios.get(`${serverUrl}/get-message/${roomId}`, { withCredentials: true })
                    dispatch(setMessageData(res.data))
                    console.log("jjjjjjjjjjjjjjjjjj", res.data)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        handleAPI()

    }, [roomId])






    const handle = async (e) => {
        e.preventDefault()
        try {
            if (socket && input.trim()) {
                const payload = {
                    text: input,
                    room: roomId,
                    senderId: userData?._id
                }
                socket.emit("send_message", payload)
            }
            setInput("")
        } catch (error) {

        }
    }

    const deleteAPI = async () => {
        try {
            let res = await axios.delete(`${serverUrl}/delete/${roomId}`, { withCredentials: true })
            console.log(res)
            dispatch(setMessageData([]))
            setDel(false)
        } catch (error) {
            console.log(error.data);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("Socket se turant aaya hua data:", data);

            let realMessage = Array.isArray(messageData) ? messageData : []
            dispatch(setMessageData([...realMessage, data]))
        })
        return () => socket.off("receive_message")
    }, [messageData, dispatch])







    let checkOnline = onlineData?.includes(friend);

    let scroll = useRef()


    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messageData])


    let nav = useNavigate()



    useEffect(() => {
        let timer
        let payLoad = {
            room: roomId,
            senderId: userData?._id
        }
        if (input.trim() !== "" && roomId) {
            timer = setTimeout(() => {
                socket.emit("typing", payLoad)
            }, 1000);
        }
        return ()=> clearTimeout(timer)
    }, [input])

    useEffect(() => {
        if (!socket) return
        let timer;
        socket.on("user_typing", (data) => {
            if (data.senderId?.toString() === friend?.toString()) {
                setType(true)

                if (timer) clearTimeout(timer)

                timer = setTimeout(() => {
                    setType(false)
                }, 2000);


            }
        })

        return () => {
            socket.off("user_typing")
            if (timer) clearTimeout(timer);
        }
    }, [friend])







    return (
        <div className="" >

            <div className="messageHeadKoFixed" >
                <div className="headDiv">
                    <div className="" style={{ display: "flex", alignContent: "center", justifyContent: "center", gap: "3px" }}>
                        <IoMdArrowBack onClick={() => { nav("/message") }} style={{ fontSize: "25px", marginTop: "6px", marginRight: "8px" }} />
                        <img src={chatuser?.image || dp} id="userDP" />
                        <div className="userType">
                            <h1 id="useruser">{chatuser?.userName || "Loading..."}</h1>
                            <p style={{position:"absolute",top:"30px",marginLeft:"4px"}}>
                                {
                                    type && <p style={{ color: "pink", fontWeight: "bold" }}>Typing...</p>
                                }
                            </p>
                        </div>
                        <h1>{
                            chatuser?.verify === true && <MdVerified style={{ color: "blue", backgroundColor: "white", borderRadius: "50%", width: "16px", height: "16px", position: "absolute", top: "15px" }} />
                        }</h1>
                    </div>
                    <div className="" style={{ display: "flex", alignContent: "center", justifyContent: "center", gap: "10px" }}>
                        <h4 style={{ color: checkOnline ? "green" : "gray", textShadow: checkOnline ? "0.3px 0.3px 0.1px white" : "black", display: "flex", alignItems: "center", justifyContent: "center" }}><GoDotFill />{checkOnline ? "Online" : "Offline"}</h4>
                        <HiDotsVertical onClick={(prev) => { setDel(prev => !prev) }} />
                    </div>

                </div>
                <div className="SearchDiv">
                    <hr id="hrTM" />
                </div>

                {
                    del &&
                    <div className="deleteDiv" onClick={deleteAPI}>
                        <p id="Dchat">Delete chat</p>
                    </div>
                }

            </div>


            {/* ======================== */}







            <div className="messageToDwon" style={{ marginBottom: "50px", marginTop: "60px" }} >
                {
                    messageData?.map((value, index) => {
                        let isMe = userData?._id === value.senderId
                        return (
                            <div className="" key={index} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", width: "100%" }}>
                                <p id="realMessage" style={{ background: isMe ? " linear-gradient(to right, rgb(255, 0, 200), rgb(178, 90, 250))" : "linear-gradient(to right, rgb(145, 108, 137), rgb(121, 103, 136))", paddingInline: "11px", paddingBlock: "5px", margin: "9px", borderRadius: isMe ? "9px 0px 9px 9px" : "0px 9px 9px 9px" }}>{value.text}</p>
                            </div>
                        )
                    })
                }
            </div>






            <div className="" ref={scroll}></div>



            {/* ======================== */}

            <div className="MesHead">

                <form id="sendMess" onSubmit={handle}>
                    <input type="text" name="" placeholder="Message..." id="sendInput" onChange={(e) => { setInput(e.target.value) }} value={input} />
                    <button id="sendbtn"><FiSend /></button>
                </form>
            </div>
        </div>
    )
}

export default SendMessage