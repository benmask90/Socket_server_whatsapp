import { Server } from 'socket.io';

const io = new Server(process.env.PORT || 9000, {
    cors: {
        origin: 'https://monumental-kangaroo-23b531.netlify.app',
    }, 
})

let users = []

const addUser = (userData, socketid)=>{
    !users.some(user => user.sub == userData.sub) && users.push({...userData,socketid})
}

const getUser = (userId)=>{
    return users.find(user=>user.sub === userId)
}

io.on("connection",(socket)=>{
    console.log("user connected");

    socket.on("addUsers", userData=>{
            addUser(userData, socket.id)
            io.emit("getUsers",users)
    })

    socket.on("sendMessage",(data)=>{
        const user = getUser(data.reciverId)
        // console.log( "user found",user);
        io.emit("getmessage",data)
        // console.log(data);

    })
})
