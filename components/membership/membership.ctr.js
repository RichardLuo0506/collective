(function() {
    'use strict';

    angular
        .module('App')
        .controller('Membership', Membership);

    Membership.$inject = [];

    function Membership() {
        var vm = this;

        init();

        function init() {
        }
    }
})();