class TwoPassBlur {
  constructor(blurH, blurV) {
    this.blurH = blurH;
    this.blurV = blurV;
    
    // initialize the createGraphics layers
    this.pass1 = createGraphics(windowWidth, windowHeight, WEBGL);
    this.pass2 = createGraphics(windowWidth, windowHeight, WEBGL);

    // turn off the cg layers stroke
    this.pass1.noStroke();
    this.pass2.noStroke();    
  }
  apply(cam) {
    // set the shader for our first pass
    this.pass1.shader(this.blurH);

    // send the camera texture to the horizontal blur shader
    // send the size of the texels
    // send the blur direction that we want to use [1.0, 0.0] is horizontal
    this.blurH.setUniform('tex0', cam);
    this.blurH.setUniform('texelSize', [1.0/width, 1.0/height]);
    this.blurH.setUniform('direction', [1.0, 0.0]);

    // we need to make sure that we draw the rect inside of pass1
    this.pass1.rect(0,0,width, height);

    // set the shader for our second pass
    this.pass2.shader(this.blurV);

    // instead of sending the webcam, we will send our first pass to the vertical blur shader
    // texelSize remains the same as above
    // direction changes to [0.0, 1.0] to do a vertical pass
    this.blurV.setUniform('tex0', this.pass1);
    this.blurV.setUniform('texelSize', [1.0/width, 1.0/height]);
    this.blurV.setUniform('direction', [0.0, 1.0]);

    // again, make sure we have some geometry to draw on in our 2nd pass
    this.pass2.rect(0,0,width, height);
    
    // draw the second pass to the screen
    image(this.pass2, 0,0, width, height);
  }
}