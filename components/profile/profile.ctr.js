(function() {
    'use strict';

    angular
        .module('App')
        .controller('Profile', Profile);

    Profile.$inject = ['$http', 'store', 'lock'];

    function Profile($http, store, lock) {
        var vm = this;

        vm.message = 'profile msg'

        init();

        function init() {
            $http.get('http://localhost:3001/api/private')
                .then(function(res) {
                    vm.message = res.data.message;
                });
        }
    }
})();