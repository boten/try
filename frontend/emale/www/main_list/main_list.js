/**
 * Created by nadavv on 9/13/14.
 */

(function(){
    function mainListController(scope,channel,state){

        var socket = io.connect("http://localhost:3000");

        //scope.channels = [{channel:'1'},{channel:'2'}];
        //console.log(channel.data);
        scope.channels = channel.data;

        scope.joinroom = function(data){
            console.log(data);
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

