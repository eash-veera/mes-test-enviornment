(function ()
{
    'use strict';

    /**
     * Main module of the Mambati Enterprise Shell
     */
    angular
        .module('mescc', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            // Sample
            'app.sample',

            'app.product',

            'app.invoice',

            'app.profile',

            'app.settings'
        ]);
})();