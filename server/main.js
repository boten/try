var Hapi = require('hapi');

// server configuration object
var serverConfig = {
    cors:true
};

var server = Hapi.createServer('localhost', 3000, serverConfig);

// simple route example
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, Emale!');
    }
});

// route with param example
server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

// start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});