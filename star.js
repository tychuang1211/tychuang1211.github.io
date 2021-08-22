class Star {
  constructor(_x, _y, _z, _speed, _color){
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.pz = this.z;
    this.speed = _speed;
    this.color = _color;
    this.pcolor = this.color;
    this.easing = 0.05;
  }
  setColor(_color) {
    this.pcolor = this.color;
    this.color = _color;
  }
  update(speed = this.speed){
    this.pz = this.z;
    this.z += speed;
    if(this.z > width/2){
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = -width*5;
      this.pz = this.z;
    }
  }
  display(renderer = '') {
    this.pcolor = lerpColor(this.pcolor, this.color, this.easing);
    let weight = map(this.z, -width*5, width/2, 5, 45);
    if(renderer) {
      renderer.stroke(this.pcolor);
      renderer.strokeWeight(weight);
      //renderer.line(this.x, this.y, this.z-100, this.x, this.y, this.z);
      for(let i = 0; i < 10; i++){
        renderer.strokeWeight(weight-i);
        renderer.point(this.x, this.y, this.z-(i*10));
      }
    }
    else {
      stroke(this.pcolor);
      strokeWeight(15);
      line(this.x, this.y, this.pz, this.x, this.y, this.z);
    }
  }
}