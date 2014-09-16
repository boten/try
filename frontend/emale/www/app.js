// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('emale', ['ionic','emale.services'])
    .config(function($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'main_list/main_list.html',
                controller: 'mainListController',
                controllerAs: 'mainList',
                resolve:{
                    data: function(dataService){
                        var currentVersion = dataService.getCurrentDataVersion();
                        var updateVersion = dataService.getUpdateDataVersion();
                        if (currentVersion !== updateVersion ){
                            dataService.setCurrentDataVersion(updateVersion);
                            dataService.getListServer();
                            return ;
                        }
                        return;

                    }
                }
            })
            .state('info',{
                url: '/:name',
                templateUrl: 'item_info/item_info.html',
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

