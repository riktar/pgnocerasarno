// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    // Do cool things here...
}

function getImage() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto, function (message) {
        alert('get picture failed');
    }, {
        quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    }
    );

}

function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = new Object();
    params.descrizione = $('#descrizione-foto').val();
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, POSTURL + 'insert-image/', win, fail, options);
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    alert('Immagine inviata con successo! Presto sara disponibile nei nostri album!');
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
}