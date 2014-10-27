/**
 * Created by nadav on 10/24/14.
 */

angular.module('com.htmlxprs.socialAuth.controllers',[]).controller('LoginController',['$scope','FIREBASE_REF','$firebaseSimpleLogin','userSession',function($scope,FIREBASE_REF,$firebaseSimpleLogin,userSession){

    userSession.auth=$firebaseSimpleLogin(new Firebase(FIREBASE_REF));

    $scope.login=function(provider){
        userSession.auth.$login(provider);
    }

}]);


(function(){
    function LoginController($scope,FIREBASE_REF,$firebaseSimpleLogin,userSession){

        userSession.auth=$firebaseSimpleLogin(new Firebase(FIREBASE_REF));

        $scope.login=function(provider){
            userSession.auth.$login(provider);
        }

    }

    angular.module('tvchat')
        .controller('LoginController',['$scope','FIREBASE_REF','$firebaseSimpleLogin','userSession',LoginController]);
}());