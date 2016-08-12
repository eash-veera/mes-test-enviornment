(function ()
{
    'use strict';

    angular
        .module('app.core')
        .config(config);

    /** @ngInject */
    function config($mdThemingProvider, mesPalettes, mesThemes, mesThemingProvider)
    {
        // Inject Cookies Service
        var $cookies;
        angular.injector(['ngCookies']).invoke([
            '$cookies', function (_$cookies)
            {
                $cookies = _$cookies;
            }
        ]);

        // Check if custom theme exist in cookies
        var customTheme = $cookies.getObject('customTheme');
        if ( customTheme )
        {
            mesThemes['custom'] = customTheme;
        }

        $mdThemingProvider.alwaysWatchTheme(true);

        // Define custom palettes
        angular.forEach(mesPalettes, function (palette)
        {
            $mdThemingProvider.definePalette(palette.name, palette.options);
        });

        // Register custom themes
        angular.forEach(mesThemes, function (theme, themeName)
        {
            $mdThemingProvider.theme(themeName)
                .primaryPalette(theme.primary.name, theme.primary.hues)
                .accentPalette(theme.accent.name, theme.accent.hues)
                .warnPalette(theme.warn.name, theme.warn.hues)
                .backgroundPalette(theme.background.name, theme.background.hues);
        });

        // Store generated PALETTES and THEMES objects from $mdThemingProvider
        // in our custom provider, so we can inject them into other areas
        mesThemingProvider.setRegisteredPalettes($mdThemingProvider._PALETTES);
        mesThemingProvider.setRegisteredThemes($mdThemingProvider._THEMES);
    }

})();