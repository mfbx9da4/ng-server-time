
module.exports = function(socket){
    socket.on('date now',function(client_now){
        socket.emit('date now', {sender_transmission_time: client_now,
                                 server_transmission_time: Date.now()});
    });
}
