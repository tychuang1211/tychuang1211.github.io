let CANVAS;
// Blur Shader
let blurShader;
let isBlur = false;
// Audio
let song;
let fft;
let smoothing = 0.8;
let bins = 1024;
let peakDetect;
// Stars
let starLayer;
let starNum = 30;
let starSpeed = 10;
let stars = [];
// Color
let colorMap = [[  0,128,255],  // BLUE
                [128,  0,255],  // PURPLE
                [255,  0,128],  // PINK
                [255,108,  0],  // ORANGE
                [128,255,  0],  // YRLLOW/GREEN
                [  0,255,128]]; // GREEN/BLUE
let colorMode = 0;
let randomizeRatio = 1;
let easing = 0.05;
// Circle
let circleLayer;
let waveformVisualizer;
// GUI
let playButton;
let blurButton;
let volumeSlider;

function preload() {
  // load the shader definitions from files
  let blurH = loadShader('./assets/base.vert', './assets/blur.frag');
  let blurV = loadShader('./assets/base.vert', './assets/blur.frag');
  blurShader = new TwoPassBlur(blurH, blurV);
  // load audio
  //song = loadSound('./audio/Peter_Gresser_Skipping_in_the_No_Standing_Zone.mp3');
  song = loadSound('./audio/Siddhartha_Corsus_Singular_Vision.mp3');
}

function setup() {
  frameRate(24);
  // Canvas
  CANVAS = createCanvas(windowWidth, windowHeight);
  CANVAS.parent('p5Div');
  background(0,0,0);
  angleMode(DEGREES);
  // Star layer
  starLayer = createGraphics(windowWidth, windowHeight, WEBGL);
  starLayer.clear();
  for (let i = 0; i < starNum; i++) {
    let x = random(-width / 2, width / 2);
    let y = random(-height / 2, height / 2);
    let z = random(-width*5, width/2);
    let r = randomize(colorMap[colorMode][0], randomizeRatio);
    let g = randomize(colorMap[colorMode][1], randomizeRatio);
    let b = randomize(colorMap[colorMode][2], randomizeRatio);
    stars.push(new Star(x, y, z, starSpeed, color(r,g,b)));
  }
  // Circle layer
  circleLayer = createGraphics(windowWidth, windowHeight);
  circleLayerContex = circleLayer.canvas.getContext('2d');
  waveformVisualizer = new Circle(new Array(bins).fill(0), 1);
  // Audio Analyze
  fft = new p5.FFT(smoothing, bins);
  peakDetect = new p5.PeakDetect();
  peakDetect.onPeak(changeColor);
  // GUI
  playButton = createButton('Play');
  playButton.mousePressed(tooglePlay);
  let div = createDiv();
  let label = createElement('label', 'Volume');
  label.attribute('for', 'volume')
  volumeSlider = createSlider(0, 100, 70);
  volumeSlider.id('volume');
  div.child(label);
  div.child(volumeSlider);
  //blurButton = createButton('Blur');
  //blurButton.mousePressed(applyBlur);
}

function applyBlur() {
  if(isBlur) isBlur = false;
  else isBlur = true;
}

function draw() {
  // Audio Analyze
  let waveform = fft.waveform();
  fft.analyze();
  let amp = fft.getEnergy(20, 220);
  peakDetect.update(fft);
  
  // GUI settings
  let val = volumeSlider.value();
  song.setVolume(val/100);
  
  // Background color
  let tone = color(colorMap[colorMode][0], colorMap[colorMode][1], colorMap[colorMode][2], 255);
  let base = color(0, 0, 0, 255);
  let blend = lerpColor(base, tone, 0.25);
  background(blend);
  
  // Update starLayer
  starLayer.clear();
  for (let i = 0; i < stars.length; i++) {
    if(amp > 200)  { stars[i].update(80); }
    else if(amp > 150) { stars[i].update(40); }
    else if(amp > 100) { stars[i].update(20); }
    else if(amp > 50) { stars[i].update(10); }
    else { stars[i].update(5); }
    stars[i].display(starLayer);
  }
  image(starLayer, 0, 0);
  if(isBlur) { blurShader.apply(CANVAS); }
  
  // Update circleLayer
  circleLayer.clear();
  circleLayer.noStroke();
  circleLayer.fill(0, 80);
  circleLayer.rect(0, 0, width, height);
  waveformVisualizer.update(waveform);
  waveformVisualizer.display(circleLayer, map(amp, 0, 255, 50, 150));
  //displayCircle(circleLayer, waveform);
  image(circleLayer, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  starLayer.resizeCanvas(windowWidth, windowHeight);
  circleLayer.resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  /*if (isInCanvas(mouseX, mouseY)) {
    changeColor();
  }*/
}

function tooglePlay() {
  if(!song.isPlaying()) {
    song.play();
    //playButton.html('Pause');
  }
  else {
    song.pause();
    //playButton.html('Play');
  }
}

function changeColor() {
  if (colorMode == colorMap.length-1) {
      colorMode = 0;
  }
  else {
    colorMode++;
  }
  for (let i = 0; i < stars.length; i++) {
    let r = randomize(colorMap[colorMode][0], randomizeRatio);
    let g = randomize(colorMap[colorMode][1], randomizeRatio);
    let b = randomize(colorMap[colorMode][2], randomizeRatio);
    stars[i].setColor(color(r,g,b,220));
  }
}
