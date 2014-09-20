/**
 * Created by nadavv on 9/13/14.
 */

(function(){
    function itemInfoController(scope,msg,state){
        scope.newMsg = {channelName: state.params.name, msg:'write here'};
        console.log(msg.data[0].msg);
        scope.messageList= msg.data[0].msg;
        scope.channelName = msg.data[0].name;

        var socket = io.connect("http://localhost:3000")

        socket.on("connect", function () {
            console.log('client connected');
            socket.emit("join", 'hello');
        });

        socket.on("addNewMsg", function (msg) {
            console.log('got new msg from host');
            scope.$apply(function() {
                //wrapped this within $apply
                scope.messageList.push(msg);
            });

        });

        scope.addMsg = function(){
            scope.messageList.push(scope.newMsg.msg);
            socket.emit("newMsg",scope.newMsg);
        }

    };

    angular.module('tvchat')
        .controller('itemInfoController',['$scope','msg','$state',itemInfoController]);
}());
