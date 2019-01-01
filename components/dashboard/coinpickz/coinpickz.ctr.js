(function() {
    'use strict';

    angular
        .module('App')
        .controller('Coinpickz', Coinpickz);

    Coinpickz.$inject = ['$http'];

    function Coinpickz($http) {
        var vm = this;

        init();

        function init() {
            getCoinpickz();
        }

        function getCoinpickz() {
            vm.coinpickz = { "binance": [{ "PAIR": "AEETH" }, { "PAIR": "BATETH" }, { "PAIR": "BNBETH" }, { "PAIR": "BTGBTC" }, { "PAIR": "BTGETH" }, { "PAIR": "CDTETH" }, { "PAIR": "CLOAKETH" }, { "PAIR": "CVCBNB" }, { "PAIR": "DATAETH" }, { "PAIR": "ELFETH" }, { "PAIR": "ENJBNB" }, { "PAIR": "ENJETH" }, { "PAIR": "FUELETH" }, { "PAIR": "GVTETH" }, { "PAIR": "IOTXETH" }, { "PAIR": "LRCETH" }, { "PAIR": "MANABTC" }, { "PAIR": "MANAETH" }, { "PAIR": "MANAUSD" }, { "PAIR": "MDAETH" }, { "PAIR": "NANOBNB" }, { "PAIR": "NANOETH" }, { "PAIR": "NULSETH" }, { "PAIR": "ONTETH" }, { "PAIR": "POWRETH" }, { "PAIR": "RLCETH" }, { "PAIR": "SNMETH" }, { "PAIR": "STRATBTC" }, { "PAIR": "STRATETH" }, { "PAIR": "TRXBNB" }, { "PAIR": "TRXETH" }, { "PAIR": "TUSDETH" }, { "PAIR": "XLMBNB" }, { "PAIR": "XLMETH" }, { "PAIR": "XMRETH" }, { "PAIR": "XRPBNB" }, { "PAIR": "XRPETH" }, { "PAIR": "ZECETH" }, { "PAIR": "ZRXBTC" }, { "PAIR": "ZRXETH" }] };
            console.log('', vm.coinpickz);
        }
    }
})();