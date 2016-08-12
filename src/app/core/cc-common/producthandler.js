(function(pm){
    pm.factory('$productHandler', function($http,$charge,$productCacheHandler){
        var productArray=[];
        var cache;
        //var skipProd=0;
        //var takeProd=7;

        function ProductHandlerClient() {
            var onComplete;
            var onError;
            /*
             load product method start
             */
            var skip = 0;
            var take = 1000;

            function loadProduct() {
                cache=$productCacheHandler.get('productCache');
                $charge.product().all(skip, take, 'desc')
                    .success(function (data) {
                        //if(sessionStorage.getItem('productCache'))
                        //{
                        //    //productArray=cache;
                        //    //debugger;
                        //    productArray=JSON.parse(sessionStorage.getItem('productCache'));
                        //    onComplete(productArray);
                        //}
                        //else {
                        for (var i = 0; i < data.length; i++) {
                            productArray.push(data[i]);
                            //debugger;
                        }

                        skip += take;
                        loadProduct();
                        //}
                    }).error(function (data) {
                        console.log(data);
                        if (data.hasOwnProperty("error"))
                            if (onComplete) {
                                //      $productCacheHandler.put('productCache',productArray);
                                //    sessionStorage.setItem('productCache', JSON.stringify(productArray));
                                onComplete(productArray);
                            }
                    });
            }
            /*
             load product method end
             */
            function loadProductByScroll(skipProd,takeProd) {
                var productAll=[];
                $charge.product().all(skipProd, takeProd, 'desc')
                    .success(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            productAll.push(data[i]);
                            //debugger;
                        }
                        if (onComplete) onComplete(productAll);


                    }).error(function (data) {
                        //debugger;
                        if (onError) onError(data);
                    });
            }
			
			
			/*
             load product method end
             */
            function customLoadProductScroll(skipProd,takeProd) {
                var productAll=[];
                $charge.product().all(skipProd, takeProd, 'asc')
                    .success(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            productAll.push(data[i]);
                            //debugger;
                        }
                        if (onComplete) onComplete(productAll);


                    }).error(function (data) {
                        //debugger;
                        if (onError) onError(data);
                    });
            }
			
			
			/*
             filter product by code
             */
			function filterProductByCode(code) {
                var productAll=[];
                $charge.product().filterByCode(code, 'desc')
                    .success(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            productAll.push(data[i]);
                            //debugger;
                        }
                        if (onComplete) onComplete(productAll);


                    }).error(function (data) {
                        //debugger;
                        if (onError) onError(data);
                    });
            }

            return {
                LoadProduct: function () {
                    loadProduct()
                    return this;
                },
                LoadProductByScroll: function (skip,take) {
                    loadProductByScroll(skip,take)
                    return this;
                },
				CustomLoadProductByScroll: function (skip,take) {
                    customLoadProductScroll(skip,take)
                    return this;
                },
				filterProductByCode: function (code) {
                    filterProductByCode(code)
                    return this;
                },
                onComplete: function (func) {
                    onComplete = func;
                    return this;
                },
                onError: function (func) {
                    onError = func;
                    return this;
                }
            }
        }

        return {
            getClient: function () {
                var req = new ProductHandlerClient();
                return req;
            }
        }
    });
})(angular.module('productModule', ['cloudcharge','productCacheFactory']))