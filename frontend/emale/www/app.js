// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('tvchat', ['ionic','tvchat.services','firebase'])
    .config(function($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('login',{
                url:'/',
                templateUrl:'login/login.html',
                controller: 'LoginController'

            })
            .state('index', {
                url: '/index',
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
                        //done: fix how to get channel name -> state.params.name = undefined?
                        //fixes: use stateParams that is already exist with resolve :)
                        return httpService.getChannelMsg(stateParams.name);
                    }]
                },
                controller: 'itemInfoController',
                controllerAs : 'item'

            })
    })
    .value('FIREBASE_REF','https://tv-chat.firebaseio.com/')
    .value('userSession',{})
    .controller('wrapperController', ['$scope','userSession','$ionicNavBarDelegate','$stateParams','$timeout','$ionicLoading', function(scope,userSession,ionicNavBarDelegate,stateParams,timeout,$ionicLoading) {


        scope.user= function(){
             return userSession.user;
        }

        scope.auth =function(){
            return userSession.auth;
        }


        scope.logout=function(){
            userSession.auth.$logout();
        }


        scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {


            if (toState.resolve) {
                $ionicLoading.show({
                    template: 'Loading...'
                });
            }

        });
        scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $ionicLoading.hide();
        });

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
    .constant('socketConstant',{
        socket: io.connect('http://quiet-ridge-6377.herokuapp.com:80')
    })
    .run(function($ionicPlatform,socketConstant,$state,$rootScope,userSession) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }


          $rootScope.$on('$firebaseSimpleLogin:login', function(event, user) {
              userSession.user=user;
               console.log('logged in');
              $state.go('index');
          });

          $rootScope.$on('$firebaseSimpleLogin:error', function(event, error) {
              console.log('Error logging user in: ', error);
          });

          $rootScope.$on('$firebaseSimpleLogin:logout', function(event) {
              angular.copy({}, userSession.auth.user);
              $state.go('login');
          });
      });
        //making socket available all over the app:
      socket = socketConstant.socket;

    });
