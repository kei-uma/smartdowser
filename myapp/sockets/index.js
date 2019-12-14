'use strict';

module.exports = function (server) {
    console.log(server);
    const socketIo = require('socket.io')(server, { wsEngine: 'ws' });
    const io = socketIo.listen(server);
    console.log('aa');
    io.sockets.on('connection', function (socket) {
        require('../routes/location');
        require('./location')(socket, io);
    });
};
