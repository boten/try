/**
 * Created by nadavv on 9/13/14.
 */

(function(){
    function itemInfoController(scope,msg,state){
        scope.newMsg = {channelName: state.params.name, msg:''};
        //console.log(msg.data[0].msg);
        scope.messageList= msg.data[0].msg;
        scope.channelName = msg.data[0].name;


        scope.time = new Date().getTime();
//        socket.on("connect", function () {
//            console.log('connected to room');
//            //socket.emit("joinRoom", {});
//        });

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
            scope.newMsg.msg ='';
        }

    }

    angular.module('tvchat')
        .controller('itemInfoController',['$scope','msg','$state',itemInfoController]);
}());

