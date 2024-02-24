const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const userRouter = require("./routes/userRoute");
const taskRouter = require("./routes/taskRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
var cors = require('cors');
const colors = require("colors");


console.clear();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());




app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.get('/', (req, res) => {
    res.send("Server is broadcasting APIs");
});


app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000", // (for local machine, also change is SingleTask.js)
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);


        socket.on("new task", (newTaskReceived) => {
            // console.log(newMessageRecieved);
            var task = newTaskReceived.task;

            if (!chat.sender) return console.log("chat.sender not defined");

            socket.in(chat.sender._id).emit("task recieved", newTaskReceived);

        });

        socket.off("setup", () => {
            console.log("USER DISCONNECTED");
            socket.leave(userData._id);
        });
    });
});
