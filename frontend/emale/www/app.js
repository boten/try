// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('tvchat', ['ionic','tvchat.services'])
    .config(function($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'main_list/main_list.html',
                resolve:{
                    channel: ['httpService',function(httpService){
                            return httpService.getChannelsList();
                        }]
                    },
                controller: 'mainListController'
                //controllerAs: 'mainList'
            })
            .state('info',{
                url: '/:name',
                templateUrl: 'item_info/item_info.html',
                resolve:{
                    msg: ['httpService','$state',function(httpService,state){
                        console.log(state);
                        //todo: fix how to get channel name? stat.params.name = undefined?
                        return httpService.getChannelMsg('10');
                    }]
                },
                controller: 'itemInfoController',
                controllerAs : 'item'

            })
    })
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    });

