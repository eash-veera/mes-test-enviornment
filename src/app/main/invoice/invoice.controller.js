(function ()
{
    'use strict';

    angular
        .module('app.invoice')
        .controller('InvoiceController', InvoiceController);

    /** @ngInject */
    function InvoiceController($scope, $document, $timeout, $mdDialog, $mdMedia, $mdSidenav, Invoice)
    {
        var vm = this;

        vm.appInnerState = "default";

        vm.checked = [];
        vm.colors = ['blue-bg', 'blue-grey-bg', 'orange-bg', 'pink-bg', 'purple-bg'];

        vm.selectedInvoice = {};
        vm.toggleSidenav = toggleSidenav;

        vm.responsiveReadPane = undefined;
        vm.activeInvoicePaneIndex = 0;
        vm.dynamicHeight = false;

        vm.scrollPos = 0;
        vm.scrollEl = angular.element('#content');

        vm.invoices = Invoice.data;
        console.log(vm.invoices);
        //invoice data getter !
        vm.selectedInvoice = vm.invoices[0];
        vm.selectedMailShowDetails = false;

        // Methods
        vm.checkAll = checkAll;
        vm.closeReadPane = closeReadPane;
        vm.addInvoice = toggleinnerView;
        vm.isChecked = isChecked;
        vm.selectInvoice = selectInvoice;
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
        function selectInvoice(invoice)
        {
            vm.selectedInvoice = invoice;

            $timeout(function ()
            {
                vm.activeInvoicePaneIndex = 1;

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
            vm.activeInvoicePaneIndex = 0;

            $timeout(function ()
            {
                vm.scrollEl.scrollTop(vm.scrollPos);
            }, 650);
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
         * @param invoice
         * @param event
         */
        function toggleCheck(invoice, event)
        {
            if ( event )
            {
                event.stopPropagation();
            }

            var idx = vm.checked.indexOf(invoice);

            if ( idx > -1 )
            {
                vm.checked.splice(idx, 1);
            }
            else
            {
                vm.checked.push(invoice);
            }
        }

        /**
         * Return checked status of the invoice
         *
         * @param invoice
         * @returns {boolean}
         */
        function isChecked(invoice)
        {
            return vm.checked.indexOf(invoice) > -1;
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
                angular.forEach(vm.invoices, function (invoice)
                {
                    if ( !isChecked(invoice) )
                    {
                        toggleCheck(invoice);
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

        /**
         * Toggle innerview
         *
         */

        function toggleinnerView(){
            if(vm.appInnerState === "default"){
                vm.appInnerState = "add";
            }else{
                vm.appInnerState = "default";
            }
        }
    }
})();