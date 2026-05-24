import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import OnLogo from "../assets/OnLogo.png"
import { dataContext } from "./ContextAPI";
import { useDispatch } from "react-redux";
import axios from "axios";
import Footer from "./Footer";
import { setUserData } from "./redux/userSlice";

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false)
    let [err, setErr] = useState()
    let nav = useNavigate()


    let { serverUrl } = useContext(dataContext)
    let dispatch = useDispatch()


    const handleAPI = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let res = await axios.post(`${serverUrl}/login`, {
                userName,
                password
            }, { withCredentials: true })
            console.log(res)
            dispatch(setUserData(res.data))
            nav("/")
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setErr(error.response.data.message )
            console.log(error.response.data.message)

        }
    }
    return (
        <div className="">
            <div className="singupDiv">
                <div className="signupBox">
                    <img src={OnLogo} id="signupLogo" />

                    <form id="signupForm" onSubmit={handleAPI}>
                        <h1 id="signH">Login</h1>
                        <input type="text" placeholder="UserName" className="singupInput"   onChange={(e) => { setUserName(e.target.value) }}/>
                        <input type="text" placeholder="Password" className="singupInput"  onChange={(e) => { setPassword(e.target.value) }}/>
                        {
                            err && <p id="error">{err}</p>
                        }
                        <button id="singupBtn" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
                        <p id="navSign" onClick={() => { nav("/signup") }}>Create New Account ? <span id="navSignSapn">Signup</span></p>

                    </form>

                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default Login