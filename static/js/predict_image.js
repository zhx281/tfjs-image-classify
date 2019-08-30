$("#predict-button").hide();

// Loading the MobileNet Model
let model;
(async function(){
    model = await mobilenet.load();
    $(".progress-bar").hide()
    $("#ready").text('Model loaded')
})();

$("#image-selector").change(function() {
    let reader = new FileReader();
    reader.onload = function() {
        let dataURL = reader.result;
        $("#selected-image").attr("src", dataURL).width(224).height(224);
        $("#prediction-list").empty();
    }
    let file = $("#image-selector").prop("files")[0];
    reader.readAsDataURL(file);
    $("#predict-button").show();
});

$("#predict-button").click(async function() {
    let image = $("#selected-image").get(0);
    let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();
    let predictions = await model.classify(tensor, 5);
    console.log(predictions);
    let top5 = Array.from(predictions)
        .map(function (p){
            return {
                probability: p["probability"],
                className: p["className"]
            };
        }).sort(function (a, b) {
            return b.probability - a.probability;
        }).slice(0, 5);

    // Clear prediction list
    $("#prediction-list").empty();
    $("#result").text('Top Results:')
    // Display top 5 predictions
    top5.forEach(function (p) {
        $("#prediction-list").append(
            `<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
    });
});