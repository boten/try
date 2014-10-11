/**
 * Created by nadavv on 9/13/14.
 */

(function(){
    function mainListController(scope,channel,state){

        var socket = io.connect('http://quiet-ridge-6377.herokuapp.com');

        //scope.channels = [{channel:'1'},{channel:'2'}];
        //console.log(channel.data);
        scope.channels = channel.data;

        scope.listenStatus = {status : false};

        scope.listenToChannel = function(channel){
            channel.listening = true;
            socket.emit('listenChannel',channel);

        };

        scope.dontListenToChannel = function(channel){
            channel.listening = false;
            socket.emit('dontListenChannel',channel);
        };



        scope.joinroom = function(data){
            state.go('info', {name: data.newRoom});
            socket.emit('joinRoom',data);
        }

        socket.on("connect", function () {
            console.log('connected to lobby');
            socket.emit("joinLobby",{});
        });

    }

    angular.module('tvchat')
        .controller('mainListController',['$scope','channel','$state',mainListController]);
}());

