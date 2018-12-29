(function() {
    'use strict';

    angular.module('App')
        .service('authService', authService);

    authService.$inject = ['lock', '$location','store', '$state', '$rootScope'];

    function authService(lock, $location, store, $state, $rootScope) {
        function login() {
            // Display the Lock widget using the
            // instance initialized in the app.js config
            lock.show();
        }

        function logout() {
            // Remove tokens and expiry time from localStorage
            store.remove('access_token');
            store.remove('id_token');
            store.remove('expires_at');
        }

        function handleAuthentication() {
            // Uncomment if you are not using HTML5Mode
            // lock.interceptHash();

            lock.on('authenticated', function(authResult) {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    _setSession(authResult);
                    $rootScope.$broadcast('authenticated');
                }
            });
            lock.on('authorization_error', function(err) {
                console.log(err);
            });
        }

        function _setSession(authResult) {
            // Set the time that the Access Token will expire
            var expiresAt = JSON.stringify(
                authResult.expiresIn * 1000 + new Date().getTime()
            );
            // Save tokens and expiration to localStorage
            store.set('access_token', authResult.accessToken);
            store.set('id_token', authResult.idToken);
            store.set('expires_at', expiresAt);
        }

        function isAuthenticated() {
            // Check whether the current time is
            // past the Access Token's expiry time
            var expiresAt = JSON.parse(store.get('expires_at'));
            return new Date().getTime() < expiresAt;
        }

        return {
            login: login,
            logout: logout,
            handleAuthentication: handleAuthentication,
            isAuthenticated: isAuthenticated
        };
    }
})();