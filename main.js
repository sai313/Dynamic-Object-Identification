img = "";
objects = [];
status = "";

function setup() {
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Object...";
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
}

function draw() {
    image(video, 0, 0, 400, 400);
    if (status != "") {
        objectDetector.detect(video, gotResults);
        for (var i = 0 ; i < objects.length ; i++) {
            document.getElementById("status").innerHTML = "Status - Objects Detected...";
            document.getElementById("numberofobjects").innerHTML = "Number of Objects - "+objects.length;
            fill("#5BC3EB");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#5BC3EB");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}