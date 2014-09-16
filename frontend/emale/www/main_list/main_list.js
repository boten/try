/**
 * Created by nadavv on 9/13/14.
 */

(function(){
    function mainListController(scope,dataService,firebase){

        var ref = new Firebase("https://glaring-fire-7037.firebaseio.com/");

        // create an AngularFire reference to the data
        var sync = firebase(ref);

        // download the data into a local object
        var syncObject = sync.$asObject();

        // synchronize the object with a three-way data binding
        syncObject.$bindTo(scope, "data");

        // create a synchronized array for use in our HTML code
        scope.messages = sync.$asArray();;

        scope.addMessage = function(text) {
            scope.messages.$add({text: text});
        }




    };

    angular.module('emale')
        .controller('mainListController',['$scope','dataService',"$firebase",mainListController]);
}());

