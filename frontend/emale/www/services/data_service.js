/**
 * Created by nadavv on 9/13/14.
 */
(function(){
    angular.module('tvchat.services',[])
        .service('dataService',[dataService]);

    function dataService(){

        var channelsList =[];

        this.addListenChannel = function(channel){
            // channel is not on the list already :
            if (channelsList.indexOf(channel.name) === -1){
                channelsList.push(channel.name);
                console.log('listen to :')
                console.log(channel.name);
            }
        }

        this.removeListenChannel = function(channel){
            // channel is on the list :
            var index = channelsList.indexOf(channel.name);
            if ( index !== -1){
                channelsList.splice(index, 1);
                console.log('remove listen to :')
                console.log(channel.name);
            }

        }

        this.getChannelListeningStatus= function(channel){
            var index = channelsList.indexOf(channel.name);
            if (index !== -1) return true
            else return  false;
        }


    }




}());




