// Chat engine is the file that is going to communicate with client side which is from browser and /config/chat_sockets.js is the one which is going to be observer or the server which is going to recieve the incoming connection from all the user which are subscriber

// This class is sending the request of connection
class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;

        // Initiate the connect
        this.socket=io.connect('http://localhost:5000');        // io is the global variable which is given to us via socket.io cdnjs file 

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self=this;

        this.socket.on('connect',function(){
            console.log('connection established using sockets....');

            // join_room is the name of the event
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'iconnect'
            });

            self.socket.on('user_joined',function(data){
                console.log("a user joined",data);
            })
        });


        // send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val();

            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'iconnect'
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log("message received",data.message);

            let newMessage=$('<li>');

            let messageType='other-message';

            if(data.user_email==self.userEmail){
                messageType='self-message';
            }
            
            newMessage.append($('<span>',{
                'html':data.message
            }));

            newMessage.append($('<sub>',{
                'html':data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}