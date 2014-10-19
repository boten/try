/**
 * Created by nadavv on 9/13/14.
 */

(function(){
    function itemInfoController(scope,msg,state,$timeout,$ionicScrollDelegate){
        var alternate,
            isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

        scope.newMsg = {channelName: state.params.name, msg:''};
        //console.log(msg.data[0].msg);
        scope.messageList= [];
        scope.channelName = state.params.name;
        scope.myId = '12345';

        scope.time = new Date().getTime();

        socket.on("addNewMsg", function (msg) {
            console.log('got new msg from host');
            scope.$apply(function() {
                //wrapped this within $apply
                scope.messageList.push(msg);
            });

        });

        scope.addMsg = function(){
            alternate = !alternate;
            scope.messageList.push(
                {
                    msg: scope.newMsg.msg,
                    userId: alternate ? '12345' : '54321'
                });
            socket.emit("newMsg",scope.newMsg);
            scope.newMsg.msg ='';
            $ionicScrollDelegate.scrollBottom(true);
        }


//        scope.sendMessage = function() {
//            alternate = !alternate;
//            scope.messages.push({
//                userId: alternate ? '12345' : '54321',
//                msg: scope.data.message
//            });
//            delete scope.data.message;
//            $ionicScrollDelegate.scrollBottom(true);
//        }

        scope.inputUp = function() {
            if (isIOS) scope.data.keyboardHeight = 216;
            $timeout(function() {
                $ionicScrollDelegate.scrollBottom(true);
            }, 300);

        }
        scope.inputDown = function() {
            if (isIOS) $scope.data.keyboardHeight = 0;
            $ionicScrollDelegate.resize();
        }
        scope.closeKeyboard = function(){
            cordova.plugins.Keyboard.close();
        }

    }

    angular.module('tvchat')
        .controller('itemInfoController',['$scope','msg','$state','$timeout','$ionicScrollDelegate',itemInfoController]);
}());

