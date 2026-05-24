import React from "react";
import {io} from "socket.io-client"

    const socket = io("https://onlyplus-backend.onrender.com")

export default socket