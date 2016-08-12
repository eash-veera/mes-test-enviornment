(function ()
{
    'use strict';

    angular
        .module('app.core',
            [
                'ngAnimate',
                'ngAria',
                'ngCookies',
                'ngMessages',
                'ngResource',
                'ngSanitize',
                'ngMaterial',
                'pascalprecht.translate',
                //CloudCharge Common Module
                //todo - combine esentipals only from uimicrokernal to one common cc module
                'ui.router',
                'uiMicrokernel',
                'cloudcharge',
                'paymentGateway',
                'productModule',
                'productCacheFactory'
            ]);
})();