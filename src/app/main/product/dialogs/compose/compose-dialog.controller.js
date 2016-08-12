(function ()
{
    'use strict';

    angular
        .module('app.product')
        .controller('AddProductController', AddProductController);

    /** @ngInject */
    function AddProductController($mdDialog, selectedMail)
    {
        var vm = this;


        vm.hiddenCC = true;
        vm.hiddenBCC = true;

        // If replying
        if ( angular.isDefined(selectedMail) )
        {
            vm.form.to = selectedMail.from.email;
            vm.form.subject = 'RE: ' + selectedMail.subject;
            vm.form.message = '<blockquote>' + selectedMail.message + '</blockquote>';
        }

        // Methods
        vm.closeDialog = closeDialog;

        //////////

        function closeDialog()
        {
            $mdDialog.hide();
        }
    }
})();
