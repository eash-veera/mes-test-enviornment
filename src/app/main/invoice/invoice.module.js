(function ()
{
    'use strict';

    angular
        .module('app.invoice', [])
        .config(config)
        .filter('parseDate',parseDateFilter);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.invoice', {
                url    : '/invoice',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/invoice/invoice.html',
                        controller : 'InvoiceController as vm'
                    }
                },
                resolve: {
                    Invoice: function (msApi)
                    {
                        return msApi.resolve('cc_invoice.invoices@get');
                    }
                },
                bodyClass: 'invoice'
            });

        //Api
        msApiProvider.register('cc_invoice.invoices', ['app/data/cc_invoice/invoices.json']);

        // Navigation

        msNavigationServiceProvider.saveItem('invoice', {
            title    : 'invoice',
            icon     : 'icon-leaf',
            state    : 'app.invoice',
            /*stateParams: {
                'param1': 'page'
             },*/
            weight   : 1
        });
    }

    function parseDateFilter(){
        return function(input){
            return new Date(input);
        };
    }
})();