(function ()
{
    'use strict';

    angular
        .module('app.product')
        .controller('ProductController', ProductController);

    /** @ngInject */
    function ProductController($scope, $document, $timeout, $mdDialog, $mdMedia, $mdSidenav, Product)
    {
        var vm = this;

        vm.checked = [];
        vm.colors = ['blue-bg', 'blue-grey-bg', 'orange-bg', 'pink-bg', 'purple-bg'];
        // vm.selectedAccount = 'creapond';
        vm.selectedProduct = {};
        vm.toggleSidenav = toggleSidenav;

        vm.responsiveReadPane = undefined;
        vm.activeProductPaneIndex = 0;
        vm.dynamicHeight = false;

        vm.scrollPos = 0;
        vm.scrollEl = angular.element('#content');

        vm.products = Product.data;
        //product data getter !
        vm.selectedProduct = vm.products[0];
        vm.selectedMailShowDetails = false;

        // Methods
        vm.checkAll = checkAll;
        vm.closeReadPane = closeReadPane;
        vm.addProductDialog = addProductDialog;
        vm.isChecked = isChecked;
        vm.selectProduct = selectProduct;
        vm.toggleStarred = toggleStarred;
        vm.toggleCheck = toggleCheck;

        //////////

        // Watch screen size to activate responsive read pane
        $scope.$watch(function ()
        {
            return $mdMedia('gt-md');
        }, function (current)
        {
            vm.responsiveReadPane = !current;
        });

        // Watch screen size to activate dynamic height on tabs
        $scope.$watch(function ()
        {
            return $mdMedia('xs');
        }, function (current)
        {
            vm.dynamicHeight = current;
        });

        /**
         * Select product
         *
         * @param product
         */
        function selectProduct(product)
        {
            vm.selectedProduct = product;

            $timeout(function ()
            {
                // If responsive read pane is
                // active, navigate to it
                if ( angular.isDefined(vm.responsiveReadPane) && vm.responsiveReadPane )
                {
                    vm.activeProductPaneIndex = 1;
                }

                // Store the current scrollPos
                vm.scrollPos = vm.scrollEl.scrollTop();

                // Scroll to the top
                vm.scrollEl.scrollTop(0);
            });
        }

        /**
         * Close read pane
         */
        function closeReadPane()
        {
            if ( angular.isDefined(vm.responsiveReadPane) && vm.responsiveReadPane )
            {
                vm.activeProductPaneIndex = 0;

                $timeout(function ()
                {
                    vm.scrollEl.scrollTop(vm.scrollPos);
                }, 650);
            }
        }

        /**
         * Toggle starred
         *
         * @param mail
         * @param event
         */
        function toggleStarred(mail, event)
        {
            event.stopPropagation();
            mail.starred = !mail.starred;
        }

        /**
         * Toggle checked status of the mail
         *
         * @param mail
         * @param event
         */
        function toggleCheck(mail, event)
        {
            if ( event )
            {
                event.stopPropagation();
            }

            var idx = vm.checked.indexOf(mail);

            if ( idx > -1 )
            {
                vm.checked.splice(idx, 1);
            }
            else
            {
                vm.checked.push(mail);
            }
        }

        /**
         * Return checked status of the mail
         *
         * @param mail
         * @returns {boolean}
         */
        function isChecked(mail)
        {
            return vm.checked.indexOf(mail) > -1;
        }

        /**
         * Check all
         */
        function checkAll()
        {
            if ( vm.allChecked )
            {
                vm.checked = [];
                vm.allChecked = false;
            }
            else
            {
                angular.forEach(vm.products, function (mail)
                {
                    if ( !isChecked(mail) )
                    {
                        toggleCheck(mail);
                    }
                });

                vm.allChecked = true;
            }
        }

        /**
         * Open compose dialog
         *
         * @param ev
         */
        function addProductDialog(ev)
        {
            $mdDialog.show({
                controller         : 'AddProductController',
                controllerAs       : 'vm',
                locals             : {
                    selectedMail: undefined
                },
                templateUrl        : 'app/main/product/dialogs/compose/compose-dialog.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true
            });
        }

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }
    }
})();