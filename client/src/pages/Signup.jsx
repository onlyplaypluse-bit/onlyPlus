import React, { useContext, useState } from "react";
import OnLogo from "../assets/OnLogo.png"
import { useNavigate } from "react-router";
import { dataContext } from "./ContextAPI";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";
import Footer from "./Footer";

function Signup() {
    let nav = useNavigate()
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false)
    let [err, setErr] = useState()


    let { serverUrl } = useContext(dataContext)
    let dispatch = useDispatch()


    const handleAPI = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let res = await axios.post(`${serverUrl}/signup`, {
                userName,
                email,
                password
            }, { withCredentials: true })
            console.log(res)
            dispatch(setUserData(res.data))
            setLoading(false)
            nav("/")
        } catch (error) {
            setLoading(false)
            setErr(error.response.data.message)
            console.log(error.response.data.message)
 
        }
    }
    return (
        <div className="">
            <div className="singupDiv">
                <div className="signupBox">
                    <img src={OnLogo} id="signupLogo" />

                    <form id="signupForm" onSubmit={handleAPI}>
                        <h1 id="signH">Signup</h1>
                        <input type="text" placeholder="UserName" className="singupInput" onChange={(e) => { setUserName(e.target.value) }} />
                        <input type="text" placeholder="Email" className="singupInput" onChange={(e) => { setEmail(e.target.value) }} />
                        <input type="text" placeholder="Password" className="singupInput" onChange={(e) => { setPassword(e.target.value) }} />
                        {
                            err && <p id="error">{err}</p>
                        }
                        <button id="singupBtn" disabled={loading}>{loading ? "Loading..." : "Signup"}</button>
                        <p id="navSign" onClick={() => { nav("/login") }}>Already have an account? <span id="navSignSapn">Login</span></p>

                    </form>

                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default Signup