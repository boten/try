/**
 * Created by nadavv on 9/13/14.
 */

(function(){
    function mainListController(scope,channel){
        //scope.channels = [{channel:'1'},{channel:'2'}];
        scope.channels = channel.data;




    };

    angular.module('tvchat')
        .controller('mainListController',['$scope','channel',mainListController]);
}());

