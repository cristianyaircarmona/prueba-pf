import app from "./app";
import "./db";
// import http from 'http';
// const server = http.createServer(app);
// import { Server } from "socket.io";
// const io = new Server(server);




app.listen(3000, () => {
  console.log("Server on port 3000");
});


// io.on('connection', (socket) => {
//   console.log('a user connected');
// });