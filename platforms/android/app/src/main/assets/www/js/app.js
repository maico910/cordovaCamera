document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(navigator.device.capture);
}

function onFotoClick() {
    console.log("tirar foto");

    let fotoOptions = {
        limit: 2
    } 

    navigator.device.capture.captureImage(
        function sucesso (abc)  {
            console.log(a);
            console.log(abc);
        }, 
        function falha (erro) {
            console.log("Foto erro");
            navigator.notification.alert('Error code: ' + erro.code, null, 'Capture Error');
        }, fotoOptions
    );
}

function onVideoClick() {
    console.log("filmar video");

    let videoOptions = {
        quaility: 0,
        limit: 1,
        duration: 60
    }

    navigator.device.capture.captureVideo(
        videoCaptureSucess(), videoCaptureFail(), videoOptions
    );
}

function videoCaptureSucess() {
    console.log("consegui");
}

function videoCaptureFail(erro) {
    console.log("erro");
    navigator.notification.alert('Error code: ' + erro.code, null, 'Capture Error');
}