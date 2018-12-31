(function() {
    'use strict';

    angular.module('App')
        .service('authService', authService);

    authService.$inject = ['lock', '$location', 'store', '$state', '$rootScope'];

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
            store.remove('userInfo');
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
            console.log('login authResult', authResult);

            var payload = authResult.idTokenPayload;
            var userInfo = {
                email: payload.email,
                email_verified: payload.email_verified,
                name: payload.name,
                nickname: payload.nickname,
                picture: payload.picture,
                updated_at: payload.updated_at,
                authorization: payload['https://thecollectiveholdings.io/user_authorization']
            };
            store.set('userInfo', JSON.stringify(userInfo));
            $rootScope.userInfo = userInfo;
        }

        function isAuthenticated() {
            // Check whether the current time is
            // past the Access Token's expiry time
            var expiresAt = JSON.parse(store.get('expires_at'));
            return new Date().getTime() < expiresAt;
        }

        function getUserInfo () {
        	return JSON.parse(store.get('userInfo'));
        }

        return {
            login: login,
            logout: logout,
            handleAuthentication: handleAuthentication,
            isAuthenticated: isAuthenticated,
            getUserInfo: getUserInfo
        };
    }
})();