var Hapi = require('hapi');
//var db = require('diskDb').connect('data', ['channels_list','channels_msg']);
var mongoose = require('mongoose');
//var channels = require('./data/data.js');
mongoose.connect('mongodb://tv-chat:boten1900@ds041150.mongolab.com:41150/channels');


var dbb = mongoose.connection;
dbb.on('error', console.error.bind(console, 'connection error:'));
    var channelSchema = mongoose.Schema({
        name: String,
        counter: Number,
        msg : []
    });
    var channelListSchema = mongoose.Schema({
        name : String,
        listening : Boolean
    });

      Channelmsgs = mongoose.model('channelmsgs', channelSchema);
      ChannelList = mongoose.model('channellist', channelListSchema);

//  ******************************
    var firstRun = function() {
        channelmsg = new Channelmsgs({name: '22', msg: ['welcome to 22'], counter:0});
        channelmsg.save(function (err) {
            if (err) return console.error(err);
        });

        channelmsg = new Channelmsgs({name: '10', msg: ['welcome to 10'],counter:0});
        channelmsg.save(function (err) {
            if (err) return console.error(err);
        });

        channelList = new ChannelList({name: '10' ,listening: false});
        channelList.save(function (err) {
            if (err) return console.error(err);
        });
        channelList = new ChannelList({name: '22' ,listening: false});
        channelList.save(function (err) {
            if (err) return console.error(err);
        });
    }
//  *****************************************

    //firstRun();



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







// server configuration object
var serverConfig = {
    cors : true
};

var server = Hapi.createServer(+process.env.PORT || 5000, '0.0.0.0', { cors: {origin:['*']} });

var io = require("socket.io")(server.listener);


//io.set('origins', '*:*');

// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku



//io.configure(function () {
//    io.set("transports", ["xhr-polling"]);
//    io.set("polling duration", 10);
//});

var lobby = 'lobby';
var channel_10 = 'channel_10';
var channel_10_listen = 'channel_10_listen';
var channel_22 = 'channel_22';
var channel_22_listen = 'channel_22_listen';
var counter_limit = 2;

// get all items
server.route({
    method: 'GET',
    path: '/api/1/channels-list',
    handler: function (request, reply) {
        ChannelList.find({},function (err, channel){
            if (err) return console.error(err);
            //console.log(channel)
            reply(channel);
        });
    }
});

// get channels msg by name (name)
server.route({
    method: 'GET',
    path: '/api/1/channels-msg/{name}',
    handler: function (request, reply) {
        //console.log(request.params.name);
        Channelmsgs.find({name: request.params.name},function (err, channel){
            if (err) return console.error(err);
            reply(channel);
        });
    }
});

//// post a new msg on channel (name)
//server.route({
//    method: 'POST',
//    path: '/api/1/channels-msg/{name}',
//    handler: function (request, reply) {
////        Channelmsgs.find({name: request.params.name},function (err, channel){
////            if (err) return console.error(err);
////            reply(channel);
////        });
//        reply(request.payload);
//    }
//});

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
    socket.on('joinLobby', function (data) {
        //console.log(data);
        if(data.oldRoom){
            console.log('left: '+'channel_'+data.oldRoom)
            socket.leave('channel_'+data.oldRoom);
        }
        socket.join(lobby);
        console.log('joined lobby');
    });

    socket.on('joinRoom', function (data) {
        socket.leave('channel_'+data.oldRoom);
        socket.join('channel_'+data.newRoom);
        console.log('left: '+'channel_'+data.oldRoom);
        console.log('joined: '+'channel_'+data.newRoom);
    });

    socket.on('listenChannel', function (data) {
        socket.join('channel_'+data.name+'_listen');
        console.log('listen to channel: '+data.name);
    });

    socket.on('dontListenChannel', function (data) {
        //console.log(data);
        socket.leave('channel_'+data.name+'_listen');
        console.log('remove listen to channel: '+data.name);
    });

    socket.on('addToCounter', function (data) {
        Channelmsgs.update({name: data.channelName},{$inc:{counter:1}} ,function(err){
            if(err){
                console.log(err);
            }else{
                //socket.broadcast.emit('addNewMsg',data.msg);
                //socket.broadcast.to('channel_'+data.channelName).emit('addNewMsg',data.msg);
                Channelmsgs.findOne({name: data.channelName},function(err,channel){
                    if(err){
                        console.log(err);
                    }else{
                        if(channel.counter >= counter_limit){
                            console.log('reset counter');
                            //console.log(Channelmsgs);
                            Channelmsgs.update({name: data.channelName},{$set: {counter:0}},function(err,da){
                                if (err){
                                    console.log(err)
                                }else{
                                    //update worked
                                    // send msg-> "commercial is over"
                                    // to all reg users
                                    socket.broadcast.to('channel_'+data.channelName+'_listen').emit('breakIsOver',data.channelName);
                                }
                            });
                        }else{
                            console.log('current counter: '+channel.counter);
                        }



                    }

                });

            }
        });
    });

//    socket.on('newMsg', function (data) {
//        //console.log(data.channelName);
//        Channelmsgs.update({name: data.channelName},{$push:{msg: data.msg}} ,function(err){
//            if(err){
//                console.log(err);
//            }else{
//                //socket.broadcast.emit('addNewMsg',data.msg);
//                socket.broadcast.to('channel_'+data.channelName).emit('addNewMsg',data.msg);
//                console.log('channel_'+data.channelName);
//                console.log("Successfully added");
//            }
//        });
//        console.log('new msg was added to channel: '+data.channelName);
//    });

    socket.on('newMsg', function (data) {
        console.log(data)
        socket.broadcast.to('channel_'+data.channelName).emit('addNewMsg',data);
        console.log('channel_'+data.channelName);
        console.log('new msg was added to channel: '+data.channelName);
    });



});