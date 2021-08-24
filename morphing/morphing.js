/* ------ object type ------------------------------------ */

const SMOKESTACK = 0;
const FUNNEL = 1;
const GASTANK = 2;
const SPHERE = 3;
const CUBE = 4;  

const PILLOW = 5;
const TEAR = 6;
const TWISTBODY = 7;
const SEED = 8;
const HEART = 9;
const PYRAMID = 10;

class Morphing {
  /* ------ initialization --------------------------------- */
  
  constructor(_objectName = SPHERE) {
    /* ------ object parameters ------------------------------ */

    // 3D object mesh points (vertices)
    //this.points;
    //this.points_draw;
    //this.objectShape;
    this.objectGroup = [];
    this.minStrokeWeight = 2;

    this.uCount = 69;
    this.uMin = -PI;
    this.uMax = PI - TWO_PI/(this.uCount);

    this.vCount = 69;
    this.vMin = -PI;
    this.vMax = PI - TWO_PI/(this.vCount); 

    // 3D shape morphing (easing) effect
    this.easingArray = new Array(this.vCount+1).fill(null).map(()=>new Array(this.uCount+1).fill(null));

    // Wave effect
    this.waveLevel = 0;
    this.sign_wOff = 1;
    this.wOff = 0;
    this.uOffSpeed = 0.05;
    this.vOffSpeed = 0.05;
    this.waveSpeed = 0;
    this.maxWOff = 100;    

    // Square Wave
    this.sWaveLevel = 0
    this.sWaveLevel_draw = this.sWaveLevel;
    this.sign_swOff = 1;
    this.swOff = 0;
    this.sWaveSpeed = 0;
    this.sWaveSpeed_draw = this.sWaveSpeed;
    this.lightWeight = 0;

    // Mesh stroke colors
    this.meshStrokeR = 255;
    this.meshStrokeG = 255;
    this.meshStrokeB = 255;
    this.meshStrokeA = 255;
    this.meshStrokeR_draw = this.meshStrokeR;
    this.meshStrokeG_draw = this.meshStrokeG;
    this.meshStrokeB_draw = this.meshStrokeB;
    this.meshStrokeA_draw = this.meshStrokeA;  // for easing  
  
    // Set object shape
    this.objectName = _objectName; 
    
    // init mesh points
    this.points = new Array(this.vCount+1).fill(null).map(()=>new Array(this.uCount+1).fill(null));
    this.points_draw = new Array(this.vCount+1).fill(null).map(()=>new Array(this.uCount+1).fill(null));
    this.updateMeshPoints();    
    
    // init easing
    this.initEasing();
    
    // init object PShape
    //initObjectShape();
    this.initObjectGroup();
  }  
  
  initObjectGroup() {
    //objectGroup = createShape(GROUP);
    
    for (let iv = 0; iv <= this.vCount; iv++) {
      for (let iu = 0; iu <= this.uCount; iu++) {
        
        // add child shape ----------
        //PShape ps = createShape();
        
        beginShape(POINTS);
        noFill();
        stroke(this.meshStrokeR, this.meshStrokeG, this.meshStrokeB, this.meshStrokeA);    
        strokeWeight(this.minStrokeWeight);
        
        vertex(this.points_draw[iv][iu].x, this.points_draw[iv][iu].y, this.points_draw[iv][iu].z);  
        endShape();
        
        //this.objectGroup.push(ps);
        
      }
    }
    
    //println("initObjectShapeGroup(), number of children = ", objectGroup.getChildCount());
    
  } 
  
  // Initialization of easing array
  initEasing() {
    randomSeed(123732);
    
    //easingArray = new float[vCount + 1][uCount + 1];
    for (let iv = 0; iv <= this.vCount; iv++) {
      for (let iu = 0; iu <= this.uCount; iu++) {
        this.easingArray[iv][iu] = random(0.003, 0.01) * 2;
        this.points_draw[iv][iu] = createVector(this.points[iv][iu].x, this.points[iv][iu].y, this.points[iv][iu].z);
      }
    }
  }

  // calculation of 3D object shape
  updateMeshPoints() {  
    let vOff = 0;  // for waving
    
    for (let iv = 0; iv <= this.vCount; iv++) {   
      let uOff = 0;  // for waving
      
      for (let iu = 0; iu <= this.uCount; iu++) {

        // calculate 3D shape
        switch(this.objectName) {
          
          case SMOKESTACK:
            this.points[iv][iu] = this.SmokestackFn(iu, iv);
            break;
          
          case FUNNEL:
            this.points[iv][iu] = this.FunnelFn(iu, iv);
            break;
          
          case GASTANK:
            this.points[iv][iu] = this.RodCurveTopFn(iu, iv);
            break;
          
          default:
          case SPHERE:
            this.points[iv][iu] = this.SphereFn(iu, iv);
            break;
            
          case CUBE:
            this.points[iv][iu] = this.CubeFn(iu, iv);
            break;
            
          case PILLOW:
            this.points[iv][iu] = this.PillowFn(iu, iv);
            break;
          
          case TEAR:
            this.points[iv][iu] = this.TearFn(iu, iv);
            break;  
            
          case TWISTBODY:
            this.points[iv][iu] = this.TwistbodyFn(iu, iv);
            break;
            
          case SEED:
            this.points[iv][iu] = this.SeedFn(iu, iv);
            break;
            
          case HEART:
            this.points[iv][iu] = this.HeartFn(iu, iv);
            break;
          
          case PYRAMID:
            this.points[iv][iu] = this.PyramidFn(iu, iv);
            break;
          
        } 
        
        // apply waving effect
        let waveNoise = map(noise(uOff, vOff, this.wOff), 0, 1, -1, 1) * this.waveLevel;                
        let waveEffect = createVector(this.points[iv][iu].x, this.points[iv][iu].y, this.points[iv][iu].z);
        waveEffect.normalize().mult(waveNoise);
        this.points[iv][iu].add(waveEffect);
        
        uOff += this.uOffSpeed;
        
      }
      vOff += this.vOffSpeed;
    }
    
  }
  /* ------ Update setting ---------------------------------------- */
  setObjectName(theValue) {
    this.objectName = theValue;
    this.updateMeshPoints();
    //println("setObjectName = ", objectName);
  }
  
  setStrokeColor(r, g, b, a) {
    this.meshStrokeR = r; 
    this.meshStrokeG = g;
    this.meshStrokeB = b; 
    this.meshStrokeA = a;
  }
  
  
  /* ------ Effects ---------------------------------------- */
  easing(from, target, easingFactor) {
    from += (target - from) * easingFactor;
    return from;
  }
  
  // Morphing
  easingMeshPoints(iv, iu) {   
    this.points_draw[iv][iu].x = this.easing(this.points_draw[iv][iu].x, this.points[iv][iu].x, this.easingArray[iv][iu]);
    this.points_draw[iv][iu].y = this.easing(this.points_draw[iv][iu].y, this.points[iv][iu].y, this.easingArray[iv][iu]);
    this.points_draw[iv][iu].z = this.easing(this.points_draw[iv][iu].z, this.points[iv][iu].z, this.easingArray[iv][iu]);
  }
  
  easingStrokeColor() {
    let easingFactor = 0.01;
    this.meshStrokeR_draw = this.easing(this.meshStrokeR_draw, this.meshStrokeR, easingFactor);
    this.meshStrokeG_draw = this.easing(this.meshStrokeG_draw, this.meshStrokeG, easingFactor);
    this.meshStrokeB_draw = this.easing(this.meshStrokeB_draw, this.meshStrokeB, easingFactor);
    this.meshStrokeA_draw = this.easing(this.meshStrokeA_draw, this.meshStrokeA, easingFactor);
  }
  
  // Wave effect
  setWaveLevel(theValue) {
    this.waveLevel = theValue;
  }
  
  setWaveSpeed(theValue) {
    this.waveSpeed = theValue;
  }
  
  // S-wave effect
  setSWaveLevel(theValue) {
    this.sWaveLevel = theValue;
  } 
  
  setSWaveSpeed(theValue) {
    this.sWaveSpeed = theValue;
  }
  
  setLightWeight(theValue) {  // point strokeWeight
    this.lightWeight = theValue;
  }
  
  
  /* ------ draw object ------------------------------------ */ 
  draw() {    
        
    // wave effect
    if (abs(this.wOff) > this.maxWOff) this.sign_wOff *= -1;
    this.wOff += this.waveSpeed * this.sign_wOff;
    this.updateMeshPoints();
    
    // s-wave effect
    this.sWaveSpeed_draw = this.easing(this.sWaveSpeed_draw, this.sWaveSpeed, 0.05);
    this.sWaveLevel_draw = this.easing(this.sWaveLevel_draw, this.sWaveLevel, 0.05);
    if (abs(this.swOff) > this.maxWOff) this.sign_swOff *= -1;
    this.swOff += this.sWaveSpeed_draw * this.sign_swOff;    
    
    
    // easing color
    this.easingStrokeColor();
    
    // update obj shape
    //updateObjectShape();
    this.updateObjectGroup();
    
  } 
  
  updateObjectGroup() {
    randomSeed(123);
    
    let indexChild = 0;
    let vOff = 0;
    
    for (let iv = 0; iv <= this.vCount; iv++) {   
      let uOff = 0;
      
      for (let iu = 0; iu <= this.uCount; iu++) { 
        
        this.easingMeshPoints(iv, iu);                        
        
        //PShape child = objectGroup.getChild(indexChild);
        
        // s-wave effect
        let sn = map(noise(uOff, vOff, this.swOff), 0, 1, -1, 1);
        let sWaveNoise = sn * this.sWaveLevel_draw;
        let pointNormal = createVector(this.points_draw[iv][iu].x, this.points_draw[iv][iu].y, this.points_draw[iv][iu].z);
        let sWaveEffect = pointNormal.normalize().mult(sWaveNoise);
        
        let r1 = sWaveEffect.x;
        let r2 = sWaveEffect.y;
        let r3 = sWaveEffect.z;
        
        let weight = this.minStrokeWeight + abs(sn) * this.lightWeight;
        
        //child.setStrokeWeight(weight);
        strokeWeight(weight);
        
        let r = this.meshStrokeR_draw;// * random(0.5, 1);
        let g = this.meshStrokeG_draw;// * random(0.5, 1);
        let b = this.meshStrokeB_draw;// * random(0.5, 1);
        let a = this.meshStrokeA_draw;// * map(abs(sn), 0, 1, 1, 0.5);
        
        //child.setStroke(color(r, g, b, a));
        stroke(color(r, g, b, a));
        
        //child.setVertex(0, points_draw[iv][iu].x + r1, points_draw[iv][iu].y + r2, points_draw[iv][iu].z + r3);  
        beginShape(POINTS);
        noFill();
        stroke(this.meshStrokeR, this.meshStrokeG, this.meshStrokeB, this.meshStrokeA);    
        strokeWeight(this.minStrokeWeight);
        
        vertex(this.points_draw[iv][iu].x + r1, this.points_draw[iv][iu].y + r2, this.points_draw[iv][iu].z + r3);  
        endShape();        

        indexChild++;        
        uOff += this.uOffSpeed;
      } 
      
      vOff += this.vOffSpeed;
      
    }
  }
    /* ----------------------------------------------------------------------------------------------- */
  /* ------ functions for calculating the mesh points ---------------------------------------------- */
  
  SmokestackFn(iu, iv) {
    let u = map(iu, 0, this.uCount, this.uMin, this.uMax);
    let v = map(iv, 0, this.vCount, -0.5, 0.5);
    
    let waistTop = 0.8;
    let waistBottom = 2;
    let waist = map(iv, 0, this.vCount, waistTop, waistBottom);
    
    let smokestackHeight = 7;
    
    let x = sin(u) * waist/2;
    let y = v * smokestackHeight;
    let z = cos(u) * waist/2;

    return createVector(x, y, z);
  }
    
  
  FunnelFn(iu, iv) {
    let x = 0;
    let y = 0;
    let z = 0;
    
    let funnelWidth = 3;
    let funnelDepth = 3;
    let funnelHeight = 2;
    let funnelWidthBottom = 1;
    let funnelDepthBottom = 1;
    let wallThickness = 0.1;
    
    // for u points
    let m = int(((this.uCount + 1)/2) / (1 + funnelWidth / funnelDepth));
    let n = (this.uCount + 1) / 2 - m;
    
    // for v points
    let a = int(0.6 * this.vCount);
    let b = int(0.1 * this.vCount);
    let c = this.vCount - 1 - a - 2 * b;
    
    let xMin = 0;
    let xMax = 0;
    let zMin = 0;
    let zMax = 0;
    
    if (iv >= 0 && iv <= a - 1) {
      y = map(iv, 0, a - 1, -funnelHeight/2, funnelHeight/2);
      xMin = map(iv, 0, a - 1, -funnelWidth/2, -funnelWidthBottom/2);
      xMax = map(iv, 0, a - 1, funnelWidth/2, funnelWidthBottom/2);
      zMin = map(iv, 0, a - 1, -funnelDepth/2, -funnelDepthBottom/2);
      zMax = map(iv, 0, a - 1, funnelDepth/2, funnelDepthBottom/2);
      
    } else if (iv >= a && iv <= a + b - 1) {
      y = funnelHeight/2;
      xMin = map(iv, a, a + b - 1, -funnelWidthBottom/2, -funnelWidthBottom/2 + wallThickness);
      xMax = map(iv, a, a + b - 1, funnelWidthBottom/2, funnelWidthBottom/2 - wallThickness);
      zMin = map(iv, a, a + b - 1, -funnelDepthBottom/2, -funnelDepthBottom/2 + wallThickness);
      zMax = map(iv, a, a + b - 1, funnelDepthBottom/2, funnelDepthBottom/2 - wallThickness);
      
    } else if (iv >= a + b && iv <= a + b + c - 1) {
      y = map(iv, a + b, a + b + c - 1 , funnelHeight/2, -funnelHeight/2);
      xMin = map(iv, a + b, a + b + c - 1, -funnelWidthBottom/2 + wallThickness, -funnelWidth/2 + wallThickness);
      xMax = map(iv, a + b, a + b + c - 1, funnelWidthBottom/2 - wallThickness, funnelWidth/2 - wallThickness);
      zMin = map(iv, a + b, a + b + c - 1, -funnelDepthBottom/2 + wallThickness, -funnelDepth/2 + wallThickness);
      zMax = map(iv, a + b, a + b + c - 1, funnelDepthBottom/2 - wallThickness, funnelDepth/2 - wallThickness);
      
    } else if (iv >= a + b + c && iv <= this.vCount) {
      y = -funnelHeight/2;
      xMin = map(iv, a + b + c, this.vCount, -funnelWidth/2 + wallThickness, -funnelWidth/2);
      xMax = map(iv, a + b + c, this.vCount, funnelWidth/2 - wallThickness, funnelWidth/2);
      zMin = map(iv, a + b + c, this.vCount, -funnelDepth/2 + wallThickness, -funnelDepth/2);
      zMax = map(iv, a + b + c, this.vCount, funnelDepth/2 - wallThickness, funnelDepth/2);
      
    }    
    
    
    if (iu >= 0 && iu <= n - 1) {
      x = map(iu, 0, n-1, xMin, xMax);
      z = zMin;
      
    } else if (iu >= n && iu <= n + m - 1) {
      x = xMax;
      z = map(iu, n, n + m - 1, zMin, zMax);
      
    } else if (iu >= n + m && iu <= 2 * n + m - 1) {
      x = map(iu, n + m, 2 * n + m - 1, xMax, xMin);
      z = zMax;
      
    } else if (iu >= 2 * n + m && iu <= 2 * (n + m) - 1) {
      x = xMin;
      z = map(iu, 2 * n + m, 2 * (n + m) - 1, zMax, zMin);
      
    } else {
      x = xMin;
      z = zMin;
    }    

    return createVector(x, y, z);
  }
  
  
  GastankFn(iu, iv) {
    let u = map(iu, 0, this.uCount, this.uMin, this.uMax);
    let v = map(iv, 0, this.vCount, -0.5, 0.5);
    
    let tubeWaist = 3;
    let tubeHeight = 2;
    
    let x = sin(u) * tubeWaist/2;
    let y = v * tubeHeight;
    let z = cos(u) * tubeWaist/2;

    return createVector(x, y, z);
  }
  
  
  RodFn(iu, iv) {
    
    let rodRadius = 1.5;
    let rodHeight = 2;
    
    // for v points
    let b = int((this.vCount + 1) / (1 + rodRadius / rodHeight));
    let a = (this.vCount + 1 - b) / 2;
    
    let y = 0;
    let r = 0;
    
    if (iv >= 0 && iv <= a - 1) {
      y = -rodHeight/2;
      r = map(iv, 0, a - 1, 0, rodRadius);
      
    } else if (iv >= a && iv <= a + b - 1) {
      y = map(iv, a, a + b - 1, -rodHeight/2, rodHeight/2);
      r = rodRadius;
      
    } else if (iv >= a + b && iv <= 2 * a + b - 1) {
      y = rodHeight/2;
      r = map(iv, a + b, 2 * a + b - 1, rodRadius, 0);
      
    } else {
      y = rodHeight/2;
      r = 0;
      
    }
    
    let u = map(iu, 0, this.uCount, this.uMin, this.uMax);      
    
    let x = sin(u) * r;
    let z = cos(u) * r;      

    return createVector(x, y, z);
  }
  
  
  RodCurveTopFn(iu, iv) {
    
    let rodRadius = 1.5;
    let rodHeight = 2;
    let hc = 0.1 * rodHeight;
    let ri = 0.1 * rodRadius;
    
    // for v points
    let b = int((this.vCount + 1) / (1 + 2 * rodRadius / (rodHeight - hc)));
    let d = int((rodRadius / (rodHeight - hc)) * b);  
    //int a = int(d * ri / rodRadius);
    let a = int(0.3 * d);
    let c = d - a;
    
    // edge curve function use
    let y = 0;
    let r = 0;
    let B = hc / (1 - sq(rodRadius/ri));
    let A = -B / sq(ri);
    
    
    if (iv >= 0 && iv <= a - 1) {
      y = -rodHeight/2;
      r = map(iv, 0, a - 1, 0, ri);
      
    } else if (iv >= a && iv <= a + c - 1) {
      r = map(iv, a, a + c - 1, ri, rodRadius);
      y = A * sq(r) + B - rodHeight/2;
      
    } else if (iv >= a + c && iv <= a + c + b - 1) {
      y = map(iv, a + c, a + c + b - 1, -rodHeight/2 + hc, rodHeight/2);
      r = rodRadius;
      
    } else if (iv >= a + c + b && iv <= this.vCount) {
      y = rodHeight/2;
      r = map(iv, a + c + b, this.vCount, rodRadius, 0);
      
    } 
    
    let u = map(iu, 0, this.uCount, this.uMin, this.uMax);      
    
    let x = sin(u) * r;
    let z = cos(u) * r;      

    return createVector(x, y, z);
  }
  
  
  SphereFn(iu, iv) {
    let u = map(iu, 0, this.uCount, this.uMin, this.uMax);
    let v = map(iv, 0, this.vCount, this.vMin, this.vMax);
    v /= 2;
    v -= HALF_PI;
    let x = 2 * (sin(v) * sin(u));
    let y = 2 * (cos(v));
    let z = 2 * (sin(v) * cos(u));

    return createVector(x, y, z);
  } 
  
  
  CubeFn(iu, iv) {
    let x = 0;
    let y = 0;
    let z = 0;
    
    let cubeWidth = 2;
    let cubeDepth = 2;
    let cubeHeight = 2;
    
    // for u points
    let m = int(((this.uCount + 1)/2) / (1 + cubeWidth / cubeDepth));
    let n = (this.uCount + 1) / 2 - m;
    
    // for v points
    let b = int((this.vCount + 1) / (1 + cubeDepth / cubeHeight));
    let a = (this.vCount + 1 - b) / 2;
    
    let xMin = 0;
    let xMax = 0;
    let zMin = 0;
    let zMax = 0;
    
    if (iv >= 0 && iv <= a - 1) {
      y = -cubeHeight/2;
      xMin = map(iv, 0, a - 1, 0, -cubeWidth/2);
      xMax = map(iv, 0, a - 1, 0, cubeWidth/2);
      zMin = map(iv, 0, a - 1, 0, -cubeDepth/2);
      zMax = map(iv, 0, a - 1, 0, cubeDepth/2);
      
    } else if (iv >= a && iv <= a + b - 1) {
      y = map(iv, a, a + b - 1, -cubeHeight/2, cubeHeight/2);
      xMin = -cubeWidth/2;
      xMax = cubeWidth/2;
      zMin = -cubeDepth/2;
      zMax = cubeDepth/2;
      
    } else if (iv >= a + b && iv <= 2 * a + b - 1) {
      y = cubeHeight/2;
      xMin = map(iv, a + b, 2 * a + b - 1, -cubeWidth/2, 0);
      xMax = map(iv, a + b, 2 * a + b - 1, cubeWidth/2, 0);
      zMin = map(iv, a + b, 2 * a + b - 1, -cubeDepth/2, 0);
      zMax = map(iv, a + b, 2 * a + b - 1, cubeDepth/2, 0);
      
    } else {
      y = cubeHeight/2;
      xMin = 0;
      xMax = 0;
      zMin = 0;
      zMax = 0; 
      
    }
    
    
    if (iu >= 0 && iu <= n - 1) {
      x = map(iu, 0, n-1, xMin, xMax);
      z = zMin;
      
    } else if (iu >= n && iu <= n + m - 1) {
      x = xMax;
      z = map(iu, n, n + m - 1, zMin, zMax);
      
    } else if (iu >= n + m && iu <= 2 * n + m - 1) {
      x = map(iu, n + m, 2 * n + m - 1, xMax, xMin);
      z = zMax;
      
    } else if (iu >= 2 * n + m && iu <= 2 * (n + m) - 1) {
      x = xMin;
      z = map(iu, 2 * n + m, 2 * (n + m) - 1, zMax, zMin);
      
    } else {
      x = xMin;
      z = zMin;
    }    

    return createVector(x, y, z);
  }    
  
  
  PillowFn(iu, iv) {  // http://paulbourke.net/geometry/pillow/
    let u = map(iu, 0, this.uCount, 0, TWO_PI);
    //u -= HALF_PI;  // shift the origin of Pillow
    let v = map(iv, 0, this.vCount, PI, 0);
    
    let x = 2 * cos(u);
    let y = 1.5 * cos(v);
    let z = sin(u) * sin(v);    

    return createVector(x, y, z);
  }  
  
  
  TearFn(iu, iv) {
    let u = map(iu, 0, this.uCount, 0, PI);
    let v = map(iv, 0, this.vCount, -PI, PI);
    
    let x = 1 * (1 - cos(u)) * sin(u) * cos(v);
    let y = -2 * cos(u);
    let z = 1 * (1 - cos(u)) * sin(u) * sin(v);    

    return createVector(x, y, z);
  }
  
  
  TwistbodyFn(iu, iv) {  // book
    let u = map(iu, 0, this.uCount, -PI, PI);
    let v = map(iv, 0, this.vCount, -PI, PI);
    
    let x = 1.5 * cos(u) * (0 + sin(v) * cos(u) - sin(2*v) * sin(u) / 2);
    let y = 1.5 * sin(u) * (1 + sin(v) * cos(u) - sin(2*v) * sin(u) / 2) ;
    let z = 1.5 * sin(u) * sin(v) + cos(u) * sin(2*v) / 2;

    return createVector(x, y, z);
  }
  

   SeedFn(iu, iv) {
    let u = map(iu, 0, this.uCount, 0, PI);
    let v = map(iv, 0, this.vCount, -PI, PI);
    
    let a = 4;
    let b = 1;
    let c = 1;
    let d = 1;
    let x = 1 * (1 - pow(cos(u), a)) * pow(sin(u), b) * pow(cos(v), c);
    let y = -2 * pow(cos(u), d);
    let z = 1 * (1 - pow(cos(u), a)) * pow(sin(u), b) * pow(sin(v), c);   
    
    return createVector(x, y, z);
  }
  
  
  HeartFn(iu, iv) {  // http://paulbourke.net/geometry/heart/
    let z = map(iu, 0, this.uCount, -0.98, 0.98);
    let v = map(iv, 0, this.vCount, -3.14, 3.14);
    
    let r = 2 * sqrt(1 - sq(z)) * pow(sin(abs(v)), abs(v/2));    
    let x = 1 * r * sin(v);
    let y = 1 * r * cos(v);  
    //if (Float.isNaN(r)) println(z, v, r, x, y);  // check if gets NaN data
    return createVector(x, y, z);
  }
  
  
  PyramidFn(iu, iv) {
   let u = map(iu, 0, this.uCount, 0, TWO_PI);  
   let v = map(iv, 0, this.vCount, 0, TWO_PI); 
    
    let w = 3;  // funnel width
    let wCut = 1.5;  // funnel width cutting
    let dep = 3;  // funnel depth
    let h = 3;  // funnel height
    let L = 2 * (w + dep);  
    let dia = w / sqrt(2);
    let H = h + dia;
    
    let a = 0;  // point a
    let b = w / L * TWO_PI;  // point b
    let c = (w + dep) / L * TWO_PI;  // point c
    let d = (2 * w + dep) / L * TWO_PI;  // point d
    let e = TWO_PI;  // point e
    
    let x = 0;  
    let y = 0;
    let z = 0;         
    
    let ds_y = 0;   

    if (v >= 0 && v < h / H * TWO_PI) {
      y = map(v, 0, h / H * TWO_PI, 0, h);
      ds_y = map(v, 0, h / H * TWO_PI, wCut, 0);     
      
    } else if (v >= h / H * TWO_PI) {
      y = h;
      ds_y = map(v, h / H * TWO_PI, TWO_PI, 0, wCut);
    }
    
    let xMin = ds_y;
    let xMax = w - ds_y;
    let zMin = ds_y;
    let zMax = dep - ds_y;
    
    
    if (u >= a && u < b) {
      x = map(u, a, b, xMin, xMax);
      z = zMin;
      
    } else if (u >= b && u < c) {
      x = xMax;
      z = map(u, b, c, zMin, zMax);
      
    } else if (u >= c && u < d) {
      x = map(u, c, d, xMax, xMin);
      z = zMax;
      
    } else if (u >= d && u < e) {
      x = xMin;
      z = map(u, d, e, zMax, zMin);
      
    } else if (u == e) {
      x = xMin; 
      z = zMin;
    }
    
    x -= 0.5 * w; 
    y -= 0.5 * h;
    z -= 0.5 * dep; 

    return createVector(x, y, z);
  }
}