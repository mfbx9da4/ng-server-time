module.exports.init = function(socket){
    socket.on('server time',function(client_now){
        socket.emit('server time', {sender_transmission_time: client_now,
                                 server_transmission_time: Date.now()});
    });
}
