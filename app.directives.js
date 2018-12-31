(function() {
    'use strict';
    angular
        .module('App')
        .directive('backgroundSrc', backgroundSrc)

    function backgroundSrc() {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attr) {
            attr.$observe('backgroundSrc', function(value) {
                element.css({
                    'background-image': 'url(' + value + ')',
                    'background-size': 'cover',
                    'background-position': 'center center'
                });
            });
        }
    }
})();