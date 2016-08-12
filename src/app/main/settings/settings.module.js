(function ()
{
    'use strict';

    angular
        .module('app.settings', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.settings', {
                url    : '/settings',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/settings/settings.html',
                        controller : 'SettingsController as vm'
                    }
                },
                bodyClass: 'settings'
            });

        // Navigation

        msNavigationServiceProvider.saveItem('settings', {
            title    : 'settings',
            icon     : 'icon-cellphone-settings',
            state    : 'app.settings',
            /*stateParams: {
                'param1': 'page'
             },*/
            weight   : 1
        });
    }
})();