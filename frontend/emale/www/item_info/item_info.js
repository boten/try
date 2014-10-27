/**
 * Created by nadavv on 9/13/14.
 */

(function(){
    function itemInfoController(scope,msg,state,$timeout,$ionicScrollDelegate,$firebase,userSession){
          var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
    //todo : need to add start at time to only get msg from this time
        var ref = new Firebase("https://tv-chat.firebaseio.com/"+state.params.name)//.startAt(Firebase.ServerValue.TIMESTAMP);//.on('child_added','');
        var sync = $firebase(ref);

        scope.messageList = sync.$asArray();


        scope.messageList = sync.$asArray();
        debugger;
        scope.myId = userSession.user.id;
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
            var newData =  {
                msg: scope.newMsg.msg,
                userId: scope.myId,
                time: Firebase.ServerValue.TIMESTAMP
            };
            //scope.messageList.push(newData);
            //socket.emit("newMsg",scope.newMsg);
            newData.$priority =  Firebase.ServerValue.TIMESTAMP;
            //todo : need to add start at time to only get msg from this time
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
        .controller('itemInfoController',['$scope','msg','$state','$timeout','$ionicScrollDelegate','$firebase','userSession',itemInfoController]);
}());

