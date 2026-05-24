import React, { useContext, useRef, useState } from "react";
import OnLogo from "../assets/OnLogo.png"
import { useNavigate } from "react-router";
import { dataContext } from "./ContextAPI";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/userSlice";

import dp from "../assets/dp.png"
import Footer from "./Footer";

function Profile() {
    let nav = useNavigate()
    let { userData } = useSelector(state => state.user)
    const [userName, setUserName] = useState(userData?.userName);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false)
    let [err, setErr] = useState()
    let [frontend, setFrontend] = useState(userData?.image||dp)
    let [backend, setBackend] = useState()




    let { serverUrl } = useContext(dataContext)
    let dispatch = useDispatch()

    let file = useRef()

    const handleImage = (e) => {
        let file = e.target.files[0]
        setBackend(file)
        let image = URL.createObjectURL(file)
        setFrontend(image)
    }

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
// ----------------------------------------------------------

    const profileUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let formData = new FormData()
            formData.append("userName", userName)

            if (backend) {
                formData.append("image", backend)
            }

            let res = await axios.post(`${serverUrl}/profile-update`, formData, {
                withCredentials: true,
                headers: {
                }
            })
            console.log(res)
            dispatch(setUserData(res.data))
            nav("/")
            setLoading(false)


        } catch (error) {
            console.log(error.response?.data?.message)
            setErr(error.response?.data?.message)
            setLoading(false)

        }
    }





    return (
        <div className="">
            <div className="singupDiv">
                <div className="signupBox">
                    <img src={OnLogo} id="signupLogo" />
                    <input type="file" ref={file} style={{ display: "none" }} onChange={handleImage} name="" id="" />

                    <form id="signupForm" onSubmit={profileUpdate}>
                        <div className="profileDP" onClick={() => { file.current.click() }}>
                            <img src={frontend} id="frontDp" />
                        </div>
                        <h1 id="prName">Wellcome, {userData?.userName || "Loading..."}</h1>
                        <input type="text" placeholder={userData?.userName || "Username"} className="singupInput" onChange={(e) => { setUserName(e.target.value) }} />
                        <input type="text" placeholder="Email" className="singupInput" value={userData?.email || "Email"} readOnly />
                        {
                            err && <p id="error">{err}</p>
                        }
                        <button id="singupBtn" disabled={loading}>{loading ? "Saving..." : "Save"}</button>

                    </form>
                    <p onClick={logout} style={{ position: "absolute", bottom: "8px", left: "8px", color: "red" }}>Logout</p>

                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Profile