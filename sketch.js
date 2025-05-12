let facemesh;
let video;
let predictions = [];
const points = [409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
  76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184];
const leftEyePoints = [243, 190, 56, 28, 27, 29, 30, 247, 130, 25, 110, 24, 23, 22, 26, 112,
  133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155];
const rightEyePoints = [359, 467, 260, 259, 257, 258, 286, 444, 463, 341, 256, 252, 253, 254, 339, 255,
  263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249];

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(400, 400);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  stroke(255, 0, 0); // 紅色
  strokeWeight(5); // 線條粗細為5
  noFill();

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    beginShape();
    for (let i = 0; i < points.length; i++) {
      const index = points[i];
      const [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);



    stroke(0, 0, 255); // 藍色
    // 繪製左眼
    beginShape();
    for (let i = 0; i < leftEyePoints.length; i++) {
      const index = leftEyePoints[i];
      const [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 繪製右眼
    beginShape();
    for (let i = 0; i < rightEyePoints.length; i++) {
      const index = rightEyePoints[i];
      const [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
