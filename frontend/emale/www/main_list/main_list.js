/**
 * Created by nadavv on 9/13/14.
 */

(function(){
    function mainListController(scope,dataService){

        scope.fullList = dataService.getFullList();


//      todo : fix ctrl as so we can use thr this.fullList->
//        this.fullList = function(){
//            return dataService.getFullList();
//        };



    };

    angular.module('emale')
        .controller('mainListController',['$scope','dataService',mainListController]);
}());

