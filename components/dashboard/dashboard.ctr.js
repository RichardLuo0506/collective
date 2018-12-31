(function() {
    'use strict';

    angular
        .module('App')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$http'];

    function Dashboard($http) {
        var vm = this;

        init();

        function init() {
        }
    }
})();