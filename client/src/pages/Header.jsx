import React, { useEffect, useRef, useState } from "react"
import OnLogo from "../assets/OnLogo.png"
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import { FiSend } from "react-icons/fi";
import { IoArrowUndoSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

function Header() {
    let nav = useNavigate()
    let [search, SetSearch] = useState(false)
    let { userData } = useSelector(state => state.user)
    let [input, SetInput] = useState("")
    let [result, setResult] = useState([])



    useEffect(() => {
        const handleSearch = async () => {
            try {
                let res = await axios.get( `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${input}`)
                console.log(res.data.results)
                let topMovie = res.data.results.slice(0, 5)
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
        <div className="">

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
                                        <img src={`https://image.tmdb.org/t/p/w300${value.poster_path}`} id="SearchImg" />
                                        <p id="searchPara" onClick={() => { nav(`/movie/${value.id}`) }}>{value.title}</p>
                                    </div>
                                ))
                            }
                        </div>

                    </div>



                </div>
            }
            <div className="headDiv"> 
                <img src={OnLogo} id="logoImg" />
                <div className="headOptionMain">
                    <div className="headOption">
                        <p className="headSign" onClick={() => { nav("/") }}>Movies</p>
                        <p className="headSign" onClick={() => { nav("/sports") }}>Sports </p>
                        <p className="headSign" onClick={() => { document.getElementById("anime")?.scrollIntoView({ behavior: "smooth", block: "start" }) }}>Anime Series</p>
                        <p className="headSign" onClick={() => { document.getElementById("up")?.scrollIntoView({ behavior: "smooth", block: "start" }) }}>Upcoming</p>
                        <p className="headSign" onClick={() => { nav(userData ? "/profile" : "/signup") }}>Profile</p>

                    </div>
                    <div className="optionLst">
                        <FaSearch id="searchIconTop" style={{ cursor: "pointer" }} onClick={(prev) => { SetSearch(prev => !prev) }} />

                        {/* <p id="headSign"><FiSend/></p> */}

                        {
                            userData ? <p id="headSign" onClick={() => { nav("/message") }}><FiSend /></p> : <p id="headSign" onClick={() => { nav("/signup") }}>Signup</p>
                        }

                    </div>

                    {/* 6807ad28-e924-4dbd-8517-c66d56b6c9af */}
                    {/* https://api.cricapi.com/v1/currentMatches?apikey=6807ad28-e924-4dbd-8517-c66d56b6c9af&offset=0 */}

                </div>

                <div className="headOptionSize">
                    <p className="headSign" onClick={() => { nav("/") }}>Movies</p>
                    <p className="headSign" onClick={() => { nav("/sports") }}>Sports </p>
                    <p className="headSign" onClick={() => { document.getElementById("anime")?.scrollIntoView({ behavior: "smooth", block: "start" }) }}>Anime Series</p>
                    <p className="headSign" onClick={() => { document.getElementById("up")?.scrollIntoView({ behavior: "smooth", block: "start" }) }}>Upcoming Bollywood</p>
                    <p className="headSign" onClick={() => { document.getElementById("anime")?.scrollIntoView({ behavior: "smooth", block: "start" }) }}>Favorites</p>

                </div>
            </div>
            <div className="SearchDiv">
                <hr id="hrTM" />

            </div>
        </div>
    )
}

export default Header