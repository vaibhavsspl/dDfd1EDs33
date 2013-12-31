var rand_no=0;
var sess_id=0;
var today = new Date();
var tomorrow = new Date(today.getTime() + 86400000);
rand_no=1+(Math.random() * 6);
if($.cookie("session_id"))
{
sess_id = $.cookie("session_id");
}
else
{
$.cookie("session_id", rand_no, {expires: tomorrow});
sess_id = $.cookie("session_id");
}


function Merchandiseinfo() {


    var featureRelId = getUrlVars()['transferId'];
    var userSiteId 	 = getUrlVars()['touchId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);

    var featureId = 51;
    var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
    var data = '';

    doAjaxCall(url, data, false, function (html) {

        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {
            console.log(html);
            var validateTime;
            $.each(html, function (i, item) {
                if (item.openStatus != undefined && item.openStatus != null) {
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
                        data += '<li><a rel="external"  href="merchandise_product.html?location=' + item.locationId + '&transferId=' + featureRelId + '&touchId=' + userSiteId +'&featureName='+featureName+'" data-transition="flip" >' + item.city + '</a></li>';
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


function Merchandisecategory() {


    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var location = getUrlVars()['location'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
    var cartlink = 'merchandise_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId +'&featureName='+featureName;
    $('#cartlink').attr('href', cartlink);
    var featureId = 50;
    var url = baseUrl + 'web/web/merchcategorysdatainfo/' + location + '/' + featureRelId + '/' + userSiteId;
    var data = '';
    //	alert(url);
    doAjaxCall(url, data, false, function (html) {
        if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {
            console.log(html);
			
            var validateTime;
            $.each(html, function (i, item) {
				//alert(item.openStatus);
				
                if (item.openStatus == 1) {
                    validateTime = item.openStatus;
                }
				else{
					validateTime = 0;
				}
            });
			

            if (validateTime == 1) {
                // for open time
                var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass"><li data-role="list-divider">product</li>';
                var counter = html.length;
				//alert(counter);
                //counter = counter - 2;

                $.each(html, function (i, item) {
				//alert(item.Name);
                    if (counter >= i) {
					
                        data += '<li><a rel="external" href="merchandise_item.html?location=' + location + '&cId=' + item.categoryId + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '" data-transition="slide">' + item.Name + ' (' + item.total_item + ')</a></li>';
                    }
                });
                data += '</ul>';
                $('#main-content').html(data);
                try {
                    $("#aboutclass").listview('refresh');
                } catch (e) {
                    $("#aboutclass").listview();
                }
            }
			else if(validateTime == 0){
			//alert("coming");
			var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass"><li data-role="list-divider">Product</li>';
			
			  $.each(html, function (i, item) {
			  data += '<li><a rel="external" href="merchandise_magento_item.html?location=' + location + '&skuId=' + item.sku + '&productId=' + item.product_id + '&touchId=' + userSiteId + '&featureName='+featureName+'&pname='+item.name +'&transferId=' + featureRelId +'" data-transition="slide">' + item.name + '</a></li>';
			  //alert(item.category_id);
			  });
			   data += '</ul>';
                $('#main-content').html(data);
                try {
                    $("#aboutclass").listview('refresh');
                } catch (e) {
                    $("#aboutclass").listview();
                }
			
			
				
			}
			else {

                // close shop 
                closeShop(html);
            }
            getUserAppereance();


        }
    })
}

function merchandiseMagentoItem(){
//alert(sess_id);
var userSiteId = getUrlVars()['touchId'];
var location =  getUrlVars()['location'];
var featureRelId =  getUrlVars()['transferId']; 
var skuId =  getUrlVars()['skuId']; 
var productId =  getUrlVars()['productId']; 
var featureName = getUrlVars()['pname'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
$("#userSiteId").val(userSiteId);
$("#featureRelId").val(featureRelId);
$("#location").val(location);
$("#productId").val(productId);
 var cartlink = 'merchandise_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId ;
	//alert(cartlink);
    $('#cartlink').attr('href', cartlink);
	
var url = baseUrl + 'web/web/magentoItemsinfo/' + location + '/' + userSiteId + '/' + skuId + '/' + productId;
var url2 = baseUrl + 'web/web/magentoItemImages/' + location + '/' + userSiteId + '/' + skuId + '/' + productId;
var data = '' ;
doAjaxCall(url,data,false,function(html){
//alert('coming');
		if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {
			doAjaxCall(url2,data,false,function(html){
				if ($.isEmptyObject(html)) {
						
				}else{
					 $.each(html, function (i, item) {
						$('.item_img .images-container').append('<img src="'+item.url+'">');
					});
				}
			})
			$("#item_Price").val(html.price);
			var itemPrice 	=	"$"+html.price;
			var itemDesc 	= html.description;
			$("#item_Name").val(itemName);
			$("#itemPrice").html(itemPrice);
			$("#itemDesc").html(itemDesc);
			$("#item_Desc").val(itemDesc);
			
			
			
		
		
			$("#magentoitemform").show();
			}	
	});
}

//purchase magento product
function submitmagentoItem()
{
if($('#stock').val() > 0){
var userSiteId = getUrlVars()['touchId'];
var location =  getUrlVars()['location'];
var featureRelId =  getUrlVars()['transferId']; 
 var url = baseUrl + 'web/web/insertMagentoCart/'+sess_id;
    //var url = baseUrl + 'web/web/insertmerchcarts/1';

    var data = $('#magentoitemform').serialize();

    doAjaxCall(url, data, true, function (html) {
        if (html == 1 || html== 'true') {
            console.log(html);
			var data=$.parseJSON(html);
			var last_id=data.last_id;
			//var last_id=1;
			window.location.href = 'magento_checkout_cart.html?touchId=' + userSiteId + '&location=' + location + '&transferId=' + featureRelId;
			
        } else {
            var holderror = '<div class="error">Oops.. Something went wrong ...!!</div>'
            $('#messege').html(holderror);
            $("#messege").trigger('create');
        }

    });
}else{
	$('#error').html('<p style="border-radius: 3px; background-color: #000; color: #fff; padding: 5px">  Please Select the quantity ..!</p>');
}
}


function merchandisecategoryItem() {

    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var location = getUrlVars()['location'];
    var cartlink = 'merchandise_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
    $('#cartlink').attr('href', cartlink);
    var categoryId = getUrlVars()['cId'];
    var featureId = 50;
    var url = baseUrl + 'web/web/merchcategoryItemsinfo/' + location + '/' + featureRelId + '/' + userSiteId + '/' + categoryId;
    var data = '';

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
                        data += '<li><a rel="external" href="merchandise_item_detail.html?location=' + location + '&iId=' + item.serviceId + '&transferId=' + featureRelId + '&cId=' + categoryId + '&touchId=' + userSiteId +
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

function merchandiseItemInfo() {
	
    var featureRelId 	= getUrlVars()['transferId'];
    var userSiteId 		= getUrlVars()['touchId'];
    var location 		= getUrlVars()['location'];
    var cartlink 		= 'merchandise_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
    $('#cartlink').attr('href', cartlink);
    var itemId			= getUrlVars()['productId'];
    var skuId 			= getUrlVars()['skuId'];
    var featureName 	= getUrlVars()['pname'];
	featureName 		= featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
    var featureId = 50;

    var htmlref = '';
    var data = '';
    var i = 1;

    var url = baseUrl + 'web/web/merchItemdetailsinfo/' + location + '/' + featureRelId + '/' + userSiteId + '/' + skuId;
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
                        htmlref += '<input type="hidden" name="itemId" value="' + itemId + '"><input type="hidden" name="locationId" value="' + location + '"><input type="hidden" name="merchId" id="merchId" value="' + item.merchId + '">';
                        htmlref += '<h3 align="center">' + item.itemName + '</h3><div align="center"></div><br><strong>Detail </strong><br>' + item.description + '<br>';
                    }
                });
              //  getsizeData(htmlref);

            } else {
                /* for close time*/
                closeShop(html)
            }
            getUserAppereance();
        }
    })
	
	
    function getsizeData(htmlref) {

        url1 = baseUrl + 'web/web/merchcategoryItemsizesinfo/' + featureRelId + '/' + userSiteId + '/' + categoryId + '/' + itemId;
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
        });
    }

    function getoptionData(htmlref) {

        url2 = baseUrl + 'web/web/merchcategoryItemoptionsinfo/' + featureRelId + '/' + userSiteId + '/' + categoryId + '/' + itemId;
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
            try {
                $("#main-content").trigger('create');
            } catch (e) {
                $("#main-content").listview();
            }
        });
    }
}

function submitItem(transferId, touchId, location) {
	
	var merch_id=$('#merchId').val();
    var url = baseUrl + 'web/web/insertmerchcarts/'+sess_id;
    //var url = baseUrl + 'web/web/insertmerchcarts/1';

    var data = $('#itemform').serialize();

    doAjaxCall(url, data, true, function (html) {
        if (html == 1) {
            //console.log(data);
			window.location.href = 'merchandise_add_cart.html?transferId=' + transferId + '&touchId=' + touchId + '&location=' + location + '&merch_id=' + merch_id;
        } else {
            var holderror = '<div class="error">Oops.. Something went wrong ...!!</div>'
            $('#messege').html(holderror);
            $("#messege").trigger('create');
        }

    });
}


function merchandiseaddcart() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var location = getUrlVars()['location'];
	var merch_id = getUrlVars()['merch_id'];
	
    var cartlink = 'merchandise_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '&merch_id=' + merch_id;
	//alert(cartlink);
    $('#cartlink').attr('href', cartlink);
    var featureId = 50;
    var data = '';
    data = '<ul data-role="listview" data-dividertheme="d" id="addcart"><li data-role="list-divider" style="text-align:center">YOUR ORDER HAS BEEN ADDED</li></ul><div class="orderButton"><a  data-role="button" rel="external" href="merchandise_category.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '" data-theme="a">Order More</a><a data-role="button" rel="external"  href="merchandise_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '&merch_id=' + merch_id +'" data-theme="b">Check Out</a></div>';
    $('#main-content').html(data);
    $(".orderButton").trigger('create');
    try {
        $("#addcart").listview('refresh');
    } catch (e) {
        $("#addcart").listview();
    }
    getUserAppereance();
}


function merchandisecheckoutcarterror() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var location = getUrlVars()['location'];
    
    var cartlink = 'merchandise_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
    $('#cartlink').attr('href', cartlink);
    var featureId = 50;
    var data = '';
    data = '<ul data-role="listview" data-dividertheme="d" id="cartcheckout"><li data-role="list-divider" style="text-align:center">IT SEEMS CHECKOUT FAILED FOR SOME REASON.<br> PLEASE TRY AGAIN!</li></ul><style>.ui-btn-inner {white-space:normal;}</style><br><br><div id="cartorder"><a rel="external" href="merchandise_category.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '" data-role="button">Thank you for your order. Please allow for 30 minutes for your order to be prepared. Give us a call if you have any questions.</a></div>';
    $('#main-content').html(data);
    $("#cartorder").trigger('create');
    try {
        $("#cartcheckout").listview('refresh');
    } catch (e) {
        $("#cartcheckout").listview();
    }
}



function merchandisecheckoutcartsucess() {
    var featureRelId = getUrlVars()['transferId'];
    var userSiteId = getUrlVars()['touchId'];
    var location = getUrlVars()['location'];
    var cartlink = 'merchandise_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
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



function merchandisecheckoutcart() {
	var featureRelId = getUrlVars()['transferId'];
    var userSiteId 	 = getUrlVars()['touchId'];
    var location 	 = getUrlVars()['location'];
    
	$('#userSiteId').val(userSiteId);
	$('#featureRelId').val(featureRelId);
	$('#location').val(location);
	$('#sess_id').val(sess_id);
    var cartlink = 'merchandise_checkout_cart.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
    $('#cartlink').attr('href',cartlink);
    var featureId = 50;
    var datahtml = '';
    var data = '';
    var validationData;
    url = baseUrl + 'web/web/merchGetPayInfo/' + sess_id + '/' + featureRelId + '/' + userSiteId + '/' + location;
    //alert(url);
    doAjaxCall(url, '', false, function (validationData) {

        if ($.isEmptyObject(validationData)) {
            var dataEmpty = '<div class="error"> Sorry No Item found In You Cart..! </div>';
            $('#main-content').html(dataEmpty);
            $('#main-content').trigger('create');

        } else {
            console.log(validationData);
            datahtml = '<ul data-role="listview" data-dividertheme="d"><li data-role="list-divider" style="text-align:center">Cart</li></ul><br>';
            url2 = baseUrl + 'web/web/magentocartinfo/' + userSiteId + '/' + location + '/' + sess_id+ '/' + featureRelId ;

            //alert(url2);
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
                    var currencyIcon = '$';
                    var convienceFee = '';;
                    // alert(JSON.stringify(validationData));
                    $.each(htmlcart, function (i, item) {

							convienceFee	=	item.convenienceFee;
                            datahtml += '<tr class="otherCharges"><td>' + item.result.name + '<small class="unitprice"><br>(Unit Price: <span class="currsign">' + currencyIcon + '</span>';
                            datahtml += '<span class="price unitpr">'+item.result.price+'</span>)</small></td>';
                            datahtml += '<td>' + currencyIcon + ' <span class="price itemtotalprice">'+item.result.price+'</span></td>';
                            datahtml += '<td><div class="orderno" style="display:none">101959</div><div class="quantity">' + item.quantity + '</div>';
                            datahtml += '<div uniqueId="' + item.cartId + '" onclick="updateQuantityNew(this,true);" min="1" max="1000" class="inc button">+</div>';
                            datahtml += '<div uniqueId="' + item.cartId + '" onclick="updateQuantityNew(this,false);" min="1" max="1000" class="dec button">-</div></td>';
                            datahtml += '<td> <div align="center"><img uniqueId="' + item.cartId + '" onclick="deleteCartItem(this);" src="images/cart_rem.png" alt="" width="25" /></div></td>';
                            datahtml += '</tr>';
					});

                    datahtml += '</tbody></table></div></td></tr></tbody></table></div>';

                    datahtml += '<div id="ordertablePrice"><table data-role="table" data-mode="" class="ui-responsive  ui-table">';
                    datahtml += '<tbody><tr><td width="70%">Convenience Fee</td><td id="convenienceFee">' + currencyIcon + '<span class="price convaynce">'+ convienceFee +'</span></td> </tr>';
					
					$.each(validationData,function(i,taxData){
						datahtml += '<tr><td width="70%">'+taxData.name+'</td><td>' + currencyIcon + '<span class="price out">'+taxData.rate+'</span></td></tr>';
					})
					datahtml += '<tr><td width="70%">Delivery Fee</td><td>' + currencyIcon + '<span class="price delivery">'+validationData[0].deliveryFee+'</span></td></tr>';
                   // datahtml += '<tr><td width="70%">Out</td><td>' + currencyIcon + '<span class="price out">0.00</span></td></tr>';
                    datahtml += '<tr> <th width="70%">Total Charges (' + currencyIcon + ')</th><th><span id = "total_charges" class="price total">12.40</span></th> </tr>';
                    datahtml += '</tbody></table></div>';


					$('#deliveryFee').val(validationData[0].deliveryFee);
                    createmerchandiseCartHTML(datahtml);
                    $('.ui-title').html(validationData[0].name);
                    $('div[data-role=page]').css('background-image', baseUrl + validationData[0].mobileBackground);
                    var convenienceFee = validationData[0].convenienceFee;

                    updatePrices();
                }
                getUserAppereance();
            });

        }
    });
}

//Magento check out
function magnetocheckoutcart()
{
var userSiteId = getUrlVars()['touchId'];
var location = getUrlVars()['location'];
 var featureRelId = getUrlVars()['transferId'];


var data='';
var url = baseUrl + 'web/web/magentocartinfo/' + userSiteId + '/' + location + '/' + sess_id+ '/' + featureRelId ;

doAjaxCall(url,data,false,function(html){

		if ($.isEmptyObject(html)) {
            $('#main-content').html('Sorry we have an Empty data');
        } else {
            //console.log(html);
			$.each(html,function(i,item){
			var con_fee=parseFloat(item.con_fee);
			var name= item.name;
			var merchId =item.merchId;
			var adminEmail = item.adminEmail;
			alert(adminEmail);
			var price=item.price;
			$('#fee').text(con_fee);
			$('#itemlist').text(name);
			$('#itemprice').text(price);
			$('#merch_id').val(merchId);
			$('#item_quantity').text(stock);
			var total_price=price*stock+con_fee;
			$('#total_price').text(total_price);
			$('#total').val(total_price);
			$('#cartId').val(last_id);
			$('#adminEmail').val(adminEmail);
			});	
		}	
	});

}

function updatePrices() {
	
    // loop through all order detail div and put unit price value and total price of each item in it's previous row
    $('tr.otherCharges').each(function () {

        var price = 0;
        
        
            price += parseFloat($(this).find('span.unitpr').html());
			

       
        var quantity = parseInt($(this).find('.quantity').html());
        var totalPrice = price * quantity;

        $(this).find('.unitpr').html(price);
        $(this).find('.itemtotalprice').html(totalPrice);

    });

    // NOW LOOP THROUGH ALL ITEMS AND make sum of all
	var tsx=0;
    var convayncePrice = parseFloat($('.price.convaynce').html());
	var	outPrice	= 0;
	$('.price.out').each(function(){
		var price = 0;
			price += parseFloat($('table span.unitpr').html());
		//alert(price);
		 var tx = parseFloat(price / 100 * parseFloat($(this).html()));
		 tx = tx.toFixed(2);
		$(this).html(tx);
		tsx += parseFloat(tx);
	})
	$('#totaltax').val(tsx);
	
	var delivery	=	parseFloat($('span.price.delivery').html());
	var total = convayncePrice + tsx + delivery ;
	$('table tr span.price.itemtotalprice').each(function () {
			total += parseFloat($(this).html());
	});
	$('#deliveryFee').val(delivery);
	$('.price.total').html(total);
	$("#total").val(total);
}

function createmerchandiseCartHTML(datahtml) {
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
    var url = baseUrl + 'web/web/updateMerchCartQty/' + uniqueId + '/' + quantity;
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
        var url = baseUrl + 'web/web/removeMergeCartEntry/' + uniqueId;
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

function submitmerchandiseForm() {
if($('#cash').val()=="" && $('#paypal').val()=="")
			{
			alert('Please Select Payment Type');
			}
	else
	{
    var valid = true;
	var payment_type=$('#cash').val();
	//alert(payment_type);
	var merch_id=$("#merch_id").val();
	//var form_id=$("#merchandisecartform");
    var url = baseUrl + 'web/web/doDirectMerchandPayment/'+ merch_id + '/' + sess_id + '/' + payment_type;
    // just to check weather form is valid or not
    if ($('#ordertablePrice').length > 0) {
        //alert("Placing order");
        // perform your validation here
        if (valid) {
            var formData = $('#merchandisecartform').serialize();
            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                success: function (data) {
					//alert(data);
					if(data != "error")	
						{
						alert("Payment Done Successfully..Your Transaction ID is:"+data);
						$('#merchandisecartform')[0].reset();
						}
					else
						{
						alert("Something went wrong please try again");
						}
                },
                error: function (data) {
					alert(data);
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
//
function submitmagentoForm() {
	if($('#placeOrderForm').valid()){
			var userSiteId	=	$('#userSiteId').val();
			var location	=	$('#location').val();
			var featureRelId	=	$('#featureRelId').val();
			var formData = $('#placeOrderForm').serialize();
		//	alert(formData);
			var url = baseUrl + 'web/web/doDirectMagentoPayment/';
				doAjaxCall(url, formData , false, function (html) {
					if(html=='paymentdone' || html	== 1){
						window.location.href='merchandise_checkout_cart_sucess.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
					}else{
						window.location.href='marchandise_checkout_cart-failure.html?location=' + location + '&transferId=' + featureRelId + '&touchId=' + userSiteId;
					
					}
				
				})
			}

			
      }