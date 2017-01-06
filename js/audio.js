// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
}

// Audio player
//
var my_media = null;
var mediaTimer = null;
var duration = 0;

// Play audio
//
function playAudio(src) {
    if(my_media){
        return false;
    }
    // Create Media object from src
    my_media = new Media(src, onSuccess, onError);
    // Play audio
    my_media.play();

    // Update my_media position every second
    if (mediaTimer == null) {
        mediaTimer = setInterval(function () {
            // get my_media position
            my_media.getCurrentPosition(
                    // success callback
                            function (position) {
                                if (position > -1) {
                                    var duration = my_media.getDuration();
                                    setAudioPosition(position*100/duration);
                                }
                            },
                            // error callback
                                    function (e) {
                                        console.log("Error getting pos=" + e);
                                        setAudioPosition("Error: " + e);
                                    }
                            );
                        }, 1000);
            }
}

// Pause audio
//
function pauseAudio() {
    if (my_media) {
        my_media.pause();
    }
}

// Stop audio
//
function stopAudio() {
    if (my_media) {
        my_media.stop();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
    my_media = null;
}

// onSuccess Callback
//
function onSuccess() {
    console.log("playAudio():Audio Success");
}

// onError Callback
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}

// Set audio position
//
function setAudioPosition(position) {
    $('#audio_position').css('width', position+'%').attr('aria-valuenow', position);    
    //document.getElementById('audio_position').innerHTML = position;
}
