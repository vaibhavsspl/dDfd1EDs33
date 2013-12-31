/// <reference path="jquery.js" />
var rand_no=0;
var sess_id=0;
var today = new Date();
var tomorrow = new Date(today.getTime() + 86400000);
rand_no=1+(Math.random() * 6);
if($.cookie("food_session_id"))
{
sess_id = $.cookie("food_session_id");
}
else
{
$.cookie("food_session_id", rand_no, {expires: tomorrow});
sess_id = $.cookie("session_id");
}

function foodlocationinfo() {
    getLicenceData();
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];

    var featureId = 50;
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
    var data = '';
    //alert(url);
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {
            console.log(html);
            var validateTime;
            $.each(html, function (i, item) {
                if (item.openStatus == 1) {
                    validateTime = item.openStatus;
                }
            });
            $('title,.header-content h1').html(html[0].name);
            // if open show locations
            var counter = html.length;
            counter = counter - 1;
            if (validateTime == 1) {
                var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass"><li data-role="list-divider" >Locations</li>';
                $.each(html, function (i, item) {
                    if (counter > i) {
                        data += '<li><a rel="external"  href="food_category.html?location=' + item.locationId + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '" data-transition="flip" >' + item.city + '</a></li>';
                    }
                });
                data += '</ul>';
                $('#main-content').html(data);
                try {
                    $("#aboutclass").listview('refresh');
                } catch (e) {
                    $("#aboutclass").listview();
                }
            } else {
                // if not open show opening times
                closeShop(html);
            }
            getUserAppereance();

        }
    })
}


function foodcategory() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var location = getUrlVars()['location'];
    var cartlink = 'food_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
    $('#cartlink').attr('href', cartlink);
    var featureId = 50;
    var url = baseUrl + 'web/web/foodcategorysdatainfo/' + location + '/' + featureRelId + '/' + userSiteId;
    var data = '';
    //	alert(url);
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {
            console.log(html);
            var validateTime;
            $.each(html, function (i, item) {
                if (item.openStatus == 1) {
                    validateTime = item.openStatus;
                }
            });
            $('title,.header-content h1').html(html[0].name);
            if (validateTime == 1) {
                // for open time
                var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass"><li data-role="list-divider">Category</li>';
                var counter = html.length;
                counter = counter - 2;

                $.each(html, function (i, item) {
                    if (counter > i) {
                        data += '<li><a rel="external" href="food_item.html?location=' + location + '&cId=' + item.categoryId + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '" data-transition="slide">' + item.Name + ' (' + item.total_item + ')</a></li>';
                    }
                });
                data += '</ul>';
                $('#main-content').html(data);
                try {
                    $("#aboutclass").listview('refresh');
                } catch (e) {
                    $("#aboutclass").listview();
                }
            } else {

                // close shop 
                closeShop(html);
            }
            getUserAppereance();


        }
    })
}




function foodcategoryItem() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var location = getUrlVars()['location'];
    var cartlink = 'food_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
    $('#cartlink').attr('href', cartlink);
    var categoryId = getUrlVars()['cId'];
    var featureId = 50;
    var url = baseUrl + 'web/web/foodcategoryItemsinfo/' + location + '/' + featureRelId + '/' + userSiteId + '/' + categoryId;
    var data = '';
    //	alert(url);
    doAjaxCall(url, data, false, function (html) {

        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {
            console.log(html);
            var validateTime;
            $.each(html, function (i, item) {
                if (item.openStatus == 1) {
                    validateTime = item.openStatus;
                }
            });
            $('title,.header-content h1').html(html[0].name);
            var catName = html[0].categoryName;
            if (validateTime == 1) {
                // for open time
                var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass"><li data-role="list-divider">' + catName + '</li>';
                var counter = html.length;
                counter = counter - 2;

                $.each(html, function (i, item) {
                    if (counter > i) {
                        data += '<li><a rel="external" href="food_item_detail.html?location=' + location + '&iId=' + item.serviceId + '&transferId=' + featureRelId + '&cId=' + categoryId + '&touchId=' + userSiteId +
'" data-transition="slide">' + item.itemName + '</a></li>';
                    }
                });
                data += '</ul>';
                $('#main-content').html(data);
                try {
                    $("#aboutclass").listview('refresh');
                } catch (e) {
                    $("#aboutclass").listview();
                }
            } else {
                /* for close time*/
                closeShop(html);
            }
            getUserAppereance();
        }
    })
}

function foodItemInfo() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var location = getUrlVars()['location'];
    var cartlink = 'food_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
    $('#cartlink').attr('href', cartlink);
    var itemId = getUrlVars()['iId'];
    var categoryId = getUrlVars()['cId'];
    var featureId = 50;

    var htmlref = '';
    var data = '';
    var i = 1;
    var url = baseUrl + 'web/web/foodcategoryItemdetailsinfo/' + location + '/' + featureRelId + '/' + userSiteId + '/' + categoryId + '/' + itemId;
    	//alert(url);
    doAjaxCall(url, data, false, function (html) {

        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {

            var validateTime;
            $.each(html, function (i, item) {
                if (item.openStatus == 1) {
                    validateTime = item.openStatus;
                }
            });
            $('title,.header-content h1').html(html[0].name);
            var catName = html[0].categoryName;
            if (validateTime == 1) {

                var counter = html.length;
                counter = counter - 2;

                $.each(html, function (i, item) {

                    if (counter > i) {
                        htmlref += '<form action="#" onsubmit="return false" method="post" id="itemform">';
                        htmlref += '<input type="hidden" name="itemId" value="' + itemId + '"><input type="hidden" name="locationId" value="' + location + '"><input type="hidden" name="foodId" id="foodId" value="' + item.foodId + '">';
                        htmlref += '<h3 align="center">' + item.itemName + '</h3><div align="center"></div><br><strong>Detail </strong>';
						if(item.isUrl !='' && item.isUrl !=null){
							var isUrl	=	item.isUrl;	
							if(isUrl.search('http') != -1){
							htmlref += '<div class="ui-grid-b" align="center"><img src="'+isUrl+'"></div>';
							}else{
							htmlref += '<div class="ui-grid-b" align="center"><img src="'+baseUrl+isUrl+'"></div>';
							}
						}
							htmlref +='<br>' + item.description + '<br>';
                    }
                });
                getsizeData(htmlref);

            } else {
                /* for close time*/
                closeShop(html)
            }
        }
    })
    function getsizeData(htmlref) {

        url1 = baseUrl + 'web/web/foodcategoryItemsizesinfo/' + featureRelId + '/' + userSiteId + '/' + categoryId + '/' + itemId;
        //alert(url1);
        doAjaxCall(url1, '', false, function (html1) {
            htmlref += '<div data-role="fieldcontain"><fieldset data-role="controlgroup"><legend>Choose a size:</legend>';
            if ($.isEmptyObject(html1)) {
                htmlref += 'default size';
            } else {
                $.each(html1, function (i, item) {
                    //alert('a');
                    htmlref += '<input type="radio" name="sizeId" id="' + item.sizeId + '" value="' + item.sizeId + '" 	/> <label for="' + item.sizeId + '">' + item.size + ' ($' + item.sizeprice + ')</label>';
                })
            }
            htmlref += '</fieldset></div><div data-role="fieldcontain"><label for="quantity" class="select">Quantity:</label><select name="quantity" id="quantity">';
            for (; i < 11; i++) {
                htmlref += '<option value="' + i + '">' + i + '</option>';
            }
            htmlref += '</select></div>';
            getoptionData(htmlref);
            getUserAppereance();
        });
    }

    function getoptionData(htmlref) {

        url2 = baseUrl + 'web/web/foodcategoryItemoptionsinfo/' + featureRelId + '/' + userSiteId + '/' + categoryId + '/' + itemId;
        //alert(url2);
        doAjaxCall(url2, '', false, function (html2) {
            htmlref += '<div data-role="fieldcontain">';
            if ($.isEmptyObject(html2)) {
                htmlref += '<fieldset data-role="controlgroup"><legend>Choose an option:</legend>default Option</fieldset>';
            } else {
                $.each(html2, function (i, item) {
                    var checked = '';
                    if (item.required == 1) {
                        checked = "checked";
                    }
                    htmlref += '<p class="error minselecterror132691">You will need to select minimum of ' + item.Min + ' option(s) for ' + item.OptionGroup + '</p><fieldset data-role="controlgroup"><legend>Choose an option: ' + item.OptionGroup + '</legend><input  type="checkbox" name="optionId[]" id="' + item.OptionName + '" value="' + item.optionId + '"' + checked + ' /><label for="' + item.OptionName + '">' + item.OptionName + ' ($ ' + item.Charges + ')</label></fieldset>';
                })
            }
            htmlref += '</div><div><fieldset data-role="controlgroup"><legend>Specific Instructions (if any):</legend><textarea cols="40" rows="8" name="Instruction" id="Instruction" ></textarea></fieldset></div><div><span id="loc"></span><fieldset><div><button type="submit"  id="itemFormAction" onclick="submitItem(' + featureRelId + ',' + userSiteId + ',' + location + ');" name="action" value="submit" data-theme="a">Add item to order!</button></div></fieldset></div></form>';
            $('#main-content').html(htmlref);
			$('#main-content input[type="radio"]:first').prop('checked',true);
            try {
                $("#main-content").trigger('create');
            } catch (e) {
                $("#main-content").listview();
            }

        });
    }
}

function submitItem(transferId, touchId, location) {
	var food_id=$('#foodId').val();
    var url = baseUrl + 'web/web/insertfoodcarts/'+sess_id;
    var data = $('#itemform').serialize();
    //alert(data);
    doAjaxCall(url, data, true, function (html) {
        if (html == 1) {
            window.location.href = 'food_add_cart.html?transferId=' + transferId + '&touchId=' + touchId + '&location=' + location + '&food_id=' + food_id;
        } else {
            var holderror = '<div class="error">Oops.. Something went wrong ...!!</div>'
            $('#messege').html(holderror);
            $("#messege").trigger('create');
        }

    });
}

function foodaddcart() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var location = getUrlVars()['location'];
    var food_id = getUrlVars()['food_id'];
    var cartlink = 'food_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
    $('#cartlink').attr('href', cartlink);
    var featureId = 50;
    var data = '';
    data = '<ul data-role="listview" data-dividertheme="d" id="addcart"><li data-role="list-divider" style="text-align:center">YOUR ORDER HAS BEEN ADDED</li></ul><div class="orderButton"><a  data-role="button" rel="external" href="food_category.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '" data-theme="a">Order More</a><a data-role="button" rel="external"  href="food_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '&food_id=' + food_id + '" data-theme="b">Check Out</a></div>';
    $('#main-content').html(data);
    $(".orderButton").trigger('create');
    try {
        $("#addcart").listview('refresh');
    } catch (e) {
        $("#addcart").listview();
    }
    getUserAppereance();

}

function foodcheckoutcarterror() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var location = getUrlVars()['location'];
    var cartlink = 'food_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
    $('#cartlink').attr('href', cartlink);
    var featureId = 50;
    var data = '';
    data = '<ul data-role="listview" data-dividertheme="d" id="cartcheckout"><li data-role="list-divider" style="text-align:center">IT SEEMS CHECKOUT FAILED FOR SOME REASON.<br> PLEASE TRY AGAIN!</li></ul><style>.ui-btn-inner {white-space:normal;}</style><br><br><div id="cartorder"><a rel="external" href="food_category.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '" data-role="button">Thank you for your order. Please allow for 30 minutes for your order to be prepared. Give us a call if you have any questions.</a></div>';
    $('#main-content').html(data);
    $("#cartorder").trigger('create');
    try {
        $("#cartcheckout").listview('refresh');
    } catch (e) {
        $("#cartcheckout").listview();
    }
}

function foodcheckoutcartsucess() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var location = getUrlVars()['location'];
    var cartlink = 'food_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
    $('#cartlink').attr('href', cartlink);
    var featureId = 50;
    var data = '';
    data = '<ul data-role="listview" data-dividertheme="d" id="cartcheckout"><li data-role="list-divider" style="text-align:center">Order Success!</li></ul><style>.ui-btn-inner {white-space:normal;}</style><br><br><div id="cartorder"><a rel="external" href="food_category.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '"data-role="button">Thank you for your order. Please allow for 30 minutes for your order to be prepared. Give us a call if you have any questions.</a></div>';
    $('#main-content').html(data);
    $("#cartorder").trigger('create');
    try {
        $("#cartcheckout").listview('refresh');
    } catch (e) {
        $("#cartcheckout").listview();
    }

}

function foodcheckoutcart() {

    var sessionid = 1;
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId 	 = getUrlVars()['touchId'];
    var location 	 = getUrlVars()['location'];
    var food_id 	 = getUrlVars()['food_id'];
    $("#food_id").val(food_id);
    $("#userSiteId").val(userSiteId);
    $("#featureRelId").val(featureRelId);
    $("#location").val(location);
    var cartlink = 'food_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId +'&food_id='+food_id;
    $('#cartlink').attr('href', cartlink);
    var featureId = 50;
    var datahtml = '';
    var data = '';
    var validationData;
    url = baseUrl + 'web/web/getPayInfo/' + sess_id + '/' + featureRelId + '/' + userSiteId + '/' + location;
    // alert(url);
    doAjaxCall(url, '', false, function (validationData) {

        if ($.isEmptyObject(validationData)) {
            var dataEmpty = '<div class="error"> Sorry No Item found In You Cart..! </div>';
            $('#main-content').html(dataEmpty);
            $('#main-content').trigger('create');
        } else {
            console.log(validationData);
            datahtml = '<ul data-role="listview" data-dividertheme="d"><li data-role="list-divider" style="text-align:center">Cart</li></ul><br>';
            url2 = baseUrl + 'web/web/getcartInfo/' + sess_id + '/' + featureRelId + '/' + userSiteId + '/' + location;

            //   alert(url2);
            doAjaxCall(url2, '', false, function (htmlcart) {
                if ($.isEmptyObject(htmlcart)) {
                    var dataEmpty = '<div class="error"> Sorry No Item found In You Cart..! </div>';
                    $('#main-content').html(dataEmpty);
                    $('#main-content').trigger('create');
                } else {
                    console.log(htmlcart);
                    datahtml += '<div class="error"></div><div class="success"></div><div id="ordertable"><table data-role="table" id="" data-mode="" class="ui-responsive table-stroke"><thead><tr><th data-priority="1">Item</th><th data-priority="1">Price</th><th data-priority="1">Quantity</th><th data-priority="1">Action</th></tr></thead><tbody>';

                    var uniqueid = '';
                    var fooditemDetail = '';
                    var currencyIcon = validationData[0].currencyIcon;
                    var convenienceFee = validationData[0].convenienceFee;
                    var rate = validationData[0].rate;
					
					
					$('#convenienceFee').val(convenienceFee);
                    // alert(JSON.stringify(validationData));
                    $.each(htmlcart, function (i, item) {

                        var foodprice = item.itemPrice;
                        var optionCharges = item.optionCharge;
                        var quantity = item.quantity;
                        // alert(item.uniqueId);

                        if (i != 0 && item.uniqueId != uniqueid) {

                            datahtml += '</tbody></table></div></td></tr>';

                        }

                        if (uniqueid == '' || item.uniqueId != uniqueid) {
                            uniqueid = item.uniqueId;

                            //by raj for correct price
                            itemPrice = '';
                            if (item.size_price != '' && item.size_price != null) { itemPrice = item.size_price; } else { itemPrice = item.itemPrice; }
                            // end

                            datahtml += '<tr><td>' + item.itemName + '<small class="unitprice"><br>(Unit Price: <span class="currsign">' + currencyIcon + '</span>';
                            datahtml += '<span class="price unitpr">price</span>)</small></td>';
                            datahtml += '<td>' + currencyIcon + ' <span class="price itemtotalprice">price</span></td>';
                            datahtml += '<td><div class="orderno" style="display:none">101959</div><div class="quantity">' + quantity + '</div>';
                            datahtml += '<div uniqueId="' + item.uniqueId + '" onclick="updateQuantityNew(this,true);" min="' + item.minPurchase + '" max="' + item.maxPurchase + '" class="inc button">+</div>';
                            datahtml += '<div uniqueId="' + item.uniqueId + '" onclick="updateQuantityNew(this,false);" min="' + item.minPurchase + '" max="' + item.maxPurchase + '" class="dec button">-</div></td>';
                            datahtml += '<td> <div align="center"><img uniqueId="' + item.uniqueId + '" onclick="deleteCartItem(this);" src="images/cart_rem.png" alt="" width="25" /></div></td>';
                            datahtml += '</tr>';

                            datahtml += '<tr><td colspan="4"><div class="otherCharges">';
                            datahtml += '<table data-role="table" data-mode="" class="ui-responsive ui-body-c table-stripe bordertable ui-table"><tbody>';
                            datahtml += '<tr><th width="70%">' + item.itemName + '</th><td>' + currencyIcon + '<span class="price">' + itemPrice + '</span></td></tr>';
                        }
                        datahtml += '<tr><td>' + item.OptionName + '</td><td>' + currencyIcon + '<span class="price">' + optionCharges + '</span></td></tr>';

                    });

                    datahtml += '</tbody></table></div></td></tr></tbody></table></div>';

                    datahtml += '<div id="ordertablePrice"><table data-role="table" data-mode="" class="ui-responsive  ui-table">';
                    datahtml += '<tbody><tr><td width="70%">Convenience Fee</td><td id="convenienceFee">' + currencyIcon + '<span class="price convaynce">' + convenienceFee + '</span></td> </tr>';
					
                    datahtml += '<tr><td width="70%">Out</td><td>' + currencyIcon + '<span class="price out">' + rate + '</span></td></tr>';
                    datahtml += '<tr> <th width="70%">Total Charges (' + currencyIcon + ')</th><th><span class="price total">12.40</span></th> </tr>';
                    datahtml += '</tbody></table></div>';



                    createFoodCartHTML(datahtml);
                    $('.ui-title').html(validationData[0].name);
                    $('div[data-role=page]').css('background-image', baseUrl + validationData[0].mobileBackground);
                    var convenienceFee = validationData[0].convenienceFee;

                    updatePrices();
                    getUserAppereance();
					$('#sessionId').val(sess_id);
                }

            });

        }
        getUserAppereance();
    });

}

function updatePrices() {

    // loop through all order detail div and put unit price value and total price of each item in it's previous row
    $('tr .otherCharges').each(function () {

        var price = 0;
        var previousTr = $(this).closest('tr').prev();
        $(this).find('table tr').each(function () {
            price += parseFloat($(this).find('span.price').html());

        });
        var quantity = previousTr.find('.quantity').html();
        var totalPrice = price * quantity;

        previousTr.find('.unitpr').html(price);
        previousTr.find('.itemtotalprice').html(totalPrice);

    });

    // NOW LOOP THROUGH ALL ITEMS AND make sum of all
    var convayncePrice = parseFloat($('.price.convaynce').html());
    total = 0;

    $('table tr span.price.itemtotalprice').each(function () {

        total += parseFloat($(this).html());

    });

    var tx = parseFloat((total / 100) * parseFloat($('.price.out').html()));
    $('.price.out').html(tx);
	$('#totaltax').val(tx);
    var outPrice = parseFloat($('.price.out').html());

    total += parseFloat(convayncePrice + outPrice);

    total = Math.round(total, 2);
    $('.price.total').html(total);
	
    $("#total").val(total);
}

function createFoodCartHTML(datahtml) {
    $('#main-content').html(datahtml);
    try {
        $("#main-content").trigger('create');
    } catch (e) {
        $("#shocart").listview();
    }
}

function updateQuantityNew(btn, increase) {

    var max = $(btn).attr('max');
    var min = $(btn).attr('min');
    var val = $(btn).closest('td').find('.quantity').html();
    var uniqueId = $(btn).attr('uniqueId');
    if (increase) {

        val = parseInt(val) + 1;

        if (val <= max) {
            $(btn).closest('td').find('.quantity').html(val);
            updateQuantityFinal(uniqueId, val);
        } else {
            $('.error').html('Maximum quantity for this item is ' + max);
            scrollToClass('error');

        }

    } else {
        val = parseInt(val) - 1;
        if (val >= min) {
            $(btn).closest('td').find('.quantity').html(val);
            updateQuantityFinal(uniqueId, val);
        } else {
            $('.error').html('Minuimum quantity for this item is ' + min);
            scrollToClass('error');

        }

    }
}

function scrollToClass(classname) {
    $('.success').hide(); $('.error').hide();
    $('.' + classname).show();
    setTimeout(function () { $('.' + classname).fadeOut(); }, 5000);
    $('html, body').animate({ scrollTop: $("." + classname).position().top }, 2000);

}

function updateQuantityFinal(uniqueId, quantity) {
    // update through ajax
    //alert(uniqueId + " " + quantity);
    var url = baseUrl + 'web/web/updateCartQty/' + uniqueId + '/' + quantity;
    $.mobile.loading('show', { text: 'loading..', textVisible: true, theme: 'a', html: "" });
    doAjaxCall(url, null, false, function (html) {
        if (html == "1") {
            updatePrices();
            $('.success').html('Quantity updated successfully.');
            scrollToClass('success');
        } else {
            $('.error').html('Some error occured');
            scrollToClass('error');
        }
    });
    $.mobile.hidePageLoadingMsg();
}

function deleteCartItem(btn) {
    if (confirm('Are you sure ?')) {
        var uniqueId = $(btn).attr('uniqueId');
        var url = baseUrl + 'web/web/removeCartEntry/' + uniqueId;
        $.mobile.loading('show', { text: 'loading..', textVisible: true, theme: 'a', html: "" });
        doAjaxCall(url, null, true, function (html) {
            if (html == "1") {
                $(btn).closest('tr').next('tr').remove();
                $(btn).closest('tr').remove();
                updatePrices();
                $('.success').html('Item deleted successfully.');
                scrollToClass('success');
            } else {
                $('.error').html('Some error occured');
                scrollToClass('error');
            }
        });
        $.mobile.hidePageLoadingMsg();

    }
}

function submitFoodForm() {
	//alert('coming');
	//alert($('#cash').val());
	//alert($('#paypal').val());
	if($('#cash').val()=="" && $('#paypal').val()=="")
			{
			alert('Please Select Payment Type');
			}
			else
			{
	var payment_type= $('#cash').val();
	//alert(payment_type);
    var valid = true;
	var food_id=$("#food_id").val();
    var url = baseUrl + 'web/web/doDirectFoodPayment/'+ food_id + '/' + sess_id + '/' + payment_type;
    // just to check weather form is valid or not
    if ($('#ordertablePrice').length > 0) {
        //alert("Placing order");
        // perform your validation here
        if (valid) {
            var formData = $('#foodcartform').serialize();
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                success: function (data) {
						if(data != "error")	
						{
						alert("Payment Done Successfully..Your Transaction ID is:"+data);
						$('#foodcartform')[0].reset();
						}
						else
						{
						alert("Something went wrong please try again");
						}
                },
                error: function (data) {
                }
            });
        }
        return false;
    } else {

        alert("Invalid form");
        return false;
   
}   
}
}