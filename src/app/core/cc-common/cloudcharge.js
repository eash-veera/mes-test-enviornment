/*cloudcharge.js works as a bridge for view and backend services.  */

(function(cc){
	var $h;
    //var service;
    function gst(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        //debugger;
        return null;
    }
    function getSecurityToken() {
        var _st = gst("securityToken");
        return (_st != null) ? _st : "cea62a552c7bfbec921f6bb1bcc10579"; //"78d2a5c15ea3254f273e437f49f2f3c9 197e19539d3a5ad03868828635902490";
    }
	function BP(){
		var sfn,ffn, u,endpoint,domain, b, p,host, otherOptions="",authkey="";
        var reqObj;
        function call(){
            //debugger;
            var domainReq = {
                method: "GET" ,
                url: "../../assets/js/config.json",
                headers: {'Content-Type': 'application/json', 'securityToken': getSecurityToken()}
            };
            //console.log(domainReq);
            $h(domainReq).success(function(data)
            {
                if (sfn && ffn){
                    for (key in data) {
                        if (data.hasOwnProperty(endpoint)) {
                            domain=data[endpoint]["domain"];
                            otherOptions=data[endpoint]["security"];
							authkey=data[endpoint]["authorization"];
                            break;
                        }
                    }
					if(domain!="none") {
						if(otherOptions==undefined || otherOptions !="none") {
							reqObj = {
								method: b ? "POST" : "GET",
								url: "http://" + domain + u,
								headers: {'Content-Type': 'application/json', 'securityToken': getSecurityToken()}
							};
							if (b) reqObj.data = b;
							if (p) reqObj.params = p;
						}
						else {
							if(authkey==undefined)
							{
								reqObj = {
									method: "JSONP",
									url: "http://" + domain + u,
									headers: {'Content-Type': 'application/json'}
								};
								if (b) reqObj.data = b;
								if (p) reqObj.params = p;
							}
							else
							{
								reqObj = {
									method: b ? "POST" : "GET" ,
									url: "http://" + domain + u,
									headers: {'Content-Type': 'application/json', 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI4M0t1MlVvTHkxeWZ1NWFqQXhyclk3V2RmbXh1QWNXRCIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiXX19LCJpYXQiOjE0NjMwMzM4NjAsImp0aSI6ImRiMzgzYzY4MTdkNzIwMWRmZDEzODA1ZmRhMWI3NDlmIn0.AIsIga5_GB4eyhNZ7RKFhz3HAPcUf9FzktXCAZhsiFc'}
								};
							
								if (b) reqObj.data = b;
								if (p) reqObj.params = p;
							}

						}
					}
					else
					{
						var reqObj = {
                            method: "GET" ,
                            url: u,
                            headers: {'Content-Type': 'application/json', 'securityToken': getSecurityToken()}
                        };
						
						if (b) reqObj.data = b;
						if (p) reqObj.params = p;
					}
                    //
                    //if (b) reqObj.data = b;
                    //if (p) reqObj.params = p;
                    //console.log(reqObj);
                    $h(reqObj).
                      success(function(data, status, headers, config) {
                    	if (status == 200) sfn(data);
                    	else ffn(data);
                      }).
                      error(function(data, status, headers, config) {
                    	ffn(data);
                      });

                }
            }).error(function(data)
            {
                console.log(data);
            });
		}
		return {
			success: function(f){sfn=f;call();return this;},
			error: function(f){ffn=f;return this;},
			p: function(ur,rr){u=ur;endpoint=rr;return this;},
			b: function(j){b =j;return this;},
            qp: function(po){p=po;return this;}
		}
	}

	cc.factory('$charge', function($http){
		$h = $http;
		return {
			product: function(){ return new ProductProxy();},
            promotion: function(){ return new PromotionProxy();},
            profile: function(){ return new ProfileProxy();},
            commondata: function(){ return new CommonDataProxy();},
            accounts:function(){return new AccountProxy();},
            order:function(){return new OrderProxy();},
            invoice:function(){return new InvoiceProxy();},
            billing:function(){return new BillingProxy();},
            stock:function(){return new StockProxy();},
            payment:function(){return new PaymentProxy();},
            email:function(){return new EmailProxy();},
            currency:function(){return new CurrencyRateProxy();},
			uom: function(){ return new UomProxy();},
            settings:function(){return new SettingsProxy();},
            tax:function(){return new TaxProxy();},
			promotionDetail: function(){ return new PromotionDetailProxy();},
			ledger: function(){ return new LedgerProxy();},
			inventory: function(){ return new InventoryProxy();},
			aod: function(){ return new aodProxy();},
			expense: function(){ return new ExpenseProxy();},
			adjustment: function(){ return new AdjustmentProxy();},
			job: function(){ return new JobProxy();}
		}	
	});

	function ProductProxy(){
        //debugger;
        var p = BP();
        var service="product";
		var handler = "/duosoftware.product.service";
		p.all = function(s,t,o){p.p(handler + "/products/getAll/",service).qp({"skip":s,"take":t,"order":o}); return p;}
		p.store = function(i){p.p(handler + "/products/insert",service).b(i); return p;}
        p.getByID=function(s){p.p(handler + "/products/getById/",service).qp({"id":s}); return p;}
		p.update=function(i){p.p(handler + "/products/update",service).b(i); return p;}
		p.filterByCode=function(s){p.p(handler + "/products/getProductsLikeCode/",service).qp({"code":s}); return p;}
		return p;
	}

    function ProfileProxy(){
        var p = BP();
        var service="profile";
        var handler = "/duosoftware.profile.service";
        p.all = function(s,t,o){p.p(handler + "/profile/getAll/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.store = function(i){p.p(handler + "/profile/insert",service).b(i); return p;}
        p.getByID=function(s){p.p(handler + "/profile/getById/",service).qp({"skip":s}); return p;}
        p.update = function(i){p.p(handler + "/profile/update",service).b(i); return p;}
        p.getprofilesbycategory = function(c,s,t,o){p.p(handler + "/profile/getProfileByCategory/",service).qp({"category":c,"skip":s,"take":t,"order":o}); return p;}

        return p;
    }

    function AccountProxy(){
        //debugger;
        var p = BP();
        var service="accounts";
        var handler = "/duosoftware.accounts.service";
        p.store = function(i){p.p(handler + "/accounts/insert",service).b(i); return p;}
        return p;
    }

    function OrderProxy(){
        //debugger;
        var p = BP();
        var service="order";
        var handler = "/duosoftware.order.service";
        p.store = function(i){p.p(handler + "/orders/insert",service).b(i); return p;},
		p.getByAccountID=function(a,s,t){p.p(handler + "/orders/getByGUAccountId/",service).qp({"GuAccountId":a,"skip":s,"take":t}); return p;}
        return p;
    }

    function InvoiceProxy(){
        //debugger;
        var p = BP();
        var service="invoice";
        var handler = "/duosoftware.invoice.service";
        p.all = function(s,t,o){p.p(handler + "/invoice/getAll/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.getByID=function(s){p.p(handler + "/invoice/getById/",service).qp({"id":s}); return p;}
		p.getByAccountID=function(s){p.p(handler + "/invoice/getbyAccountId/",service).qp({"accountid":s}); return p;}
        return p;
    }

    function BillingProxy(){
        //debugger;
        var p = BP();
        var service="billing";
        var handler = "/duosoftware.billing.service";
        p.process = function(i){p.p(handler + "/billing/process",service).b(i); return p;}
        p.calcTax=function(s,t){p.p(handler + "/billing/taxCal/",service).qp({"taxgroupid":s,"amount":t}); return p;}
		p.quotationProcess = function(i){p.p(handler + "/quotation/process",service).b(i); return p;}
        p.quotationByID=function(s){p.p(handler + "/quotation/quotationById/",service).qp({"id":s}); return p;}
        p.promoCalc = function(s,t,o,r){p.p(handler + "/billing/promoCal/",service).qp({"guPromotionId":s,"guAccountId":t,"guProductId":o,"totAmt" :r}); return p;}
        p.all = function(s,t,o){p.p(handler + "/quotation/getAll/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        return p;
    }

    function StockProxy(){
        var p = BP();
        //debugger;
        var service="stock";
        var handler = "/duosoftware.stock.service";
        p.getStock = function(s){p.p(handler + "/stock/getAvailableStock/",service).qp({"itemID":s}); return p;}
        p.update = function(i){p.p(handler + "/stock/updateInventory",service).b(i); return p;}
        return p;
    }

    function PaymentProxy(){
        var p = BP();
        var service="payment";
        var handler = "/duosoftware.payment.service";
        p.all = function(s,t,o){p.p(handler + "/payment/getAllPayments/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.getHeaderByID=function(s){p.p(handler + "/payment/GetPaymentDetails/",service).qp({"guPaymentID":s}); return p;}
        p.store = function(i){p.p(handler + "/payment/makePayment",service).b(i); return p;}
        p.getByID=function(s){p.p(handler + "/payment/searchPaymentbyID/",service).qp({"guPaymentID":s}); return p;}
        p.cancel=function(s){p.p(handler + "/payment/cancelPayment/",service).qp({"paymentNo":s}); return p;}
        p.payAdvance=function(s){p.p(handler + "/payment/payByAdvance/",service).qp({"guAccountID":s}); return p;}
        return p;
    }

    function EmailProxy()
    {
        var p = BP();
        var service="email";
        var handler = "/commands";
        debugger;
        p.sendemail = function(i){p.p(handler + "/notification/",service).b(i); return p;}
    }


    function CurrencyRateProxy()
    {
        var p = BP();
        var service="currencyRate";
        var handler = "/api/v3";
        p.calcCurrency = function(o){p.p(handler + "/convert?callback=JSON_CALLBACK",service).qp({"q":o}); return p;}
        return p;
    }
	
    function UomProxy(){
        var p = BP();
        //debugger;
        var service="uom";
        var handler = "/duosoftware.uom.service";
        p.all = function(s,t,o){p.p(handler + "/uoms/getAll/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.store = function(i){p.p(handler + "/uoms/insert",service).b(i); return p;}
        p.getUOMMasterById=function(s){p.p(handler + "/uoms/getUOMMasterById/",service).qp({"skip":s}); return p;}
        p.getUOMConversionByUOMId=function(s){p.p(handler + "/uoms/getUOMConversionByUOMId/",service).qp({"skip":s}); return p;}
        p.getUOMAppMapperByUOMId=function(s){p.p(handler + "/uoms/getUOMAppMapperByUOMId/",service).qp({"skip":s}); return p;}
        p.getAllUOM=function(s){p.p(handler + "/uoms/getAllUOMByID/",service).qp({"GUAppID":s}); return p;}
        p.updateUOM=function(i){p.p(handler + "/uoms/updateUOMMaster",service).b(i); return p;}
        p.delete=function(s){p.p(handler + "/uoms/delete",service).qp({"id":s}); return p;}


        return p;
    }

    function CommonDataProxy(){
        var p = BP();
        //debugger;
        var service="commondata";
        var handler = "/duosoftware.commondata.service";
        p.all = function(s,t,o){p.p(handler + "/commondata/getAll/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.store = function(i){p.p(handler + "/commondata/insert",service).b(i); return p;}
        p.getDuobaseFieldDetailsByTableNameAndFieldName=function(s,t){p.p(handler + "/commondata/getDuobaseFieldDetailsByTableNameAndFieldName/",service).qp({"tableName":s,"fieldName":t}); return p;}
        p.getUOMConversionByUOMId=function(s){p.p(handler + "/commondata/getUOMConversionByUOMId/",service).qp({"skip":s}); return p;}
        p.getUOMAppMapperByUOMId=function(s){p.p(handler + "/commondata/getUOMAppMapperByUOMId/",service).qp({"skip":s}); return p;}
        p.insertDuoBaseValuesAddition=function(i){p.p(handler + "/commondata/insertDuoBaseValuesAdditional",service).b(i); return p;}
        p.update=function(i){p.p(handler + "/commondata/updateDuoBaseValues",service).b(i); return p;}
        p.delete=function(i){p.p(handler + "/commondata/deleteDuoBaseValues",service).b(i); return p;}
        p.getDuobaseFieldsByTableNameAndFieldName=function(s,t){p.p(handler + "/commondata/getDuobaseFieldsByTableNameAndFieldName/",service).qp({"tableName":s,"fieldName":t}); return p;}
        p.insertBulkDuoBaseValues=function(i){p.p(handler + "/commondata/insertBulkDuoBaseValues",service).b(i); return p;}
        return p;
    }

    function SettingsProxy(){
        //debugger;
        var p = BP();
        var service="settings";
        var handler = "../../assets/js";
        //p.all = function(s){p.p(handler + "/currencies.json",service).qp({"app_id":s}); return p;}
        p.currencies = function(s){p.p(handler + "/currencies.json",service); return p;}
        p.languages = function(s){p.p(handler + "/languages.json",service); return p;}

        return p;
    }

    function TaxProxy(){
        //debugger;
        var p = BP();
        var service="tax";
        var handler = "/duosoftware.tax.service";
        p.all = function(s,t,o){p.p(handler + "/tax/getAll/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.getTaxByIDs = function(s){p.p(handler + "/tax/getDetailsById/",service).qp({"taxId":s}); return p;}
        p.allgroups=function(s,t,o){p.p(handler + "/taxgroup/getAll/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.getTaxGrpByIDs = function(s){p.p(handler + "/taxgroup/getById/",service).qp({"id":s}); return p;}
        p.storeTaxGrp = function(i){p.p(handler + "/taxgroup/insert",service).b(i); return p;}
        p.updateTaxGrp = function(i){p.p(handler + "/taxgroup/update",service).b(i); return p;}
        p.updateTax = function(i){p.p(handler + "/tax/update",service).b(i); return p;}
        p.storeTax = function(i){p.p(handler + "/tax/insert",service).b(i); return p;}
        p.deleteTax = function(s){p.p(handler + "/tax/delete/",service).qp({"id":s}); return p;}


        return p;
    }
	
    function PromotionProxy(){
        //debugger;
        var p = BP();
        var service="promotion";
        var handler = "/duosoftware.promotion.service";
        p.all = function(s,t,o){p.p(handler + "/promotion/getAll/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.store = function(i){p.p(handler + "/promotion/insert",service).b(i); return p;}
        p.getByID=function(s){p.p(handler + "/promotion/getById/",service).qp({"skip":s}); return p;}
        p.update=function(i){p.p(handler + "/promotion/update",service).b(i); return p;}
        return p;
    }

    function PromotionDetailProxy(){
        //debugger;
        var p = BP();
        var service="promotionDetail";
        var handler = "/duosoftware.promotion.service";
        p.all = function(s,t,o){p.p(handler + "/promotionDetails/getAll/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.store = function(i){p.p(handler + "/promotionDetails/insert",service).b(i); return p;}
        p.getByID=function(s){p.p(handler + "/promotionDetails/getById/",service).qp({"id":s}); return p;}
        p.update=function(i){p.p(handler + "/promotionDetails/update",service).b(i); return p;}
        return p;
    }
	
	function LedgerProxy(){
        var p = BP();
        var service="ledger";
        var handler = "/duosoftware.ledger.service";
        p.all = function(s,t,o){p.p(handler + "/ledger/getAllLedgers/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.store = function(i){p.p(handler + "/ledger/addLedger",service).b(i); return p;}
        p.update = function(i){p.p(handler + "/ledger/updateLedger",service).b(i); return p;}
        p.getByAccountID=function(a,s,t,o){p.p(handler + "/ledger/getLedgersForAccount/",service).qp({"accountID":a,"skip":s,"take":t,"order":o}); return p;}
        p.getTotalAmounts=function(a,f){p.p(handler + "/ledger/getLedgerSumForAccount/",service).qp({"accountID":a,"flow":f}); return p;}
        return p;
    }
	
	function InventoryProxy(){
        var p = BP();
        var service="inventory";
        var handler = "/duosoftware.grn.service";
        p.all = function(s,t,o){p.p(handler + "/grn/getAllDetails/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.allheaders = function(s,t,o){p.p(handler + "/grn/getAllHeader/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.getHeaderByID=function(s){p.p(handler + "/grn/GetDetailsForHeader/",service).qp({"grnNo":s}); return p;}
        p.store = function(i){p.p(handler + "/grn/insert",service).b(i); return p;}
        p.getByID=function(s){p.p(handler + "/grn/searchGRN/",service).qp({"grnNo":s}); return p;}
        p.cancel=function(s){p.p(handler + "/grn/cancelGRN/",service).qp({"grnNo":s}); return p;}
        return p;
    }
	
	function aodProxy(){
        var p = BP();
        var service="inventory";
        var handler = "/duosoftware.aod.service";
        p.all = function(s,t,o){p.p(handler + "/aod/getAllDetails/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.allheaders = function(s,t,o){p.p(handler + "/aod/getAllHeader/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.getHeaderByID=function(s){p.p(handler + "/aod/GetDetailsForHeader/",service).qp({"aodNo":s}); return p;}
        p.store = function(i){p.p(handler + "/aod/insert",service).b(i); return p;}
        p.getByID=function(s){p.p(handler + "/aod/searchAOD/",service).qp({"aodNo":s}); return p;}
        p.update = function(i){p.p(handler + "/aod/update",service).b(i); return p;}
        p.cancel=function(s){p.p(handler + "/aod/cancelAOD/",service).qp({"aodNo":s}); return p;}
        return p;
    }
	
	function ExpenseProxy(){
        //debugger;
        var p = BP();
        var service="expense";
        var handler = "/duosoftware.expense.service";
        p.searchExpenseById = function(s){p.p(handler + "/expense/searchExpense/",service).qp({"expenseId":s}); return p;}
        p.allExpenses=function(s,t,o){p.p(handler + "/expense/getAllExpenses/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.insertExpense = function(i){p.p(handler + "/expense/addExpense",service).b(i); return p;}
        p.cancelExpense = function(s){p.p(handler + "/expense/cancelExpense/",service).qp({"expenseId":s}); return p;}
        return p;
    }
	
	function AdjustmentProxy(){
        var p = BP();
        var service="adjustment";
        var handler = "/duosoftware.adjustment.service";
        p.all  = function(s,t,o){p.p(handler + "/adjustment/getAll/",service).qp({"skip":s,"take":t,"order":o}); return p;}
        p.store = function(i){p.p(handler + "/adjustment/insert",service).b(i); return p;}
        p.update = function(i){p.p(handler + "/adjustment/update",service).b(i); return p;}
        p.getByInvoiceId=function(s){p.p(handler + "/adjustment/getByInvoiceId/",service).qp({"invoiceId":s}); return p;}
        p.getByAdjustmentId=function(s){p.p(handler + "/adjustment/getById/",service).qp({"id":s}); return p;}
        return p;
    }
	
	function JobProxy(){
        //debugger;
        var p = BP();
        var service="job";
        //var handler = "/duosoftware.jobs.service";
        p.store = function(i){p.p("/jobs/AddJob",service).b(i); return p;}
        p.storeWithRef = function(i){p.p("/jobs/AddJobWithRef",service).b(i); return p;}
        p.disconnectJob=function(a){p.p("/jobs/StopJob/",service).qp({"jobKey":a,"refType":"Disconnection"}); return p;}
        return p;
    }


})(angular.module("cloudcharge", []));