import React, { useEffect, useState } from "react"

import { AiOutlineHome } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router";
import { IoArrowUndoSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

function Footer() {

    let nav = useNavigate()
    let [search, SetSearch] = useState(false)
    let [input, SetInput] = useState("")
    let [result, setResult] = useState([])
    let { userData } = useSelector(state => state.user)



    useEffect(() => {
        const handleSearch = async () => {
            try {
                let res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${input}`)
                console.log(res.data.results)
                let topMovie = res.data.results.slice(0,5)
                setResult(topMovie)
            } catch (error) {
                console.log(error)
            }
        }
        const timer = setTimeout(() => {
            handleSearch()
        }, 300);
        return () => clearTimeout(timer)
    }, [input])

    


    return (
        <div className="footer">




            <div className="footerDiv">

                {
                    search && <div className="SearchDiv">
                        <div className="search">
                            <div className="ss">
                                <IoArrowUndoSharp id="back" onClick={() => { SetSearch(false) }} />
                                <input type="text" placeholder="Search..." id="search" onChange={(e) => { SetInput(e.target.value) }} />
                            </div>

                            <div className="searchResultDiv">
                                {
                                result.map((value, index) => (
                                    <div className="searchResult" key={index}>
                                        <img src={`https://image.tmdb.org/t/p/w300${value.poster_path}`}id="SearchImg" />
                                        <p id="searchPara" onClick={()=>{nav(`/movie/${value.id}`)}}>{value.title}</p>
                                    </div>
                                ))
                            }
                            </div>

                        </div>



                    </div>
                }
                <div className="footerListDiv">
                    <div className="footerList" onClick={() => { nav('/') }}>
                        <AiOutlineHome className="footerIcon" />
                        <p className="footerIconName">Home</p>

                    </div>

                    <div className="footerList" onClick={(prev) => { SetSearch(prev => !prev) }}>
                        <IoIosSearch className="footerIcon" />
                        <p className="footerIconName">Search</p>

                    </div>

                    <div className="footerList" onClick={() => { nav(userData?"/message":"/signup") }}>
                        <FiSend className="footerIcon" />
                        <p className="footerIconName">Chat</p>

                    </div>

                    <div className="footerList" onClick={() => { nav(userData?"/profile":"/signup")  }}>
                        <FiUser className="footerIcon" />
                        <p className="footerIconName">Profile</p>

                    </div>
                </div>
            </div>



        </div>
    )
}

export default Footer