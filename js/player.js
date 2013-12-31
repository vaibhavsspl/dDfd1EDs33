
var src = "";
var my_media = null;



function ready() {
 
    var isPlaying = "play";
    var pos = 0;
    var mediaTimer = null;
    var slider = null;

    // alert(my_media);

    $("#player-play").click(function () {

        	//alert(my_media);
        if (isPlaying == "play") {
            //alert("play");
            src = $("#songurl").val();
            songtitle = $("#songtitle").val();
            songArtist = $("#songArtist").val();

            //	alert(src);

            var title = songtitle + '[by:- ' + songArtist + ']';
            $(".songtitles").html(title);
            alert(src);
            if (my_media == null) {
                my_media = new Media(src, function () {
                    console.log("playAudio():Audio Success");
                },
                  function (err) {
                      console.log("playAudio():Audio Error: " + err);
                  });
            }
       
            my_media.play();
            $("#media-duration").html(src);
            pos = my_media.getCurrentPosition();
          
            if (mediaTimer == null) {
                mediaTimer = setInterval(function () {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function (position) {
                            if (position > -1) {
                                updateSliderPosition(position);
                            }
                        }
                    );
                }, 1000);
            }


            changePlayButton('pause');
            isPlaying = "pause";
        }
        else {
            alert("pause");
            if (my_media) {
                alert("object alived");
                my_media.pause();
            }
            my_media.pause();
            //clearInterval(Player.mediaTimer);
            changePlayButton('play');
            isPlaying = "play";
        }


    });
    $("#player-stop").click(function () {
        alert("stop");
        if (my_media) {
            alert("object alived");
            my_media.stop();
            updateSliderPosition(0);
        }
    });
    var w = $('#player').width();

    $("#togglePlayer > span.ui-icon").click(function () {
        $('#togglePlayer').find('span').removeClass('ui-icon-arrow-u');
        $(this).addClass('ui-icon-arrow-d');
        $('.music').animate({ bottom: 0 }, 1000);
    });

 
}
function changePlayButton(imageName) {
    var background = $('#player-play')
    .css('background-image')
    .replace('url(', '')
    .replace(')', '');

    $('#player-play').css(
       'background-image',
       'url(' + background.replace(/images\/.*\.png$/, 'images/' + imageName + '.png') + ')'
    );
}
function updateSliderPosition(seconds) {
    var $slider = $('#time-slider');

    if (seconds < $slider.attr('min'))
        $slider.val($slider.attr('min'));
    else if (seconds > $slider.attr('max'))
        $slider.val($slider.attr('max'));
    else
        $slider.val(Math.round(seconds));

    $slider.slider('refresh');
}
