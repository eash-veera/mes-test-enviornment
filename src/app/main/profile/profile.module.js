(function ()
{
    'use strict';

    angular
        .module('app.profile', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.profile', {
                url    : '/profile',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/profile/profile.html',
                        controller : 'SampleController as vm'
                    }
                },
                resolve: {
                    SampleData: function (msApi)
                    {
                        return msApi.resolve('sample@get');
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/sample');

        // Api
        msApiProvider.register('sample', ['app/data/sample/sample.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('profile', {
            title    : 'Profile',
            icon     : 'icon-account-alert',
            state    : 'app.profile',
            /*stateParams: {
                'param1': 'page'
             },*/
            weight   : 1
        });
    }
})();