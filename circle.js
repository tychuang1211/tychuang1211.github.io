class Circle {
  constructor(_points, _step) {
    this.points = _points;
    this.step = _step;
  }
  update(_points) {
    for(let i = 0; i < this.points.length; i++) {
      this.points[i] = lerp(this.points[i], _points[i], 0.5);
    }
  }
  display(renderer, amp) {
    angleMode(DEGREES);
    renderer.push();
    renderer.translate(width/2, height/2);
    renderer.stroke(255);
    renderer.strokeWeight(5);
    renderer.noFill();
    //renderer.beginShape();
    let x, y;
    for(let i = 0; i < 180; i += this.step) {
      let index = floor(map(i, 0, 180, 0, this.points.length-1));
      let r = map(this.points[index], -1, 1, 0, 300) + amp;
      x = r*sin(i);
      y = r*cos(i);
      //renderer.curveVertex(x, y);
      renderer.point(x,y);
    }
    for(let i = 180; i >  0; i -= this.step) {
      let index = floor(map(i, 0, 180, 0, this.points.length-1));
      let r = map(this.points[index], -1, 1, 0, 300) + amp;
      x = r*sin(i*-1);
      y = r*cos(i);
      //renderer.curveVertex(x, y);
      renderer.point(x,y);
    }
    for(let i = 0; i <= this.step*2; i += this.step) {
      let index = floor(map(i, 0, 180, 0, this.points.length-1));
      let r = map(this.points[index], -1, 1, 0, 300) + amp;
      x = r*sin(i);
      y = r*cos(i);
      //renderer.curveVertex(x, y);
      renderer.point(x,y);
    }
    //renderer.endShape();
    renderer.pop(); 
  }
}