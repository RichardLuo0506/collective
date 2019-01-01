(function() {
    'use strict';

    angular
        .module('App')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$http', '$rootScope', '$location', '$scope'];

    function Dashboard($http, $rootScope, $location, $scope) {
        var vm = this;

        vm.openMenu = openMenu;

        init();

        function init() {
            vm.subviewTitle = getSubviewTitle($location.path());

            $scope.$on('$locationChangeSuccess', function() {
                vm.subviewTitle = getSubviewTitle($location.path());
            });
        }

        function getSubviewTitle(path) {
            var title;
            switch (path) {
                case '/dashboard':
                case '/dashboard/':
                    title = 'Home';
                    break;
                case '/dashboard/coinpickz':
                    title = 'Coin Pickz';
                    break;
            }
            return title;
        }

        function openMenu(e) {
            $rootScope.$broadcast('openMenu', e);
        }
    }
})();