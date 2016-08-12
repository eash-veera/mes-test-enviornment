(function ()
{
    'use strict';

    angular
        .module('mescc')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(mesTheming)
    {
        var vm = this;

        // Data
        vm.themes = mesTheming.themes;

        //////////
    }
})();