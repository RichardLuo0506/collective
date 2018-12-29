(function() {
    'use strict';
    // Include app dependency on ngMaterial 

    angular
        .module('App')
        .controller('Core', Core);

    Core.$inject = ['$window', 'lock', '$location', 'authService', '$scope'];

    function Core($window, lock, $location, authService, $scope) {
        var core = this;

        // login
        core.login = login;
        core.logout = logout;
        core.isAuthenticated = isAuthenticated;

        // menu
        core.toggleMenu = toggleMenu;

        init();

        function init() {
            core.docElem = $window.document.documentElement;
            core.perspective = $('#perspective');
            core.viewWrapper = $('#view-wrapper');

            $scope.$on('authenticated', function(event) {
                core.toggleMenu({}, 'view');
            })

            $scope.$on('logout', function(event) {
                core.logout();
            })
        }

        function isAuthenticated() {
            return authService.isAuthenticated();
        }

        function login() {
            authService.login();
        }

        function logout() {
            authService.logout();
            $location.path('/home');
            core.toggleMenu({}, 'view');
        }

        function scrollY() {
            return $window.pageYOffset || core.docElem.scrollTop;
        }

        function toggleMenu(e, type) {
            if (type === 'menu') {
                e.stopPropagation();
                e.preventDefault();
                core.docScroll = scrollY();
                core.viewWrapper.css('top', core.docScroll * -1 + 'px');

                // mac chrome issue:
                document.body.scrollTop = document.documentElement.scrollTop = 0;

                core.perspective.addClass('modalview');
                _.defer(function() { core.perspective.addClass('animate') });
            } else if (type === 'view') {
                // contentWrapper.style.top = '0px';
                core.perspective.removeClass('animate');
                _.delay(function() {
                    core.perspective.removeClass('modalview');
                    // mac chrome issue:
                    document.body.scrollTop = document.documentElement.scrollTop = core.docScroll;

                    core.viewWrapper.css('top', '0px');
                }, 500);
            }
        }
    }
})();