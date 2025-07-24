import express from 'express';
import "dotenv/config";
import http from 'http';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import userRouter from './Routes/user_Routes.js';
import messageRouter from './Routes/message_Routes.js'
import { Server } from 'socket.io';


// crete express app and HTTP server
const app = express();
const server = http.createServer(app)

//Socket.io server
export const io = new Server(server,{
    cors: {origin:"*"}
})
//Store Online users
export const userSocketMap = {};  // {userId: socketId}

io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("User connected", userId);
    if(userId){
        userSocketMap[userId]= socket.id;
    }
    //online users to all connected client
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        console.log("user disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

// middlewares
app.use(express.json({limit:"4mb"}));
app.use(cors());

app.use("/api/status", (req, res)=>res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connection to mongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log("Server is running on PORT:" + PORT));
