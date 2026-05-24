import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { GoDotFill } from "react-icons/go";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { dataContext } from "./ContextAPI";
function Sports() {
    let [store, setStore] = useState([])
    let [storeUp, setStoreUp] = useState([])
    let {serverUrl} = useContext(dataContext)


    useEffect(() => {
        const handleAPI = async () => {
            try {
                let res = await axios.get(`${serverUrl}/get-match`,{withCredentials:true})
                console.log("cricket : ", res.data)
                if (res.data && res.data.data) {
                    let allMatches = res.data.data
                    let liveMatches = allMatches.filter(match => match.matchStarted && !match.matchEnded);
                    let upcomingMatches = allMatches.filter(match => match.matchEnded === true);
                    console.log("upcomingMatches",upcomingMatches)
                    setStoreUp(upcomingMatches)

                    setStore(liveMatches);
                }
            } catch (error) {
                console.log("cricket : ", error)
            }
        }
        handleAPI()
    }, [])


    useGSAP(() => {
        if (document.querySelector(".dot")) {
            gsap.to(".dot", {
                scale: 1.3,
                duration: 0.6,
                yoyo: true,
                repeat: -1,
                stagger: 0.2
            });
        }

    }, [])

    const convertArray = Array.isArray(store) ? store : []
    const convertArrayUpcoming = Array.isArray(storeUp) ? storeUp : []
    return (
        <div className="">
            <Header />
            <h1 style={{ margin: "9px" }} id="trend">Live Matches</h1>
            <div className="coverMainDiv">
                <div className="matchCardDivMain">
                    {
                        convertArray?.map((value, index) => (
                            <div className="matchCardDiv" key={index}>
                                <p id="cricType">{value.name ? value.name.split(',')[0]:"Match"}</p>

                                <div className="matchCard">
                                    <div className="countryName">
                                        <img className="teamImg" src={value.teamInfo?.[0]?.img} alt="" />
                                        <p className="matchNames" style={{ margin: 0}}>{value.teams?.[0] || "Team A"}</p>
                                    </div>
                                    <p id="liveCheck" style={{ color: value.matchStarted && !value.matchEnded ? "red" : "white" }}>{value.matchStarted && !value.matchEnded ? <span style={{ display: "flex", textAlign: "center", justifyContent: "center" }}><GoDotFill className="dot" /> Live</span> : "FINISHED"}</p>
                                    <div className="countryName">
                                        <img className="teamImg" src={value.teamInfo?.[1]?.img} alt="" />
                                        <p   className="matchNames"style={{ margin: 0 }}>{value.teams?.[1] || "Team B"}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <h1 style={{ margin: "9px" }} id="trend">Finished Matches</h1>


            <div className="matchCardDivMainUp">
                {
                    convertArrayUpcoming?.map((value, index) => (
                        <div className="matchCardDivUp" key={index}>
                            <p>{value.name ? value.name.split(",")[0]:"Match"}</p>

                            <div className="matchCard">
                                <div className="countryName">
                                    <img className="teamImg" src={value.teamInfo?.[0]?.img} alt="" />
                                    {/* <p style={{ margin: 0 }}>{value.teams?.[0] || "Team A"}</p> */}
                                </div>
                                <p id="liveCheck" style={{ color: value.matchStarted && !value.matchEnded ? "red" : "green" }}>{value.matchStarted && !value.matchEnded ? <span style={{ display: "flex", textAlign: "center", justifyContent: "center" }}><GoDotFill className="dot" /> Live</span> : "FINISHED"}</p>
                                <div className="countryName">
                                    <img className="teamImg" src={value.teamInfo?.[1]?.img} alt="" />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>


            











            <Footer />

        </div>
    )
}

export default Sports