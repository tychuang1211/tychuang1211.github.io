let BGcolor = 0;

// ------ network (Processing client be connected to iottalk da) ------
/*import processing.net.*;
int port = 8888;
Client myClient;*/

// ------ microphone input ------
//Amplitude loudness;
//AudioIn inputMic;
let loudnessSum;
let smoothingFactor = 1;  // sound easing
let micControl = false;

// ------ object ------
let obj;
let objName = 9;

let strokeR = 217, strokeG = 143, strokeB = 221, strokeA = 230;

// wave effect
let waveLevel = 1, waveSpeed = 0.003;

// s-wave effect
let sWaveLevel = 0.1, sWaveSpeed = 0.005;
let lightWeight = 17;

// ------ virtual camera ------
let vc;
let objSize = 80;  // meshScale
let rotatingSpeed = 0.001;
let cam1;

// ------ Control GUI ------
//ControlP5 cp5;
//let useControlGUI = false;

// ------ save image ------
let savePNG = false;

// ------ author info ------
let authorInfo = "Morphing - C.Y. Hsiao 2019";

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam1 = createCamera();
  setCamera(cam1);
  // ------ object ------
  obj = new Morphing(objName);
  obj.setStrokeColor(strokeR, strokeG, strokeB, strokeA);
  obj.setWaveLevel(waveLevel);
  obj.setWaveSpeed(waveSpeed);
  obj.setSWaveLevel(sWaveLevel);
  obj.setSWaveSpeed(sWaveSpeed);
  obj.setLightWeight(lightWeight);
  
  // ------ scene ------
  /*vc = new VirtualCamera(0, width, height, 0);
  vc.setObject(obj.objectGroup);*/
  let objSize = width / 500 * 80;
  scale(objSize);
  //vc.setRotatingSpeed(rotatingSpeed);
  
  // ------ network ------
  //myClient = new Client(this, "127.0.0.1", port);
  
  // ------ control GUI ------
  //if (useControlGUI) setupControlGUI();
  
  // ------ mic input ------
  /*if (micControl) {
    inputMic = new AudioIn(this, 0);
    inputMic.start();
    
    loudness = new Amplitude(this);
    loudness.input(inputMic);
  }*/
  
  // ------ author info ------
  textSize(15);
  textFont('Helvetica');
}

function draw() {
  orbitControl();
  background(BGcolor);
  cam1._orbit(rotatingSpeed, 0, 0);
  let objSize = width / 500 * 80;
  scale(objSize);
  
  // mic input ----------
  /*if (micControl) {
    float l = loudness.analyze();
    fill(255);
    text("loudness.analyze(): " + l, 30, height - 190); 
    
    loudnessSum += (l - loudnessSum) * smoothingFactor;
    
    sWaveLevel = map(loudnessSum, 0, 0.5, 0.1, 20);
    obj.setSWaveLevel(sWaveLevel);
    
    sWaveSpeed = map(loudnessSum, 0, 0.5, 0.005, 0.5);
    obj.setSWaveSpeed(sWaveSpeed);
    
    rotatingSpeed = map(loudnessSum, 0, 0.5, 0.01, 0.5);
    vc.setRotatingSpeed(rotatingSpeed);
  }*/
  
  // update object ----------
  obj.draw();
  
  // render object canvas ----------
  //vc.draw();
  
  // display object canvas
  //image(vc.pg_vc, 0, 0, width, height);
  
  // show author info ------
  //fill(255, 170);
  //textAlign(RIGHT, BOTTOM);
  //text(authorInfo, width - 10, height - 10);
  
  // show frameRate info ----------
  //textAlign(LEFT, BOTTOM);
  //text(nf(frameRate, 2, 1) + " fps", 10, height - 10);  
  //text("wOff: " + obj.wOff, 10, height - 100);  
  //text("swOff: " + obj.swOff, 10, height - 130); 
  //text("time: " + timestamp(), 10, height - 160); 
  
  // save image
  /*if (savePNG) {
    saveFrame("record/" + timestamp() + ".png");
    savePNG = false;
  } */
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/*String timestamp() {
  return String.format("_%1$ty%1$tm%1$td_%1$tH%1$tM%1$tS", Calendar.getInstance());
}*/

/* ------ mouse control ------------------------------------------- */
/*function mousePressed(){

  vc.clickX = mouseX;
  vc.clickY = mouseY;
  vc.clickRotationX = vc.rotationX;
  vc.clickRotationY = vc.rotationY;

}*/

/* ------ key control ------------------------------------------- */
function keyPressed() {

  switch(key) {
    case '0':  // SMOKESTACK
      obj.setObjectName(0);
      break;
    
    case '1':  // FUNNEL
      obj.setObjectName(1);
      break;
    
    case '2':  // GASTANK
      obj.setObjectName(2);
      break;
      
    case '3':  // SPHERE
      obj.setObjectName(3);
      break;
    
    case '4':  // CUBE
      obj.setObjectName(4);
      break;
    
    case '5':  // PILLOW
      obj.setObjectName(5);
      break;
      
    case '6':  // TEAR
      obj.setObjectName(6);
      break;
      
    case '7':  // TWISTBODY
      obj.setObjectName(7);
      break;
      
    case '8':  // SEED
      obj.setObjectName(8);
      break;
      
    case '9':  // HEART
      obj.setObjectName(9);
      break;
      
    case '-':  // PYRAMID
      obj.setObjectName(10);
      break;
    
    case 's':  // save frame
      savePNG = true;
      break;
  }
  
  return false;
}
/* ORBIT */
function orbit(dTheta, dPhi, dRadius, cam) {
  const diffX = cam.eyeX - cam.centerX;
  const diffY = cam.eyeY - cam.centerY;
  const diffZ = cam.eyeZ - cam.centerZ;

  // get spherical coorinates for current camera position about origin
  let camRadius = Math.sqrt(diffX * diffX + diffY * diffY + diffZ * diffZ);
  // from https://github.com/mrdoob/three.js/blob/dev/src/math/Spherical.js#L72-L73
  let camTheta = Math.atan2(diffX, diffZ); // equatorial angle
  let camPhi = Math.acos(Math.max(-1, Math.min(1, diffY / camRadius))); // polar angle

  // add change
  camTheta += dTheta;
  camPhi += dPhi;
  camRadius += dRadius;

  // prevent zooming through the center:
  if (camRadius < 0) {
    camRadius = 0.1;
  }

  // prevent rotation over the zenith / under bottom
  if (camPhi > Math.PI) {
    camPhi = Math.PI;
  } else if (camPhi <= 0) {
    camPhi = 0.001;
  }

  // from https://github.com/mrdoob/three.js/blob/dev/src/math/Vector3.js#L628-L632
  const _x = Math.sin(camPhi) * camRadius * Math.sin(camTheta);
  const _y = Math.cos(camPhi) * camRadius;
  const _z = Math.sin(camPhi) * camRadius * Math.cos(camTheta);

  cam.camera(
    _x + cam.centerX,
    _y + cam.centerY,
    _z + cam.centerZ,
    cam.centerX,
    cam.centerY,
    cam.centerZ,
    0,
    1,
    0
  );
}
