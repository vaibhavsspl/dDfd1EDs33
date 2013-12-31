var DescriptionVoice,EmailVoice,subjectVoice,mobileBackgroundVoice; // variables for voice recording
	function voiceRecording() {
		var featureRelId = getUrlVars()['transferId'];
		var userSiteId = getUrlVars()['touchId'];
		var featureId = getUrlVars()['mId'];
		var featureName = getUrlVars()['featureName'];
		featureName = featureName.replace(/\%20/g,' ');
		featureNameTitle(featureName);
		var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

		var data = '';
		//alert(url);
		doAjaxCall(url, data, false, function (html) {
			if ($.isEmptyObject(html)) {
				$('#main-content').html('Sorry we have an Empty data');
			} else {
				//console.log(html);
				//alert(html);
				$.each(html, function (i,item){
					DescriptionVoice = item.Description;
					EmailVoice = item.Email;
					subjectVoice = item.subject;
					mobileBackgroundVoice = item.mobileBackground;
					//alert('url:'+baseUrl+mobileBackgroundVoice);
					$('body').css('background-image', 'url(' + baseUrl+mobileBackgroundVoice + ')');
					
				})
			}
		});
	}

	function wufoohtml() {
			var featureRelId = getUrlVars()['transferId'];
			var userSiteId = getUrlVars()['touchId'];
			var featureId = getUrlVars()['mId'];
			var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
			var data ='';	
			alert(url);
				doAjaxCall(url, data, false, function (html) {
			if ($.isEmptyObject(html)) {
				$('#main-content').html('Sorry we have an Empty data');
			} else {
				if(html.length==1){
				$.each(html, function (i,item){  
					returnUrl = "index.html";
				 wufooActive(item.url,returnUrl);
				})
				}else{
				var htmlData = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">'
					$.each(html,function(i,item){
					htmlData += '<li><a href="app_wufoo_d.html?itemId='+ item.wuFooId + '&transferId ='+ featureRelId + 'mId='+ featureId +'&touchId=' + userSiteId + '" rel="external" >' + item.name + '</a></li>';
					});
					htmlData +='</ul>';	
				}
				
				$('#main-content').html(htmlData);	
				 try {
                $("#aboutclass").listview('refresh');
				} catch (e) {
					$("#aboutclass").listview();
				}
			}
		}); 
	}
	
	function wufoohtmlbyId() {
			
			var featureRelId = getUrlVars()['transferId'];
			var userSiteId = getUrlVars()['touchId'];
			var featureId = getUrlVars()['mId'];
			var wufooId = getUrlVars()['itemId'];
			var url = baseUrl + 'web/web/getwufooById/' + wufooId + '/' + userSiteId;
			var data ='';	
			alert(url);
				doAjaxCall(url, data, false, function (html) {
			if ($.isEmptyObject(html)) {
				$('#main-content').html('Sorry we have an Empty data');
			} else {
				console.log(html);
				$.each(html, function (i,item){ 
				returnUrl = "app_wufoo.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
				 wufooActive(item.url,returnUrl);
				})
				
				//$('#main-content').html(htmlData);	
			}
		}); 
	}
	function wufooActive(src,exitDone) {
		
         var ref = window.open(src, '_system');
         
         ref.addEventListener('exit', function() {
		 window.location.href = exitDone;
		 });
    }
	
	//Email Photo Tab
	function emailPhoto()
    {
	    
	var featureRelId = getUrlVars()['transferId'];
	var userSiteId = getUrlVars()['touchId'];
	var featureId = getUrlVars()['mId'];
	var url = baseUrl +'web/web/getMenuHtml/'+ featureId + '/' + featureRelId + '/' + userSiteId;
	
	var data = '';
	doAjaxCall(url, data, false, function (html) {
		if ($.isEmptyObject(html)) {
			
			$('#main-content').html('Sorry we have an Empty data');
		} else {
			//console.log(html);
			
			$.each(html, function (i,item){
				DescriptionPhoto = item.Description;
				EmailPhoto = item.Email;
				subjectPhoto = item.subject;
				mobileBackgroundPhoto = item.iphone5Background;
				//alert('url:'+baseUrl+mobileBackgroundPhoto);
				$('body').css('background-image', 'url(' + baseUrl+mobileBackgroundPhoto + ')');
				
			})
		}
	});
	  
    	
    }
 //Pdf Tab
    function pdfTab()
      {
  	//alert("coming");    
  	var featureRelId = getUrlVars()['transferId'];
  	var userSiteId = getUrlVars()['touchId'];
  	var featureId = getUrlVars()['mId'];
	var featureName = getUrlVars()['featureName'];
	featureName = featureName.replace(/\%20/g,' ');
	featureNameTitle(featureName);
  	var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
  	var data ='';	
  	var htmlData='',mobileBackground;
  
  		doAjaxCall(url, data, false, function (html) {
  	if ($.isEmptyObject(html)) {
  		$('#main-content').html('Sorry we have an Empty data');
  	} else {
  		console.log(html);
  		if(html.length==1){
  		htmlData = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
  		$.each(html, function (i,item){  
  			//alert("empty");
  			// onclick="window.open('+item.urlofFile+', '_blank', 'location=yes');"

  			$.each(html,function(i,item){
  				//var pdf_url=;
				mobileBackground = item.mobileBackground;
				if(item.urlOfFile !=''){
				fileUrl	=	item.urlOfFile;
			}else{
				fileUrl	=	baseUrl+item.uploadFile
			}	
  			htmlData += '<li><a href="pdf_d.html?itemUrl='+ fileUrl+'&itemName=' + item.name + '" rel="external" >' + item.name + '</a></li>';
  			});
  			htmlData +='</ul>';	
  			//alert(htmlData);
  		})

  		}else{
  			//pdf_d.html?itemId='+ item.wuFooId + '&transferId ='+ featureRelId + 'mId='+ featureId +'&touchId=' + userSiteId + '
  			// onclick="window.open('+item.urlofFile+', '_blank', 'location=yes');"
  		 htmlData = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">'
  			$.each(html,function(i,item){
  				mobileBackground = item.mobileBackground;
			if(item.urlOfFile !=''){
				fileUrl	=	item.urlOfFile;
			}else{
				fileUrl	=	baseUrl+item.uploadFile
			}	
  			htmlData += '<li><a href="pdf_d.html?itemUrl='+ fileUrl +'&itemName=' + item.name + '" rel="external" >' + item.name + '</a></li>';
  			});
  			htmlData +='</ul>';	
  			//alert(htmlData);
  		}

  		$('#main-content').html(htmlData);	
		$('body').css({ 'background-image': 'url(" '+ baseUrl + mobileBackground + '")' });
  		 try {
        $("#aboutclass").listview('refresh');
  		} catch (e) {
  			$("#aboutclass").listview();
  		}
  	}
  	}); 
	
      }
      
	  
	  
    function pdfById()
      {

  	var pdfUrl = getUrlVars()['itemUrl'];
  	var pdfTitle= getUrlVars()['itemName'];
  	//alert(pdfUrl);
  	//var url = baseUrl + 'web/web/getwufooById/' + wufooId + '/' + userSiteId;
  	//var data ='';	
  	var nav_url="http://docs.google.com/viewer?url="+ pdfUrl ;
  	//alert(nav_url);
  	$("#header_title").html(pdfTitle);
  	window.open(nav_url, '_self','location=yes');
  	//window.location.href=nav_url;
  	//navigator.load.url(pdfUrl);
  	//var ref = window.open(pdfUrl, '_blank');
  	//alert(ref);
  	//pdfActive(pdfUrl,returnUrl);
  	//alert(url);
  		/*doAjaxCall(url, data, false, function (html) {
  	if ($.isEmptyObject(html)) {
  		$('#main-content').html('Sorry we have an Empty data');
  	} else {
  		console.log(html);
  		$.each(html, function (i,item){ 
  		returnUrl = "pdf.html?mId=" + featureId + "&transferId=" + featureRelId + "&touchId=" + userSiteId;
  		 pdfActive(item.src,returnUrl);
  		})
		
  		//$('#main-content').html(htmlData);	
  		}
  	}); */

      }
   	
	/// <reference path="script.js" />

	

var app = {
    podcastPlayer: function () {
        var plyerhtml = '<div id="music-data"></div>';
        plyerhtml += '<div id="player" class="music"><div id="togglePlayer"><span class="ui-icon ui-icon-arrow-u"></span></div>';
        plyerhtml += '<div class="musicBackColor"></div><div class="controls">';
        plyerhtml += '<input type="range" name="time-slider" id="time-slider" value="0" min="0" max="100" data-highlight="true" />';
        plyerhtml += '<div id="media-duration" class="duration">4:00</div>';
        plyerhtml += '<a href="#" id="player-play" class="play ui-corner-all" title="Play / Pause"></a>';
        plyerhtml += '<a href="#" id="player-stop" class="stop ui-corner-all" title="Stop"></a>';
        plyerhtml += ' <span class="songtitles">Songs name</span></div></div></div>';
        return plyerhtml;
    },
    readPodCast: function () {
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];

        var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

        var data = '';
        doAjaxCall(url, data, false, function (html) {
            if ($.isEmptyObject(html)) {
                $('#main-content').html('Sorry we have an Empty data');
            } else {

                var backGroundColor, textColor;
                var data = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="podcastUl">';
                console.log(html);
                var hasSong = false;
                $.each(html, function (i, item) {
                    if (i == 0) {
                        hasSong = true;
                    }
                    var maindescription = item.summary.replace(/<(?:.|\n)*?>/gm, '');
                    if (maindescription.length > 300) {
                        maindescription = maindescription.substring(0, 300) + '...';
                    }
                    data += '<li onclick="app.playMusic(this);" mp3url="' + item.guid + '"><a>';
                    data += '<img src="' + item.mainimage + '" title="' + item.title + '"/>';
                    data += '<h3>' + item.title + '</h3>';
                    data += ' <p>' + maindescription + '<br><span>' + item.date + '</span></p>';
                    data += '  </a></li>';

                    $('#main-content').css({ 'background-color': '#' + backGroundColor, 'color': '#' + textColor });
                })
                data += '</ul>';
                data += app.podcastPlayer();

                $('#main-content').html(data);
                $('#main-content').trigger('create');
                ready();
                if (hasSong) {
                    var frst = $('ul#podcastUl li').eq(0);
                    $.mobile.hidePageLoadingMsg();
                    app.playMusic(frst);
                }
                try {
                    $("#podcastUl").listview('refresh');
                } catch (e) {
                    $("#podcastUl").listview();
                }

            }
            putFeatureName(featureRelId, userSiteId);
            getUserAppereance();
        });

    },
    playMusic: function (btn) {

        var mp3 = $(btn).attr('mp3url');
        var title = $(btn).find('h3').html();

        if (!isNullOrEmpty(mp3)) {
            $("#songurl").val(mp3);
            $("#songtitle").val(title);
            $("#songArtist").val('ankush jain');
            isPlaying = "play";
            $("#player-play").trigger('click');
        }
    },
    getReservationHTML: function () {
        deleteCookie("servicesJSON");
        deleteCookie("locationJSON");
        deleteCookie("timeJSON");

        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

        var schedulePageUrl = 'app_sched_reservation.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;

        var data = '';
        data += '<a data-role="button" data-theme="a" data-ajax="false" href="' + schedulePageUrl + '">Scheduale reservation</a>';
        data += '<ul id="liUpcomingRes" data-role="listview" data-divider-theme="f" data-inset="true">';
        data += '<li data-theme="a">Upcoming reservations</li>';
        //data += '<li data-theme="c"> Upcoming res 1</li>';
        data += '</ul>';
        data += '<div data-role="navbar" data-iconpos="top"><ul>';
        data += '<li><a onclick="app.reservationHistory()" data-transition="fade" data-theme="" data-icon="grid">Reservation History</a> </li>';
        data += '<li><a onclick="app.accountSettings()" data-transition="fade" data-theme="" data-icon="info">Account Setting</a></li></ul></div>';

        $('#main-content').html(data);
        $('#main-content').trigger('create');
        app.res_scheduledinfo();
        getUserAppereance();
        app.showLoginLogout();

    },
    getScheduleReservation: function () {
        var duration;
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
        var i = 0;
        i = parseInt(i);

        //<li data-theme="c"> Upcoming res 1</li>
        var selectedLocation = '';
        var servicesJSON = getCookie("servicesJSON");
        var locationJSON = getCookie("locationJSON");
        var timeJSON = getCookie("timeJSON");

        if (!isNullOrEmpty(locationJSON)) {
            var obj = JSON.parse(locationJSON);
            console.log(obj);

            i++;
            //selectedLocation += '<li data-theme="c"> location found</li>';
            selectedLocation += '<li id="liLocation" locationid="' + obj.id + '" data-theme="c"><p>' + obj.address1 + '</p><p>' + obj.address2 + '</p><p>' + obj.city + '</p></li>';
        }

        var selectedService = '';
        if (!isNullOrEmpty(servicesJSON) && i == 1) {
            var obj = $.parseJSON(servicesJSON);
            duration = obj.duration;
            console.log(obj);
            i++;
            //selectedService += '<li data-theme="c"> SERVICES found</li>';
            selectedService += '<li reservationId="' + obj.reservationId + '" currency="' + obj.currency + '" reservationfee="' + obj.reservationfee + '" id="liService" itemid="' + obj.itemid + '" data-theme="c">' + obj.servicename + '</li>';
        }

        var selectedTime = '';


        if (!isNullOrEmpty(timeJSON) && i == 2) {
            i++;
            //selectedTime += '<li data-theme="c"> time found</li>';
            var obj = $.parseJSON(timeJSON);
            console.log(obj);
            selectedTime += '<li id="liTime" data-theme="c">' + obj.reservationTime + '</li>';
        }

        var locationPageUrl = 'app_location.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;
        var servicenPageUrl = 'app_services.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;
        var timePageUrl = 'app_time.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId + '&time=' + duration;
        var data = '';
        data += '<ul data-role="listview" data-divider-theme="f" data-inset="true">';
        data += '<li data-theme="a"><a data-ajax="false" href="' + locationPageUrl + '">Select a location</a></li>';
        data += selectedLocation;
        data += '</ul>';
        if (i >= 1) {
            data += '<ul data-role="listview" data-divider-theme="f" data-inset="true">';
            data += '<li data-theme="a"><a data-ajax="false" href="' + servicenPageUrl + '">Select a service</a></li>';
            if (i > 1) {
                data += selectedService;
            }
            data += '</ul>';

            if (i >= 2) {
                data += '<ul data-role="listview" data-divider-theme="f" data-inset="true">';
                data += '<li data-theme="a"> <a data-ajax="false" href="' + timePageUrl + '">Select timing</a></li>';
                if (i > 2) {
                    data += selectedTime;
                }
                data += '</ul>';
            }
            if (i == 3) {
                data += "<input type='button' featureRelId=" + featureRelId + " data-role='button' onclick='app.makeReservation()' value='confirm' />";
            }

        }
        $('#main-content').html(data);
        $('#main-content').trigger('create');

        getUserAppereance();

    },
    getLocations: function () {
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];

        var url = baseUrl + 'web/web/reservationlocationinfo/' + featureRelId + '/' + userSiteId;

        doAjaxCall(url, null, false, function (html) {
            console.log(html);
            if ($.isEmptyObject(html)) {
                $('#main-content').html('Sorry we have an Empty data');
            } else {


                var data = '';

                if (html.length > 0) {
                    var openStatus = html[html.length - 1].openStatus;
                    if (openStatus == "1") {
                        data += '<ul  data-role="listview" data-divider-theme="f" data-inset="true" id="aboutclass">';
                        data += '<li data-theme="a"><a>select a location</a></li>';
                        $.each(html, function (i, item) {
                            if (isNullOrEmpty(item.openStatus)) {

                                data += '<li locationid="' + item.locationId + '" address1="' + item.address1 + '"  address2="' + item.address2 + '" city="' + item.city + '" onclick="app.res_addlocation(this)"><a>';
                                data += '<p>' + item.address1 + '</p>';
                                data += '<p>' + item.address2 + '</p>';
                                data += ' <p>' + item.city + ' ' + item.state + '</p>';
                                if (!isNullOrEmpty(item.zip)) {
                                    data += ' <p>' + item.zip + '</p>';
                                }
                                data += '</a></li>';
                            }

                        });
                        data += '</ul>';
                    } else {
                        alert("store is closed");
                    }

                }

                $('#main-content').html(data);
                try {
                    $("#aboutclass").listview('refresh');
                } catch (e) {
                    $("#aboutclass").listview();
                }

            }
            //putFeatureName(featureRelId, userSiteId);
            // getUserAppereance();
        });

    },
    getServices: function () {
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];

        var url = baseUrl + 'web/web/reserservicedetailinfo/' + featureRelId + '/' + userSiteId;

        doAjaxCall(url, null, false, function (html) {
            console.log(html);
            if ($.isEmptyObject(html)) {
                $('#main-content').html('Sorry we have an Empty data');
            } else {
                var data = '';
                if (html.length > 0) {
                    var openStatus = html[html.length - 1].openStatus;
                    if (openStatus == "1") {
                        data += '<ul  data-role="listview" data-divider-theme="f" data-inset="true" id="aboutclass">';
                        data += '<li data-theme="a"><a>select a service</a></li>';
                        $.each(html, function (i, item) {
                            if (isNullOrEmpty(item.openStatus)) {
                                data += '<li reservationId="' + item.reservationId + '" duration="' + item.duration + '" currency="' + item.currency + '"  reservationId="' + item.reservationId + '" reservationId itemid="' + item.ItemId + '" serviceName="' + item.serviceName + '"  reservationFee="' + item.reservationFee + '">';
                                data += '<div><h3>' + item.serviceName + '</h3></div><div><input onclick="app.res_addService(this)" type="button" data-role="button" value="book it" /></div>';
                                data += '<p><br><span>' + item.currency + ' ' + item.reservationFee + '</span></p>';
                                data += '</li>';

                            }
                        });

                        data += '</ul>';
                    } else {

                        alert("store is closed");
                    }
                }
                $('#main-content').html(data);
                try {
                    $("#aboutclass").listview('refresh');
                } catch (e) {
                    $("#aboutclass").listview();
                }

            }
            putFeatureName(featureRelId, userSiteId);
            getUserAppereance();
        });

    },
    getTimings: function () {
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var duration = getUrlVars()['time'];


        if (!isNullOrEmpty(duration)) {
            duration = parseInt(duration);
            if (!isNaN(duration)) {
                duration = 15;
            }
        }

        var url = baseUrl + 'web/web/getttimeframe/' + duration;
        doAjaxCall(url, null, false, function (html) {
            console.log(html);
            if ($.isEmptyObject(html)) {
                $('#main-content').html('Sorry we have an Empty data');
            } else {
                var data = '';
                if (html.length > 0) {
                    data += '<ul  data-role="listview" data-divider-theme="f" data-inset="true" id="aboutclass">';
                    data += '<li data-theme="a"><a>select a time</a></li>';
                    $.each(html, function (i, item) {
                        if ((i + 1) < html.length) {
                            data += '<li onclick="app.res_addTime(this)">';
                            data += html[i] + ' - ' + html[i + 1];
                            data += '</li>';

                        }

                    });

                    data += '</ul>';
                }
                $('#main-content').html(data);
                try {
                    $("#aboutclass").listview('refresh');
                } catch (e) {
                    $("#aboutclass").listview();
                }

            }

            getUserAppereance();
        });

        // extra

        //var date = new Date(), interval = duration, arr = [];
        //for (var i = 0; i < 10; i++) {
        //    date.setMinutes(date.getMinutes() + interval);
        //    arr.push(date.getHours() + '.' + date.getMinutes());
        //}
        //var data = '<ul  data-role="listview" data-divider-theme="f" data-inset="true" id="aboutclass">';
        //data += '<li data-theme="a"><a>select a time</a></li>';
        //for (var i = 0; i < 10; i++) {

        //    data += '<li onclick="app.res_addTime(this)">';
        //    data += arr[i];
        //    data += '</li>';
        //}
        //data += "</ul>";
        //$('#main-content').html(data);
        //try {
        //    $("#aboutclass").listview('refresh');
        //} catch (e) {
        //    $("#aboutclass").listview();
        //}
    },
    getReservationUser: function () {
        var reservationUser = getCookie("reservationUserId");
        if (!isNullOrEmpty(reservationUser)) {

            return reservationUser;
        } else {
            return null;
        }
    },
    accountSettings: function () {

        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var loginPageUrl = 'app_reserve_login.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;
        var accountSettingsPageUrl = 'app_reserve_register.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;
        if (app.getReservationUser() != null) {
            window.location.href = accountSettingsPageUrl;
        } else {
            window.location.href = loginPageUrl;

        }
    },
    reservationHistory: function () {
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var loginPageUrl = 'app_reserve_login.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;
        var reservaionHistoryPageUrl = 'app_reservaion_history.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;
        if (app.getReservationUser() != null) {
            window.location.href = reservaionHistoryPageUrl;
        } else {
            window.location.href = loginPageUrl;

        }
    },
    reservationLogin: function () {
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var url = baseUrl + 'web/web/reservationloginuser/' + featureRelId + '/' + userSiteId;
        var reservationPageUrl = 'app_reservation.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;
        var paymentPageUrl = 'app_res_payment.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;

        var email = $('#txtEmail').val();
        var password = $('#txtPassword').val();
        var data = { email: email, password: password };
        doAjaxCall(url, data, false, function (html) {
            console.log(html);
            if (html == "0") {
                alert("Login failed");
            } else {
                var registerId = html[0].registerId;
                deleteCookie("reservationUserId");
                setCookie("reservationUserId", registerId);
                if (getCookie("cart") != null) {
                    window.location.href = paymentPageUrl;
                } else {
                    window.location.href = reservationPageUrl;
                }

            }
        });
    },
    reservationRegister: function () {
        var update = false;
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var url = baseUrl + 'web/web/insert_register_reser/' + featureRelId + '/' + userSiteId;
        var reservationPageUrl = 'app_reservation.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;
        var paymentPageUrl = 'app_res_payment.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;
        if (app.getReservationUser() != null) {
            update = true;
            var registerid = app.getReservationUser();
            url = baseUrl + 'web/web/update_register_reser/' + featureRelId + '/' + userSiteId + '/' + registerid;

            // change text and hide login button 
        }
        var email = $('#txtEmail').val();
        var password = $('#txtPassword').val();
        var fname = $('#txtFname').val();
        var lname = $('#txtLname').val();
        var phone = $('#txtPhone').val();

        var confpassword = $('#txtconfirmpassword').val();
        var data = { email: email, password: password, fname: fname, lname: lname, phone: phone, confpassword: confpassword };
        doAjaxCall(url, data, false, function (html) {
            console.log(html);

            if (html == "0") {
                alert("Registeration failed");
            } else {
                if (update) {
                    window.location.href = reservationPageUrl;
                } else {
                    var registerId = html[0].registerId;
                    setCookie("reservationUserId", registerId);
                    if (getCookie("cart") != null) {
                        window.location.href = paymentPageUrl;
                    } else {
                        window.location.href = reservationPageUrl;
                    }
                }
            }

        });
    },
    showLoginLogout: function () {

        if ($('a.anchorlogin').length > 0) {
            var anchorButton = $('a.anchorlogin');
            if (app.getReservationUser() != null) {
                anchorButton.attr('onclick', 'app.res_logout()');
                anchorButton.find('span.ui-btn-text').html('Logout');
            } else {
                anchorButton.attr('onclick', 'app.res_login()');
                anchorButton.find('span.ui-btn-text').html('Login');
            }
        }
    },
    res_logout: function () {
        deleteCookie("reservationUserId");
        app.showLoginLogout();
    },
    res_login: function () {
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var loginPageUrl = 'app_reserve_login.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;
        window.location.href = loginPageUrl;
    },
    res_register: function () {
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var registerPageUrl = 'app_reserve_register.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;
        window.location.href = registerPageUrl;
    },
    res_addlocation: function (btn) {

        deleteCookie("servicesJSON");
        deleteCookie("locationJSON");
        deleteCookie("timeJSON");
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var app_sched_reservation = 'app_sched_reservation.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;


        var address1 = $(btn).attr('address1');
        var address2 = $(btn).attr('address2');
        var locationid = $(btn).attr('locationId');
        var city = $(btn).attr('city');
        var res_locationName = address1 + " ," + address2 + " ," + city;
        var resLocation = '{ "id":"' + locationid + '", "address1":"' + address1 + '", "address2":"' + address2 + '" ,"city":"' + city + '"}';
        setCookie("locationJSON", resLocation);

        window.location.href = app_sched_reservation;
    },
    res_addService: function (btn) {
        deleteCookie("servicesJSON");
        deleteCookie("timeJSON");
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var app_sched_reservation = 'app_sched_reservation.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;

        var reservationId = $(btn).closest('li').attr('reservationId');
        var servicename = $(btn).closest('li').attr('servicename');
        var currency = $(btn).closest('li').attr('currency');
        var reservationfee = $(btn).closest('li').attr('reservationfee');
        var itemid = $(btn).closest('li').attr('itemid');
        var duration = $(btn).closest('li').attr('duration');
        var resServices = '{"servicename":"' + servicename + '", "currency":"' + currency + '", "itemid": "' + itemid + '", "reservationfee":"' + reservationfee + '","duration":"' + duration + '", "reservationId":"' + reservationId + '"}';
        setCookie("servicesJSON", resServices);
        window.location.href = app_sched_reservation;
    },
    res_addTime: function (btn) {
        deleteCookie("timeJSON");
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var app_sched_reservation = 'app_sched_reservation.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;


        var reservationTime = $(btn).html();
        var timeJSON = '{"reservationTime":"' + reservationTime + '"}';
        setCookie("timeJSON", timeJSON);
        window.location.href = app_sched_reservation;
    },
    fillUserInfo: function () {
        if (app.getReservationUser() != null) {

            $('.header-content h1').html('Account Settings');
            $('form input[type=submit]').prev('span').find('span').html('Update');
            $('.header-content .ui-btn-right').remove();

            var featureRelId = getUrlVars()['transferId'];
            var userSiteId = getUrlVars()['touchId'];
            var featureId = getUrlVars()['mId'];
            var registerid = app.getReservationUser();
            var url = baseUrl + 'web/web/getreservationuserinfos/' + featureRelId + '/' + userSiteId + '/' + registerid;
            doAjaxCall(url, null, false, function (html) {
                console.log(html);
                $.each(html, function (i, item) {
                    if (i == 0) {
                        var email = $('#txtEmail').val(item.email);
                        $('#txtEmail').textinput('disable');

                        $('#txtFname').val(item.fname);
                        $('#txtLname').val(item.lname);
                        $('#txtPhone').val(item.phone);
                        $('#txtPassword').val('0');
                        $('#txtconfirmpassword').val('1');
                    }
                });

            });
        }

    },
    res_history: function () {

        var registerid = app.getReservationUser();
        if (registerid != null) {

            var featureRelId = getUrlVars()['transferId'];
            var userSiteId = getUrlVars()['touchId'];
            var featureId = getUrlVars()['mId'];
            var url = baseUrl + 'web/web/reservationhistoryinfo/' + registerid;
            doAjaxCall(url, null, false, function (html) {
                console.log(html);
                if ($.isEmptyObject(html)) {
                    $('#main-content').html('No data found');
                } else {
                    var data = '';
                    if (html.length > 0) {

                        data += '<ul  data-role="listview" data-divider-theme="f" data-inset="true" id="aboutclass">';
                        data += '<li data-theme="a"><a>select a service</a></li>';
                        $.each(html, function (i, item) {

                            data += '<li>';
                            data += '<div><h3>history data need to be read</h3></div>';

                            data += '</li>';

                        });

                        data += '</ul>';
                    }
                }
                $('#main-content').html(data);
                try {
                    $("#aboutclass").listview('refresh');
                } catch (e) {
                    $("#aboutclass").listview();
                }
                getUserAppereance();
            });
        }
    },
    res_scheduledinfo: function () {
        var data = '';
        var registerid = app.getReservationUser();
        if (registerid != null) {

            var featureRelId = getUrlVars()['transferId'];
            var userSiteId = getUrlVars()['touchId'];
            var featureId = getUrlVars()['mId'];

            var url = baseUrl + 'web/web/reservationscheduledinfo/' + registerid;

            doAjaxCall(url, null, false, function (html) {
                console.log(html);
                if ($.isEmptyObject(html)) {
                    // $('#main-content').html('No data found');

                    data += '<li data-theme="c">No upcoming reservation found</li>';

                } else {

                    if (html.length > 0) {
                        $.each(html, function (i, item) {
                            data += '<li data-theme="c"> Upcoming res text need to be read</li>';
                        });

                    } else {
                        data += '<li data-theme="c">No upcoming reservation found</li>';
                    }
                }
            });
        } else {
            data += '<li data-theme="c">No upcoming reservation found</li>';
        }
        $('ul#liUpcomingRes').append(data);
        try {
            $("#liUpcomingRes").listview('refresh');
        } catch (e) {
            $("#liUpcomingRes").listview();
        }
    },
    makeReservation: function () {
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var loginPageUrl = 'app_reserve_login.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;
        var paymentPageUrl = 'app_res_payment.html?transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId;

        var locationId = $('#liLocation').attr('locationid');
        var serviceId = $('#liService').attr('itemid');
        var timeString = $('#liTime').html();
        var currency = $('#liService').attr('currency');
        var reservationfee = $('#liService').attr('reservationfee');
        var currency = $('#liService').attr('currency');
        var serviceName = $('#liService').html();
        var reservationId = $('#liService').attr('reservationId');
        var reservationfee = $('#liService').attr('reservationfee');
        var cart = '{ "reservationId":  "' + reservationId + '", "locationId": "' + locationId + '", "serviceId": "' + serviceId + '", "timestr":  "' + timeString + '", "featureRelId":  "' + featureRelId + '", "currency":"' + currency + '", "serviceName":"' + serviceName + '", "price":"' + reservationfee + '" }';
        setCookie("cart", cart);
        if (app.getReservationUser() != null) {
            window.location.href = paymentPageUrl;

        } else {
            window.location.href = loginPageUrl;

        }


    },
    loadPaymentInfo: function () {
        var cart = getCookie("cart");
        console.log(cart);
        if (app.getReservationUser() != null && cart != null) {
            var html = '';
            var obj = $.parseJSON(cart);
            console.log(obj);
            var locationId = obj.locationId;
            var serviceId = obj.serviceId;
            var featureRelId = obj.featureRelId;
            var timestr = obj.timestr;
            var currency = obj.currency;
            var reservationId = obj.reservationId;
            var serviceName = obj.serviceName;
            var registerid = app.getReservationUser();
            var price = obj.price;
            var address = 'test address';

            var data = '<ul data-role="listview" data-divider-theme="f" data-inset="true">';
            data += '<li data-theme="a">Reservation Payment</li>';
            data += '<li>';
            data += '<br><p> Service Name : ' + serviceName + '</p>';
            data += '<p> Amount : ' + currency + ' ' + price + '</p>';
            data += '<p>';
            data += '<form id="resform">';
            data += '<input type="hidden" name="reservationId" value="' + reservationId + '" />';
            data += '<input type="hidden" name="registerId" value="' + registerid + '" />';
            data += '<input type="hidden" name="locationId" value="' + locationId + '" />';
            data += '<input type="hidden" name="location" value="' + address + '" />';
            data += '<input type="hidden" name="serviceId" value="' + serviceId + '" />';
            data += '<input type="hidden" name="serviceName" value="' + serviceName + '" />';
            data += '<input type="hidden" name="paymentAmt" value="' + price + '" />';
            data += '<input type="hidden" name="currency" value="' + currency + '" />';
            data += '<input type="hidden" name="time" value="' + timestr + '" />';
            data += '<input type="hidden" name="featureRelId" value="' + featureRelId + '" />';
            data += '<a data-role="button" pay="paypal" onclick="app.confirmPayment(this)">Pay By PayPal</a><a pay="authorize.net" onclick="app.confirmPayment(this)" data-role="button">Pay By Athorize.Net</a>';
            data += '</form></p>';
            data += '</li></ul>';

            $('#main-content').html(data);
            try {

                $('#main-content').trigger('create');
            } catch (e) {
                $('#main-content').trigger('create');
            }
            getUserAppereance();
        }
    },
    confirmPayment: function (btn) {
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var userSiteId = getUrlVars()['touchId'];
        var url = baseUrl + 'web/web/insertreserlisthtml/' + featureRelId + '/' + userSiteId;
        // serialize form
        if (confirm("are you sure you want to pay for this service ?")) {
            $.ajax({
                url: url,
                type: "post",
                data: $('#resform').serialize(),
                success: function (data) {
                    alert("success");
                    if (data == "true") {
                        // redirect to success page
                    } else {
                        // redirect to error page
                    }
                    
                
                },
                error: function (data) {
                    alert("failure");
                    // redirect to error page
                   
                }
            });
        }
    },
    getEventTabV2: function () {

        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;

        var data = '';
        doAjaxCall(url, data, false, function (html) {
            console.log(html);
            if ($.isEmptyObject(html)) {
                $('#main-content').html('Sorry we have an info Tab data');
            } else {
                var data = '';
                data += '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">';
                var month = '';
                var error = '';
                eventJsonTemp = html;
                $.each(html, function (i, item) {
                    if (i == 0) { addBackground(item); }
                    if (month != item.month) {
                        month = item.month;
                        data += '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-d ui-first-child">' + item.month + ' ' + item.year + '</li>';
                    }
                    if (i % 2 == 0) {
                        className = 'evenbg';
                    } else {
                        className = 'oddbg';
                    }
                    data += '<li  class="' + className + '" ><a href="app_eventdetail.html?eventId=' + item.eventId + '&transferId=' + featureRelId + '&touchId=' + userSiteId + '&mId=' + featureId + '" rel="external"><img src="images/Event_icon.png" alt=""><h3>' + item.name + '</h3><span class="ui-li-month">' + item.month + '</span><span class="ui-li-day">' + item.date + '</span></a></li>';
                    if (item.error != '') {

                        error = item.error;
                    }
                });
                data += '</ul>';
            }
            $('#main-content').html(data);
            if (error) {
                $('#main-content').html(error);
            }
            try {
                $("#aboutclass").listview('refresh');
            } catch (e) {
                $("#aboutclass").listview();
            }
            getUserAppereance();
        });

    },
    getEventTabDetail: function () {
        var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
        var eventId = getUrlVars()['eventId'];
        //var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
        var url = baseUrl + 'web/web/getEvent2detailbyid/' + eventId;
        var galleryurl = baseUrl + 'web/web/getevent2galarydetails/' + eventId;

        var data = '';
        doAjaxCall(url, data, false, function (html) {
            console.log(html);
            if ($.isEmptyObject(html)) {
                $('#main-content').html('<div style="padding:10px;">Sorry ! No data found</div>');
            } else {
                var data = '';
                $.each(html, function (i, item) {
                    if (i == 0) {

                        if (item.name != null && item.name != '') {
                            $('div[data-role=header] h1').html(item.name);
                        }
                        if (item.headerImage != null && item.headerImage != '') {
                            data += '<img src="' + item.headerImage + '" width="100%" height="200">';
                        } else {
                            data += '<img src="images/010.jpg" width="100%" height="200">';
                        }
                        data += '<div class="tabcontainer"><div data-role="navbar">';
                        data += '<ul class="tabs"> <li><a href="#tab1">About</a> </li> <li><a href="#tab2">Comments</a> </li><li><a href="#tab3">Attend </a></li><li><a href="#tab4">Gallery</a></li>';
                        data += '</ul>';
                        data += '</div>';
                        data += '<div class="tab-body"> <div class="tab-content ui-content ui-body-c" id="tab1">Event desscritpin';
                        data += '<p>' + item.description + '</p>';
                        data += '</div>';

                        data += '<div class="tab-content  ui-content ui-body-c" id="tab2">';
                        data += '<ul data-role="listview" data-theme="d" class="nowrap clearfix" data-divider-theme="d" id="albumDetails ">';
                        data += '<li>Sorry No comments!!!</li>';
                        data += '<li class="clearfix">';
                        data += '<img src="images/008.png" class="media_poster">';
                        data += '<h3>Avery Walker</h3><hr>';
                        data += '<p>Sure, lets plan on meeting at Highland Kitchen at 8:00 tonight. Cant wait! </p>';
                        data += '<p class="ui-li-aside"><strong>1 day ago</strong></p>';
                        data += '<p class="pull-right" data-role="button" data-theme="e" data-mini="true">Reply</p>';
                        data += '</li></ul></div>';

                        data += '<div class="tab-content  clearfix ui-content ui-body-c" id="tab3">0 people going';
                        data += '<span class="ui-corner-all pull-right" data-mini="true" data-theme="a" data-role="button">i am going</span>';

                        data += '</div>';
                        data += '<div class="tab-content ui-content ui-body-c" id="tab4">';

                        doAjaxCall(galleryurl, null, false, function (html1) {
                            console.log(html1);
                            if ($.isEmptyObject(html1)) {
                                $('#tab4').html('<div style="padding:10px;">Photos not found</div>');
                            } else {
                                var photoHtml = '';
                                if (html1.length > 0) {

                                    photoHtml += '<div class="clearfix">';
                                    photoHtml += 'Share Photo<span class="ui-corner-all bottom-margin-xxl pull-right" data-mini="true" data-theme="a" data-role="button">Add a Photo</span>';
                                    photoHtml += '</div>';
                                    photoHtml += '<ul data-role="listview" data-inset="false">';
                                    photoHtml += '<li class=""><a href="app_eventGallery.html?eventid='+eventId+'" rel="external"><h3>' + html1.length + ' photos added</h3>';
                                    photoHtml += '</a></li></ul>';
                                } else {
                                    photoHtml = '<div style="padding:10px;">Photos not found</div>';
                                }
                                $('#tab4').html(photoHtml);
                            }
                            $('div[ data-role=page]').trigger('create');
                        });
                        data += '</div></div></div>';
                        $('#main-content').html(data);
                    }
                });

                var data2 = '<div data-role="footer" class="clearfix" data-position="fixed">';
                data2 += '<a href="#share" data-position-to="window" data-transition="slideup" data-rel="popup" class="pull-right padding-x" data-role="none">';
                data2 += '<img src="images/comments.png" alt="" />';
                data2 += '</a></div>';

                data2 += '<div data-role="popup" id="share" data-overlay-theme="a" data-dismissible="false" data-theme="c" class="ui-corner-all" style="width: 320px;">';
                data2 += '<div data-role="header" data-theme="b" class="ui-corner-top "><h5 class="nowrap">Choose Login Account</h5></div>';
                data2 += '<div data-role="content" data-theme="d" class="ui-corner-bottom ui-content">';
                data2 += '<a href="" data-role="button" data-theme="b">Facebook</a>';
                data2 += '<a href="" data-role="button" data-theme="b">Twitter</a>';
                data2 += '<a href="" data-role="button" data-theme="a" data-rel="back">Cancel</a>';
                data2 += '</div></div>';
                $('div[ data-role=page]').append(data2);


            }
            $('#main-content').html(data);
            $('div[ data-role=page]').trigger('create');
            createEventDetailPage();
            getUserAppereance();
        });

    },
    eventGallery: function () {
     
        var eventId = getUrlVars()['eventid'];
        //var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
       // var url = baseUrl + 'web/web/getEvent2detailbyid/' + eventId;
        var galleryurl = baseUrl + 'web/web/getevent2galarydetails/' + eventId;

        doAjaxCall(galleryurl, null, false, function (html) {
            console.log(html);
            if ($.isEmptyObject(html)) {
                $('#main-content').html('<div style="padding:10px;">Photos not found</div>');
            } else {
              
                   var photoHtml = '<ul id="Gallery" class="gallery">';
                   $.each(html, function (i, item) {
                       var photourl = baseUrl + item.eventImage;
                       photoHtml += ' <li><a href="' + photourl + '"><img src="' + photourl + '" alt="" /></a></li>';
                   
                });
                photoHtml += '</ul>';
                $('#main-content').html(photoHtml);


            }
            bindPlugin();
            getUserAppereance();
        });

        },
		//Around Us
		aroundUs:function(List){
		var featureRelId = getUrlVars()['transferId'];
        var userSiteId = getUrlVars()['touchId'];
        var featureId = getUrlVars()['mId'];
		var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
		var data = '';
		
		doAjaxCall(url, data, false, function(html){
		 if ($.isEmptyObject(html)) {
                $('#main-content').html('Sorry we have an Empty data');
            }else{
			
				$('#map_canvas').gmap().bind('init', function(evt, map){ 
					$.each( html, function(i, m) {
						$('#map_canvas').gmap('addMarker', { 'position': new google.maps.LatLng(m.latitude, m.longitude), 'bounds':true } );
					});
				});
			}
		//	putFeatureName(featureRelId, userSiteId);
            getUserAppereance();
		});
	}
}

function qrCouponList()
    {
		 //alert("coming");    
		 var featureRelId = getUrlVars()['transferId'];
		 var userSiteId = getUrlVars()['touchId'];
		 var featureId = getUrlVars()['mId'];
		 var url = baseUrl + 'web/web/getMenuHtml/' + featureId + '/' + featureRelId + '/' + userSiteId;
		 var data =''; 
		 //alert(url);
		  doAjaxCall(url, data, false, function (html) {
		 if ($.isEmptyObject(html)) {
		  $('#main-content').html('Sorry we have an Empty data');
		 } else {
		   //alert(html);
		   //pdf_d.html?itemId='+ item.wuFooId + '&transferId ='+ featureRelId + 'mId='+ featureId +'&touchId=' + userSiteId + '
		   // onclick="window.open('+item.urlofFile+', '_blank', 'location=yes');"
		  var htmlData = '<ul data-role="listview" data-inset="false" data-divider-theme="d" id="aboutclass">'
		   $.each(html,function(i,item){
			//var pdf_url=;
		   htmlData += '<li><a href="QR_coupon.html?qrCode='+ item.qrCode +'&hrsCheck=' + item.hrsBeforeNextCheckIn + '&checkInTargetAmt='+item.checkInTargetAmt+'" rel="external" >' + item.couponName + '</a></li>';
		   });
		   htmlData +='</ul>'; 
		  }
		 
		  
		  $('#main-content').html(htmlData); 
		   try {
			  $("#aboutclass").listview('refresh');
		  } catch (e) {
		   $("#aboutclass").listview();
		  }
		 
		 }); 
    }	
	function qrcouponValidate()
	{
	
	}

	

	
	
