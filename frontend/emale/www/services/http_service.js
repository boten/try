/**
 * Created by nadavv on 19/09/2014.
 */

(function(){

    function httpService(http){

        this.getChannelsList= function(){
           return  http.get('http://localhost:3000/api/1/channels-list').then(function(channelsList){
                return channelsList
            },function(err){
                console.log(err)
            })
        };

        this.getChannelMsg = function(name){
            return  http.get('http://localhost:3000/api/1/channels-msg/'+name).then(function(channelsMsg){
                return channelsMsg
            },function(err){
                console.log(err)
            })
        };


    }

    angular.module('tvchat.services')
        .service('httpService',['$http',httpService]);


}());


