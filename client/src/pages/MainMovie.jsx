import React, { useEffect, useState } from "react"
import axios from "axios"
import { FaPlay } from "react-icons/fa";
import { AiOutlineCrown } from "react-icons/ai";
import { useNavigate } from "react-router";
function MainMovie() {
    let [store, setStore] = useState([])
    useEffect(() => {
        const handleFirstMovie = async () => {
            try {
                let res = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=f958e5693d873c792d24819b5f5d57cb&with_original_language=hi&region=IN&sort_by=popularity.desc")
                console.log(res.data.results)
                setStore(res.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        handleFirstMovie()
    }, [])
let nav = useNavigate()
    let singleMovie = store[0]


    return (
        <div className="">
            {
                // store[0].map((value,index)=>(
                //     <div className=""key={value}>
                //         <p>{value.title}</p>
                //     </div>
                // ))

                singleMovie ? (
                    <div className="bannerDiv">
                        <img id="banner" src={`https://image.tmdb.org/t/p/w500${singleMovie.poster_path}`} alt={singleMovie.title} />
                        <p>{singleMovie.title}</p>

                        <div className="watchingDiv">
                            <button id="watching"   onClick={()=>{nav(`/movie/${singleMovie.id}`)}} ><span id="spanPlay"><FaPlay/> </span> Start Watching</button>
                            <button id="explore"><span id="spanCrown"><AiOutlineCrown/> </span> Explore Plans</button>

                        </div>
                        <p id="overView">{singleMovie.overview}</p>
                        <hr id="hr"/>
                    </div>
                ) : (

                    <div className="bannerDiv">
                        <p>Loading...</p>
                    </div>
                )
            }
        </div>
    )
}

export default MainMovie