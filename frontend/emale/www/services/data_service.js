/**
 * Created by nadavv on 9/13/14.
 */
(function(){
    angular.module('emale.services',['LocalStorageModule'])
        .service('dataService',['localStorageService',dataService]);

    function dataService(localStorageService){

        var fullList;

        this.getCurrentDataVersion = function(){
            return localStorageService.get('currentVersion') || "0.0";
        }

        this.setCurrentDataVersion = function (version){
            localStorageService.set('currentVersion',version);
        }

        this.getUpdateDataVersion = function(){
            return "0.3";
        }

        this.getListServer = function(){

            var list = [
                {
                    name: 'e132',
                    hebName: 'שלום',
                    description: 'used in milk',
                    icon:'ion-android-checkmark',
                    dangerColor: 'danger-low'

                },
                {
                    name: 'e200',
                    hebName: 'שלום',
                    description: 'used in soy',
                    icon:'ion-happy',
                    dangerColor: 'danger-med'

                },
                {
                    name: 'e300',
                    hebName: 'שלום',
                    description: 'used in candy',
                    icon:'ion-sad',
                    dangerColor: 'danger-high'

                }];

            localStorageService.set('fullList',list);
        };


        this.getFullList = function(){
            fullList =localStorageService.get('fullList');
            //todo: fullList is An array ??
            return fullList;

        };

        this.getItemInfo = function (name){
            return fullList;
            //todo : how to search localStorageService

        }


    }




}());




