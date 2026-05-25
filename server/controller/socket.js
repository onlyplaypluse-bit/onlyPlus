import MessageModel from "../models/message.js"

let onlineUsers = {}

export const connectionIO = (io) => {

    io.on("connection", (socket) => {
        // console.log("user connected :", socket.id)

        socket.on("checkOnline", (userId) => {
            // console.log("userOnline", userId)
            onlineUsers[userId] = socket.id

            io.emit("onlineUser", Object.keys(onlineUsers)) 
        })

        socket.on("roomId", (roomId) => {
            // console.log("roomId", roomId)
            socket.join(roomId)
        })


        socket.on("send_message", async (data) => {
            // console.log(data)

            const newMessage = new MessageModel({
                room: data.room,
                senderId: data.senderId,
                text: data.text,
            })

            const saveMessage = await newMessage.save()


            io.to(data.room).emit("receive_message", saveMessage)
        })

        socket.on("typing",(data)=>{
            // console.log(" user typing...",data)

            socket.to(data.room).emit("user_typing",data)
        })


        socket.on("adminMessage", (data) => {
            // console.log("admin message : ", data)
            socket.broadcast.emit("sendMessageAdmin", data)
        })

        socket.on("disconnect", () => {
            // console.log("disconnect user : ", socket.id)
            for (let userId in onlineUsers) {
                if (onlineUsers[userId] === socket.id) {
                    delete onlineUsers[userId]
                    break
                }
            }
            io.emit("onlineUser", Object.keys(onlineUsers))
        })



    })

}







// import MessageModel from "../models/message.js"

// let onlineUsers = {}

// export const connectionIO = (io) => {

//     io.on("connection", (socket) => {
//         console.log("user connected :", socket.id)

//         socket.on("checkOnline", (data) => {
//             console.log("userOnline", data)

//             if (data && data.userId) {
//                 onlineUsers[data.userId] = {
//                     socketId: socket.id,
//                     userName: data.userName,
//                     email: data.email,
//                     image:data.image
//                 }

//             }

//             io.emit("onlineUser", Object.keys(onlineUsers).map(id => ({
//                 id: id,
//                 userName: onlineUsers[id].userName,
//                 email: onlineUsers[id].email,
//                 image:onlineUsers[id].image
//             })))
//         })

//         socket.on("roomId", (roomId) => {
//             console.log("roomId", roomId)
//             socket.join(roomId)
//         })


//         socket.on("send_message", async (data) => {
//             console.log(data)

//             const newMessage = new MessageModel({
//                 room: data.room,
//                 senderId: data.senderId,
//                 text: data.text,
//             })

//             const saveMessage = await newMessage.save()


//             io.to(data.room).emit("receive_message", saveMessage)
//         })

//         socket.on("adminMessage",(data)=>{
//             console.log("admin message : ", data)

//             io.emit("sendAllUsers",data)
//         })

//         socket.on("disconnect", () => {
//             console.log("disconnect user : ", socket.id)
//             for (let userId in onlineUsers) {
//                 if (onlineUsers[userId] === socket.id) {
//                     delete onlineUsers[userId]
//                     break
//                 }
//             }
//             io.emit("onlineUser", Object.keys(onlineUsers).map(id => ({
//                 id: id,
//                 userName: onlineUsers[id].userName,
//                 email: onlineUsers[id].email,
//                 image:onlineUsers[id].image

//             })))
//         })



//     })

// }