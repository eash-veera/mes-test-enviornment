(function ()
{
    'use strict';

    angular
        .module('app.core')
        .provider('mesConfig', mesConfigProvider);

    /** @ngInject */
    function mesConfigProvider()
    {
        // Default configuration
        var mesConfiguration = {
            'disableCustomScrollbars'        : false,
            'disableMdInkRippleOnMobile'     : true,
            'disableCustomScrollbarsOnMobile': true
        };

        // Methods
        this.config = config;

        //////////

        /**
         * Extend default configuration with the given one
         *
         * @param configuration
         */
        function config(configuration)
        {
            mesConfiguration = angular.extend({}, mesConfiguration, configuration);
        }

        /**
         * Service
         */
        this.$get = function ()
        {
            var service = {
                getConfig: getConfig,
                setConfig: setConfig
            };

            return service;

            //////////

            /**
             * Returns a config value
             */
            function getConfig(configName)
            {
                if ( angular.isUndefined(mesConfiguration[configName]) )
                {
                    return false;
                }

                return mesConfiguration[configName];
            }

            /**
             * Creates or updates config object
             *
             * @param configName
             * @param configValue
             */
            function setConfig(configName, configValue)
            {
                mesConfiguration[configName] = configValue;
            }
        };
    }

})();