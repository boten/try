var Hapi = require('hapi');
var db = require('diskDb').connect('data', ['channels_list','channels_msg']);
var mongoose = require('mongoose');
var channels = require('./data/data.js');
mongoose.connect('mongodb://localhost/test');

var dbb = mongoose.connection;
dbb.on('error', console.error.bind(console, 'connection error:'));
dbb.once('open', function callback () {
    console.log('connection good');
    var channelSchema = mongoose.Schema({
        name: String,
        msg : []
    });

      Channelmsgs = mongoose.model('channelmsgs', channelSchema);
//  ******************************
//    channelmsg = new Channelmsgs({name:'22',msg: ['welcome']});
//    channelmsg.save(function (err) {
//        if (err) return console.error(err);
//   });
//  *****************************************

//    fluffy = new Kitten({ name: 'fluffy' })
//    console.log(fluffy.name) // 'fluffy'
    //fluffy.speak();

//    fluffy.save(function (err, fluffy) {
//        if (err) return console.error(err);
//        fluffy.speak();
//    });

//    Kitten.find(function (err, kittens) {
//        if (err) return console.error(err);
//        console.log(kittens)
//    });

});





// server configuration object
var serverConfig = {
    cors:true
};

var server = Hapi.createServer('localhost', 3000, serverConfig);

var io = require("socket.io")(server.listener)

// get all items
server.route({
    method: 'GET',
    path: '/api/1/channels-list',
    handler: function (request, reply) {
        reply(db.channels_list.find());
    }
});

// get channels msg by name (name)
server.route({
    method: 'GET',
    path: '/api/1/channels-msg/{name}',
    handler: function (request, reply) {
        console.log(request.params.name);
        Channelmsgs.find({name: request.params.name},function (err, channel){
            if (err) return console.error(err);
            reply(channel);
        });
    }
});

// post a new msg on channel (name)
server.route({
    method: 'POST',
    path: '/api/1/channels-msg/{name}',
    handler: function (request, reply) {
//        Channelmsgs.find({name: request.params.name},function (err, channel){
//            if (err) return console.error(err);
//            reply(channel);
//        });
        reply(request.payload);
    }
});

//// update an item
//server.route({
//    method: 'PUT',
//    path: '/api/1/items/update/{name}',
//    handler: function (request, reply) {
//        //console.log(request.payload.data);
//            console.log(request.params.name);
//       var update = db.e_items.update({label : request.params.name},{label : 'nadav' , description : 'new data'});
//        if (update){
//            reply('update successful');
//        }
//        else{
//            reply('error in update');
//        }
//    }
//});
//
//// delete an item
//// multi = true / false
//server.route({
//    method: 'DELETE',
//    path: '/api/1/items/delete/{name}',
//    handler: function (request, reply) {
//        reply(db.e_items.remove({label: request.params.name},true));
//
//
//    }
//});

// start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});

io.on('connection', function (socket) {

    // when the client emits 'new message', this listens and executes
    socket.on('join', function (data) {
        console.log('got it');
    });

    socket.on('newMsg', function (data) {
        console.log(data.channelName);
        Channelmsgs.update({name: data.channelName},{$push:{msg: data.msg}} ,function(err){
            if(err){
                console.log(err);
            }else{
                socket.broadcast.emit('addNewMsg',data.msg);
                console.log("Successfully added");
            }
        });
        console.log('new msg was added to channel: '+data.channelName);
    });

});