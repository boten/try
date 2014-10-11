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
                    msg: ['httpService','$stateParams',function(httpService,stateParams){
                        console.log('stateParams: ');
                        console.log(stateParams);
                        //done: fix how to get channel name -> state.params.name = undefined?
                        //fixes: use stateParams that is already exist with resolve :)
                        return httpService.getChannelMsg(stateParams.name);
                    }]
                },
                controller: 'itemInfoController',
                controllerAs : 'item'

            })
    })
    .controller('wrapperController', ['$scope','$ionicNavBarDelegate','$stateParams','$timeout', function(scope,ionicNavBarDelegate,stateParams,timeout) {
        scope.goBack = function() {
           // console.log('stateParams');
          //  console.log(stateParams);
            socket.emit("joinLobby",{oldRoom:stateParams.name});
            ionicNavBarDelegate.back();
        };

        socket.on("breakIsOver", function (channel) {
            console.log('break over '+channel);
            alert('breaks over on '+channel);
        });

        scope.disableBtn = false;

        scope.bingChannel = function(channelName){
            socket.emit("addToCounter",{channelName: channelName});
            scope.disableBtn = true;
            timeout(function(){
                scope.disableBtn = false;
            },60000); // 1 min
        }

    }])
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
      socket = io.connect('http://quiet-ridge-6377.herokuapp.com');

    });

