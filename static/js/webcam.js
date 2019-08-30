const webcamElement = document.getElementById('webcam');

async function setupWebcam() {
    return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia || 
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.mozGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, 
                stream => {
                    webcamElement.srcObject = stream;
                    webcamElement.addEventListener('loadeddata', () => resolve(), false);
                },
                error => reject());
        } else {
            $("#webcam").text('No webcam detected!')
            reject();
        }
    });
}

(async function () {
    net = await mobilenet.load();

    await setupWebcam();
    while (true) {
        const result = await net.classify(webcamElement);

        document.getElementById('console').innerText = `
            prediction: ${result[0].className}\n
            probability: ${result[0].probability}
        `;

        await tf.nextFrame();
    }
})();