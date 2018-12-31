(function() {
    'use strict';

    angular
        .module('App')
        .controller('Account', Account);

    Account.$inject = ['$http', 'store', 'lock'];

    function Account($http, store, lock) {
        var vm = this;

        vm.message = 'profile msg';

        init();

        function init() {
            // $http.get('http://localhost:3001/api/private')
            //     .then(function(res) {
            //         vm.message = res.data.message;
            //     });
            getProfile();
        }

        function getProfile() {
            // var accessToken = store.get('access_token');
            // lock.getUserInfo(accessToken, function(error, profile) {
            //     console.log('', profile);
            //     if (error) {
            //         console.log('Error: ', error);
            //     }
            // });
        }
    }
})();