function Color(dataValue) {
    let strokeR = float(dataValue[0]);
    let strokeG = float(dataValue[1]);
    let strokeB = float(dataValue[2]);

    // set data range
    if (strokeR > 255) strokeR = 255;
    if (strokeR < 0) strokeR = 0;
    if (strokeG > 255) strokeG = 255;
    if (strokeG < 0) strokeG = 0;
    if (strokeB > 255) strokeB = 255;
    if (strokeB < 0) strokeB = 0;

    obj.setStrokeColor(strokeR, strokeG, strokeB, strokeA);
}
// 3D shape, int , 0 ~ 10
function Shape(dataValue) {
      let objName = int(dataValue);
      
      // set data range
      if (objName > 10) objName = 10;
      if (objName < 0) objName = 0;
      
      obj.setObjectName(objName);
}
// vibrating level, float, 0 ~ 10
function Vibration(dataValue) {
      let vibration = float(dataValue);
      
      // set data range
      if (vibration > 10) vibration = 10;
      if (vibration < 0) vibration = 0;
      
      let sWaveSpeed = map(vibration, 0, 10, 0, 0.5);
      obj.setSWaveSpeed(sWaveSpeed);  
}
// amplitude level, float, 0 ~ 10
function Amplitude(dataValue) {
      let sWaveLevel = float(dataValue);
      
      // set data range
      if (sWaveLevel > 10) sWaveLevel = 10;
      if (sWaveLevel < 0) sWaveLevel = 0;
      
      obj.setSWaveLevel(sWaveLevel);  
}
// rotation speed, float, -1 ~ +1
function Rotation(dataValue) {
      let rotation = float(dataValue);
      
      // set data range
      if (rotation > 1) rotation = 1;
      if (rotation < -1) rotation = -1;
      
      rotatingSpeed = map(rotation, -1, 1, -0.5, 0.5);
      //vc.setRotatingSpeed(rotatingSpeed);   
      
      // Centrifugal force effect
      //waveLevel = map(abs(rotatingSpeed), 0, 0.5, 1, 10);
      //obj.setWaveLevel(waveLevel);
}

const option1 = {
    apiUrl: 'http://140.113.199.211:81/csm',
    deviceModel: 'Morphing',
    deviceName: 'Morphing',
    odfList: [[Color, ['float','float','float']],
              [Shape, ['int']],
              [Vibration, ['float']],
              [Amplitude, ['float']],
              [Rotation, ['float']]],
    pushInterval: 5,
    interval: {
        Color: 1/24,
        Shape: 1/24,
        Vibration: 1/24,
        Amplitude: 1/24,
        Rotation: 1/24
    },
};
const da1 = new iottalkjs.DAI(option1);
da1.run();