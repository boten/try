/**
 * Created by nadavv on 9/13/14.
 */

(function(){
    function mainListController(scope,channel,state,dataService){

      // 'channel' is coming from the resolve ui-router
        scope.channels = channel.data;

        //scope.listenStatus = {status : false};


        scope.listening = function(channel){
            return dataService.getChannelListeningStatus(channel);
        }

        scope.listenToChannel = function(channel){
            //channel.listening = true;
          //todo : why this fun calles 2 times ? when pressing the listen btn?
          alert('reg')
            dataService.addListenChannel(channel)
            socket.emit('listenChannel',channel);

        };

        scope.dontListenToChannel = function(channel){
            //channel.listening = false;
            dataService.removeListenChannel(channel)
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
        .controller('mainListController',['$scope','channel','$state','dataService',mainListController]);
}());

