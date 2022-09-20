// This is the one which is going to be observer or the server which is going to recieve the incoming connection from all the user which are subscriber

// Receiving the request of connection
module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log("new connection received",socket.id);

        socket.on('disconnect',function(){
            console.log("Socket disconnected");
        })

        socket.on('join_room',function(data){
            console.log("Joining request received",data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        });

        // detect send_message and brodcast to everyone in the room 
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        });
    });
}