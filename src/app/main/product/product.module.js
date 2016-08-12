(function ()
{
    'use strict';

    angular
        .module('app.product', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.product', {
                url    : '/product',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/product/product.html',
                        controller : 'ProductController as vm'
                    }
                },
                resolve: {
                    Product: function (msApi)
                    {
                        return msApi.resolve('cc_product.products@get');
                    }
                },
                bodyClass: 'product'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/product');

        // Api
        msApiProvider.register('cc_product.products', ['app/data/cc_product/products.json']);

        // Navigation

        msNavigationServiceProvider.saveItem('product', {
            title    : 'product',
            icon     : 'icon-leaf',
            state    : 'app.product',
            /*stateParams: {
                'param1': 'page'
             },*/
            weight   : 1
        });
    }
})();