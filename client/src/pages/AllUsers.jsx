import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import OnLogo from "../assets/OnLogo.png"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FiSend } from "react-icons/fi";
import dp from "../assets/dp.png"
import axios from "axios";
import { dataContext } from "./ContextAPI";
import { GoDotFill } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)



function AllUsers() {
    let nav = useNavigate()
    let { userData, otherUser, onlineData } = useSelector(state => state.user)
    let [storeId, setStoreId] = useState()
    let { serverUrl } = useContext(dataContext)
    let [userName, setUserName] = useState()
    let [store, setStore] = useState()
    let [err, setErr] = useState()



    useEffect(() => {
        const handleAPI = async () => {
            try {
                let res = await axios.get(`${serverUrl}/search-user?userName=${userName}`)
                console.log("User data found:", res.data);
                setStore(res.data)
            } catch (error) {
                console.log("API Error:", error.response?.data || error.message);
                setErr(error.response?.data || error.message)
            }
        }
        const timer = setTimeout(() => {
            handleAPI()
        }, 400);
        return () => clearTimeout(timer)
    }, [userName])


    const userOnline = (userId) => {
        if (!onlineData || !userId) return "gray";

        if (Array.isArray(onlineData)) {
            return onlineData.includes(userId) ? "green" : "gray";
        }
        return "gray";
    }


    useGSAP(() => {
       if (document.querySelector(".dot")) {
        gsap.to(".dot", {
            scale: 1.3,
            duration: 0.6,
            yoyo: true,    // स्मूथ पल्स इफेक्ट के लिए
            repeat: -1,
            stagger: 0.2
        }); 
    }

    }, [onlineData])





    return (
        <div className="">
            <div className="messageHeadKoFixed">
                <div className="headDiv">
                    <img src={OnLogo} id="logoImg" />


                </div>
                <div className="SearchDiv">
                    <hr id="hrTM" />
                </div>

            </div>

            {/* =========================== */}

            <div className="userAndMessage">
                <div className={storeId ? "phone" : ""}>



                    <h1 id="dmTitle">Suggested for you</h1>
                    <div className="searchRealUsearDiv">
                        <input id="searchRealUsear" type="text" placeholder="Search..." onChange={(e) => { setUserName(e.target.value) }} />
                    </div>

                    {/* {
                        err && <p>{err.message}</p>
                    } */}

                    {
                        store ? <div className="">
                            {
                                store.map((value, index) => {
                                    let IsOnline = userOnline(value._id)

                                    return (

                                        <div style={{ position: "relative" }} className="otheruser" key={index} onClick={() => { nav(`/send-message/${value._id}`) }}>
                                            {
                                                store ? <>
                                                    <img src={value?.image || dp} id="userDP" />
                                                    <h1 id="useruser" >{value.userName}<span style={{ color: "green", position: "absolute", top: "-9px", right: "-9px", fontSize: "30px" }}>{IsOnline === "green" ? <GoDotFill  className="dot" /> : ""}</span></h1>
                                                    {
                                                        value?.verify === true && <MdVerified style={{ color: "blue", backgroundColor: "white", borderRadius: "50%" }} />

                                                    }

                                                </> :
                                                    <p>user not found</p>
                                            }

                                        </div>
                                    )
                                })
                            }
                        </div>
                            :
                            <div className="">
                                {
                                    ([...(otherUser || [])])?.reverse().map((value, index) => {

                                        let IsOnline = userOnline(value._id)

                                        return (
                                            <div style={{ position: "relative" }} className="otheruser" key={index} onClick={() => { nav(`/send-message/${value._id}`) }}>
                                                <img src={value.image || dp} id="userDP" />
                                                <h1 id="useruser" >{value.userName}<span style={{ color: "green", position: "absolute", top: "-9px", right: "-9px", fontSize: "30px" }}>{IsOnline === "green" ? <GoDotFill  className="dot"/> : ""}</span></h1>
                                                {
                                                    value?.verify === true && <MdVerified style={{ color: "blue", backgroundColor: "white", borderRadius: "50%" }} />

                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>

                    }




                    <div className="" style={{ height: "9vh" }}></div>
                </div>
                <hr id="as" />



            </div>



            <Footer />



        </div>
    )
}

export default AllUsers