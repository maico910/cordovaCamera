
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


function checkPermissaoCamera (sePermitir) {
    var permissions = cordova.plugins.permissions;

    var list = [
        permissions.CAMERA,
        permissions.READ_EXTERNAL_STORAGE
    ];

    permissions.checkPermission(list, success, null);

    function error() {
        console.warn('Camera or Accounts permission is not turned on');
        alert("Camera or permission erro");
    }

    function success(status) {
        if (!status.hasPermission) {

            permissions.requestPermissions(
                list,
                function (status) {
                    if (!status.hasPermission) error();
                },
                error);
        }
    }

    // permissions.checkPermission(permissions.CAMERA, function( status ) {
    //     console.log("Permissao Camera atual: " + status.hasPermission); //permissao para uso da camera
    //     if ( !status.hasPermission ) {
    //         permissions.requestPermission(permissions.CAMERA, function sucesso(status) {
    //             console.log("Permissao Camera alterado para: " + status.hasPermission);
    //             if (status.hasPermission) {
    //                 sePermitir();
    //             } else {
    //                 permissaoErro();
    //             }
    //         }, permissaoErro);
    //     } else {
    //         sePermitir();
    //     }
    // });
}

function permissaoErro () {
    console.log("permissao nao credenciado")
}


function onFotoClick() {
    console.log("Tirar foto"); 
    checkPermissaoCamera(fotoGrafar);
}

function fotoGrafar() {
    let fotoOptions = {
        quality: 50,
        targetWidth: 1024,
        targetHeight: 1024,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        destinationType: 0, // base64
        encodingType: 0 // jpeg
    }

    navigator.camera.getPicture(
        fotoCaptureSucess, fotoCaptureFail, fotoOptions
    );
}

function fotoCaptureSucess(a) {
    // console.log(a);
    console.log("data:image/jpeg;base64," + a);
}

function fotoCaptureFail(erro) {
    alert("Erro tirar foto");
    console.log(erro);

    // 3 cancelado
}



// video 

function onVideoClick() {
    console.log("Gravar video");
    checkPermissaoCamera(filmar);
}

function filmar() {
    let videoOptions = {
        quaility: 0,
        limit: 1,
        duration: 60
    }

    navigator.device.capture.captureVideo(
        videoCaptureSucess, videoCaptureFail, videoOptions
    );
}

function videoCaptureFail(erro) {
    console.log("video erro");
    
    if(erro === 3) {
        alert("Cancelado")
    }
    console.log(erro);
    // alert('Error code: ' + erro.code, null, 'Capture Error');
}

/**
 * funcao chamada quando usuario confirma o video(s) gravado(s)
 * @param {array} mediaFiles lista de video(s) gravado(s)
 */
function videoCaptureSucess(mediaFiles) {
    console.log("video sucesso");
    
    var file = mediaFiles[0]; // video gravado
    var videoFileName = 'nome do video'; // nome do video q vai ser salvo

    let videoTransCodeOptions = {
        fileUri: file.fullPath,
        outputFileName: videoFileName,
        outputFileType: VideoEditorOptions.OutputFileType.MPEG4,
        optimizeForNetworkUse: VideoEditorOptions.OptimizeForNetworkUse.YES,
        saveToLibrary: true, 
        maintainAspectRatio: true,
        width: 480,
        height: 480,
        videoBitrate: 1000000, // 1 megabit
        audioChannels: 2,
        audioSampleRate: 44100,
        audioBitrate: 128000, // 128 kilobits
        progress: function(info) {
            // comprimindo o video
            console.log('transcodeVideo progress callback, info: ' + info);
        }
    }

    VideoEditor.transcodeVideo(
        videoTranscodeSuccess,
        videoTranscodeError,
        videoTransCodeOptions
    );
}


function videoTranscodeSuccess(result) {
	// result is the path to the transcoded video on the device
    console.log('videoTranscodeSuccess, result: ' + result);
    alert("video compilado");
    // mexe aki pra enviar pro servidor
}

function videoTranscodeError(err) {
	console.log('videoTranscodeError, err: ' + err);
}




// comparitlhar

function onCompartilharClick() {
    var options = {
        message: 'share this', // not supported on some apps (Facebook, Instagram)
        subject: 'the subject', // fi. for email
        // files: ['', ''], // an array of filenames either locally or remotely
        url: 'https://www.website.com/foo/#bar?a=b',
        chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
        appPackageName: 'io.cordova.hellocordova', // Android only, you can provide id of the App you want to share with
        iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
    };

    window.plugins.socialsharing.share('Message and subject', 'The subject')

    // window.plugins.socialsharing.shareViaWhatsApp('Message via WhatsApp', null /* img */, null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)})
}