/**
 * Created by nadavv on 9/13/14.
 */

(function(){
    function itemInfoController(scope,state,dataService){

        scope.itemName = state.params.name;

      scope.itemInfo = dataService.getItemInfo(state.params.name)


    };

    angular.module('emale')
        .controller('itemInfoController',['$scope','$state','dataService',itemInfoController]);
}());

