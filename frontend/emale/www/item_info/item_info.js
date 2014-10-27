/**
 * Created by nadavv on 9/13/14.
 */

(function(){
    function itemInfoController(scope,msg,state,$timeout,$ionicScrollDelegate,$firebase){
        var alternate,
            isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

        var ref = new Firebase("https://tv-chat.firebaseio.com/"+state.params.name);
        var sync = $firebase(ref);
        scope.messageList = sync.$asArray()

        scope.myId = '12345';
        //scope.newMsg = {channelName: state.params.name, msg:'' ,userId : scope.myId};
        scope.channelName = state.params.name;


        scope.time = new Date().getTime();

        //socket.on("addNewMsg", function (msg) {
        //    console.log('got new msg from host');
        //    scope.$apply(function() {
        //        //wrapped this within $apply
        //        scope.messageList.push(msg);
        //        $ionicScrollDelegate.scrollBottom();
        //    });
        //
        //});

        scope.addMsg = function(){
            alternate = !alternate;
            var newData =  {
                msg: scope.newMsg.msg,
                userId: alternate ? '12345' : '54321'
            };
            //scope.messageList.push(newData);
            //socket.emit("newMsg",scope.newMsg);
            scope.messageList.$add(newData);
            scope.newMsg.msg ='';
            $ionicScrollDelegate.scrollBottom();
        };


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
        .controller('itemInfoController',['$scope','msg','$state','$timeout','$ionicScrollDelegate','$firebase',itemInfoController]);
}());

