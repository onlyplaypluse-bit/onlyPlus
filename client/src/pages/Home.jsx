import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import MainMovie from "./MainMovie"
import Trending from "./Trending"
function Home() {

  return (
    <div className="Home">
        <Header/>
        <MainMovie/>
        <Trending/>


        <Footer/>
    </div>
  )
}

export default Home