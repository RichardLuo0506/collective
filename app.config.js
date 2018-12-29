(function() {
    'use strict';
    angular
        .module('App')
        .config(config)
        .run(run);

    config.$inject = ['$provide', 'lockProvider', '$urlRouterProvider', '$stateProvider', '$httpProvider', 'jwtInterceptorProvider', 'jwtOptionsProvider'];

    function config($provide, lockProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {
        lockProvider.init({
            domain: 'thecollective.auth0.com',
            clientID: 'ncm3EaRJmDk9WQTX813RRix5ib6AT75o',
            options: {
                autoclose: true,
                auth: {
                    redirect: false,
                    responseType: 'token id_token',
                    audience: 'https://' + 'thecollective.auth0.com' + '/userinfo',
                    // audience: '127.0.0.1/api',
                    params: {
                        scope: 'openid profile email'
                    }
                }
            }
        });

        jwtOptionsProvider.config({
            whiteListedDomains: ['127.0.0.1', 'localhost']
        });

        jwtInterceptorProvider.tokenGetter = function(store) {
            return store.get('id_token');
        }
        $httpProvider.interceptors.push('jwtInterceptor');

        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'components/home/home.tpl.html'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'components/profile/profile.tpl.html',
                controller: 'Profile as vm'
            })

        function redirect($rootScope) {
            return {
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        $rootScope.$broadcast('logout');
                    }
                }
            }
        }

        $provide.factory('redirect', redirect);
        $httpProvider.interceptors.push('redirect');
    }

    run.$inject = ['authService', '$rootScope', 'store', 'jwtHelper'];

    function run(authService, $rootScope, store, jwtHelper) {
        authService.handleAuthentication();

        // $rootScope.$on('$locationChangeStart', function() {
        //     var token = store.get('id_token');
        //     console.log('', authService.isAuthenticated());
        //     if (token && !jwtHelper.isTokenExpired(token)) {

        //     }
        // });
    }
})();