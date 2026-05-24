import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import Header from "./Header"
import Footer from "./Footer"

function ShowMovie() {

    const { id } = useParams()
    let [store, setStore] = useState([])

    let [videoKey, setVideoKey] = useState(null)


    useEffect(() => {
        const handleAPI = async () => {
            try {
                let res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f958e5693d873c792d24819b5f5d57cb&language=en-US`)

                let videoRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=f958e5693d873c792d24819b5f5d57cb`)


                const trailer = videoRes.data.results.find(
                    (video) => video.type === "Trailer" && video.site === "YouTube"
                )

                if (trailer) {
                    setVideoKey(trailer.key) // Sahi trailer mil gaya
                } else {
                    // Agar official trailer nahi mila, toh jo bhi pehli video ho uski key le lo
                    setVideoKey(videoRes.data.results[0]?.key || null)
                }




                console.log(res.data)
                setStore(res.data)
            } catch (error) {

            }

        }
        handleAPI()
    }, [])

    return (
        <div style={{ color: "#fff", backgroundColor: "#121212", minHeight: "100vh", padding: "15px" }}>
            
            <Link to="/" style={{ color: "#a855f7", textDecoration: "none", fontWeight: "bold", display: "block", marginBottom: "15px" }}>
                ← Back to Home
            </Link>

            {/* 🎬 VIDEO PLAYER SECTION */}
            {videoKey ? (
                <div style={{ width: "100%", height: "240px", borderRadius: "12px", overflow: "hidden", backgroundColor: "#000", marginBottom: "20px" }}>
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&modestbranding=1&rel=0`}
                        title="Movie Trailer"
                        frameBorder="0"
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <div style={{ width: "100%", height: "240px", backgroundColor: "#333", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", marginBottom: "20px" }}>
                    <p>Loading...</p>
                </div>
            )}

            {/* 📝 DETAILS SECTION */}
            {store && (
                <div>
                    <h1 style={{ fontSize: "24px", margin: "0 0 10px 0" }}>{store.title}</h1>
                    <p style={{ color: "#aaa", fontSize: "14px", lineHeight: "1.6" }}>{store.overview}</p>
                </div>
            )}


            <Footer/>
        </div>
    )
}

export default ShowMovie