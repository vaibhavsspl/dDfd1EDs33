/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var push = {
    // Application Constructor
    initialize: function () {
        getLicenceData();
        this.bindEvents();

    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        $('.header-content .back').hide();

        $("body").niceScroll();
        push.receivedEvent('deviceready');

    },
    tokenHandler: function (msg) {
        //alert("Token Handler " + msg);
        console.log("Token Handler " + msg);
        $('#iphone_devtoken').val(msg);
        var siteId = $('#userSiteId').val();
        registerIphoneDeviceId(siteId);

    },
    errorHandler: function (error) {
        console.log("Error Handler  " + error);
        // alert("Error code"+error);
    },
    // result contains any message sent from the plugin call
    successHandler: function (result) {
        // alert('Success! Result = '+result)
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var pushNotification = window.plugins.pushNotification;
        // TODO: Enter your own GCM Sender ID in the register call for Android
        if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(this.successHandler, this.errorHandler, { "senderID": "1073233351812", "ecb": "push.onNotificationGCM" });

        }
        else {
            pushNotification.register(this.tokenHandler, this.errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "push.onNotificationAPN" });
        }
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        //alert('Received Event: ' + id);
        console.log('Received Event: ' + id);
    },
    // iOS
    onNotificationAPN: function (event) {
        var pushNotification = window.plugins.pushNotification;
        console.log("Received a notification! " + event.alert);
        alert("Received a notification! " + event.alert);
        console.log("event sound " + event.sound);
        //alert("event sound " + event.sound)
        console.log("event badge " + event.badge);
        //alert("event badge " + event.badge);
        console.log("event " + event);
        // alert("event " + event);
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            console.log("Set badge on  " + pushNotification);
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    },
    // Android
    onNotificationGCM: function (e) {
        switch (e.event) {
            case 'registered':
                if (e.regid.length > 0) {
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    alert('registration id = ' + e.regid);
                    $('#android_devid').val(e.regid);
                    var siteId = $('#userSiteId').val();
                    registerAndroidDeviceId(siteId);

                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model
                // of the intermediary push server which must also be reflected in GCMIntentService.java
                //alert('message = '+e.message+' msgcnt = '+e.msgcnt);
                break;

            case 'error':
                // alert('GCM error = '+e.msg);
                break;

            default:
                // alert('An unknown GCM event has occurred');
                break;
        }
    }

};
