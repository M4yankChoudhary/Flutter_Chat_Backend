import express from "express";
import connectDB from "./config/database.js";
import bodyParser from "body-parser";
import env from "dotenv";
import RoomsRoutes from './routes/rooms.js';
import MessagesRoutes from './routes/messages.js';
import { createRequire } from "module";
import Messages from './models/messages.js';
import Room from './models/room.js';
import cors from 'cors';
const require = createRequire(import.meta.url);

env.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect db
connectDB();

// parse to json
app.use(bodyParser.json());
app.use(cors())
app.get("/", (req, res) => {
  res.send("Server is up and running...");
});

app.use("/room", RoomsRoutes);
app.use("/messages", MessagesRoutes);



const server = app.listen(PORT, () =>
  console.log(`Node server listening on port http://localhost:${PORT}`)
);

// socket io
const io = require("socket.io")(server);
var connectedUser = new Set();


io.on("connection", async (socket) => {

  console.log("Connection to Socket.IO", socket.id);
  connectedUser.add(socket.id);
 
  io.emit("connected-user", connectedUser.size);

 
  socket.on("disconnect",async (data) => {
    connectedUser.delete(socket.id);
    console.log(socket.id)
    const updatedRoom = await Room.findOneAndUpdate({},{ $pull: {'usersList': socket.id}})
    console.log(updatedRoom._id)
    const roomToDelete = await Room.findById(updatedRoom._id)
    if(roomToDelete.usersList.length == 0) {
      console.log("Empty")
      await Room.findOneAndDelete(updatedRoom._id)
    }
    console.log(roomToDelete)

    console.log("Disconnected from socket");
  });
  socket.on("message", async(data) => {
    console.log(data);
    socket.in(data.roomId).emit("message-recieved", data);
    await Messages.create(data)
  });
  
  socket.on("login", async(data) => {
 
    await socket.join(data.room)
    socket.in(data.room).emit("user-join", data);
    await Room.updateOne({roomId : data.room},{ $push: {'usersList': socket.id}})
    console.log(data);
  });
  console.log(connectedUser);
});
