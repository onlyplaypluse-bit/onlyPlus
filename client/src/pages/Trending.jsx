import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { MdArrowForwardIos } from "react-icons/md";
import chat from "../assets/chat.png"
import web from "../assets/web.jpeg"
import webb from "../assets/webb.jpeg"
import OnLogo from "../assets/OnLogo.png"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
gsap.registerPlugin(ScrollTrigger)


function Trending() {

    let [store, setStore] = useState([])
    let [bollywood, setBollywood] = useState([])
    let [anime, setAnime] = useState([])
    let [uB, setUB] = useState([])




    useEffect(() => {
        const handleMovie = async () => {
            try {
                let res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
                console.log("trending", res.data.results)
                setStore(res.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        handleMovie()
    }, [])

    useEffect(() => {
        const handleMovie = async () => {
            try {
                let res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=hi&region=IN&sort_by=popularity.desc`)
                console.log("trending", res.data.results)
                setBollywood(res.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        handleMovie()
    }, [])





    useEffect(() => {
        const handleMovie = async () => {
            try {
                let res = await axios.get( `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&with_origin_country=JP&sort_by=popularity.desc`)
                console.log("trending", res.data.results)
                setAnime(res.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        handleMovie()
    }, [])



    useEffect(() => {
        const handleMovie = async () => {
            try {
                let res = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&with_original_language=hi&region=IN`)
                console.log("trending", res.data.results)
                setUB(res.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        handleMovie()
    }, [])

    // const convertArray = Array.isArray(store)?store:[]

    let nav = useNavigate()

    useGSAP(() => {
        gsap.fromTo(".web", {
            opacity: 0,
            y: 60,
        }, {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: ".web",
                start: "top bottom",
                end: "top center",
                scrub: 1,
            }
        })
    }, [])

    useGSAP(() => {
        gsap.fromTo(".webb", {
            opacity: 0,
            y: 60,
        }, {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: ".web",
                start: "top bottom",
                end: "top center",
                scrub: 1,
            }
        })
    }, [])


    useGSAP(() => {
        gsap.fromTo("#letChat", {
            opacity: 0,
            y:-30,
        }, {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: ".web",
                start: "top bottom",
                end: "top center",
                scrub: 1,  
            }
        })
    }, [])






    return (
        <div className="tt">
            <h1 id="trend" style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}> TRENDING NOW (POPULAR)<span style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", marginLeft: "20px", cursor: "pointer" }}>See more </span> <span id="seeMore"> <MdArrowForwardIos /></span></h1>

            <div className="trendingDiv">
                {
                    store.map((value, index) => (
                        <div className="" id="ho" key={index} >
                            <img id="trendImg" onClick={() => { nav(`/movie/${value.id}`) }} src={`https://image.tmdb.org/t/p/w300${value.poster_path}`} alt={value.title} />
                            <p id="trendTitle">{value.title}</p>
                        </div>
                    ))
                }
            </div>

            <h1 id="trend" style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>BOLLYWOOD HITS <span style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", marginLeft: "20px", cursor: "pointer" }}>See more </span> <span id="seeMore"> <MdArrowForwardIos /></span></h1>

            <div className="trendingDiv">
                {
                    bollywood.map((value, index) => (
                        <div className="" id="bol" key={index}>
                            <img id="trendImg" onClick={() => { nav(`/movie/${value.id}`) }} src={`https://image.tmdb.org/t/p/w300${value.poster_path}`} alt={value.title} />
                            <p id="trendTitle">{value.title}</p>
                        </div>
                    ))
                }
            </div>


            <h1 id="trend" style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>ANIME SERIES <span style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", marginLeft: "20px", cursor: "pointer" }}>See more </span> <span id="seeMore"> <MdArrowForwardIos /></span></h1>

            <div className="trendingDiv">
                {
                    anime.map((value, index) => (
                        <div className="" id="anime" key={index}>
                            <img id="trendImg" onClick={() => { nav(`/movie/${value.id}`) }} src={`https://image.tmdb.org/t/p/w300${value.poster_path}`} alt={value.title} />
                            <p id="trendTitle">{value.name}</p>
                        </div>
                    ))
                }
            </div>


            <h1 id="trend" style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>UPCOMING BOLLYWOOD <span style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", marginLeft: "20px", cursor: "pointer" }}>See more </span> <span id="seeMore"> <MdArrowForwardIos /></span> </h1>

            <div className="trendingDiv">
                {
                    uB.map((value, index) => (
                        <div className="" id="up" key={index}>
                            <img id="trendImg" onClick={() => { nav(`/movie/${value.id}`) }} src={`https://image.tmdb.org/t/p/w300${value.poster_path}`} alt={value.title} />
                            <p id="trendTitle">{value.title}</p>
                        </div>
                    ))
                }
            </div>
            <div className="SearchDiv">
                <hr id="hrT" style={{ marginBottom: "9px" }} />
            </div>
            <div className="SearchDiv" style={{ marginBottom: "30px" }}>
                <img src={chat} id="letChat" onClick={() => { nav("/message") }} />
            </div>

            <div className="SearchDiv" onClick={() => { nav("/message") }} style={{ marginBottom: "30px", gap: "0px" }}>
                <img src={web} className="web" />
                <img src={webb} className="webb" />

            </div>

            <div className="SearchDiv">
                <hr id="hrT" style={{ marginBottom: "9px" }} />
            </div>

            <div className="SearchDivWeb">


                <div className="">
                    <img src={OnLogo} id="FootLogo" />
                </div>

                <div className="lastDiv">
                    <div className="">
                        <h1 className="FootTM">Explore</h1>
                        <h3 className="FootTMS">Trending</h3>
                        <h3 className="FootTMS">Top Rated</h3>
                        <h3 className="FootTMS">New Releases</h3>
                        <h3 className="FootTMS">Genres</h3>
                    </div>

                    <div className="">

                        <h1 className="FootTM">Support</h1>
                        <h3 className="FootTMS">FAQ</h3>
                        <h3 className="FootTMS">TMDB Attribution Policy</h3>
                        <h3 className="FootTMS">Terms of Service</h3>
                        <h3 className="FootTMS">Contact</h3>

                    </div>

                    <div className="lastMar">

                        <h1 className="FootTM">Community</h1>
                        <h3 className="FootTMS">Global Chat Room</h3>
                        <h3 className="FootTMS">Community Guidelines</h3>
                        <h3 className="FootTMS">Feedback</h3>

                    </div>

                </div>

            </div>

            <div className="SearchDiv">
                <hr id="hrT" style={{ marginBottom: "9px" }} />
            </div>
            <p id="lastP" style={{ textAlign: "center", marginBottom: "70px" }}>This product uses the{" "} <a href="https://www.themoviedb.org?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer"> TMDB </a>{" "} API but is not endorsed or certified by TMDB.</p>



        </div>
    )
}

export default Trending