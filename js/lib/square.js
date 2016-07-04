function Square(context){
  this.origin = {x: 0, y: 0};
  this.x = 0;
  this.y = 0;
  this.moveTo = {x:0, y:0};
  this.width = 0;
  this.height = 0;
  this.color = "";
  this.rotation = 0;
}

Square.prototype.jump = function(){
  var diff = Math.abs(this.x - this.moveTo.x);
  if(diff < x(0.5)){
  this.moveTo.y = this.y -y(5);
  var spotx = x(4)-this.width/2;
  if(this.moveTo.x == spotx){
  spotx = x(16) - this.width/2;
  }
  this.moveTo.x = spotx;
  }
}

Square.prototype.shouldMove = function(){
  if(this.moveTo.y == this.origin.y && this.y == this.origin.y){
    return false
  }else{
    return true;
  }
}


Square.prototype.move = function(){
  var diffx = Math.abs(this.x - this.moveTo.x);
  var diff = Math.abs(this.y - this.moveTo.y);
    if(diff > 1 && this.y > this.moveTo.y){
    diff = diff/5;
  }else if(diff > 1 && this.y < this.moveTo.y){
    diff = diff / (diff/15);
  }
  if(this.y > this.moveTo.y){
    this.y -= diff;
  }else if(this.y < this.moveTo.y){
    this.y += diff;
  }




  if(diffx > 1 && this.x > this.moveTo.x){
    diffx = diffx / (diffx/15);
  }else if(diffx > 1 && this.x < this.moveTo.x){
    diffx = diffx / (diffx/15);
  }
  if(this.x > this.moveTo.x){
    this.x -= diffx;
  }else if(this.x < this.moveTo.x){
    this.x += diffx;
  }
  this.rotation++;

  if(this.y == this.moveTo.y && this.y != this.origin.y){
    this.moveTo.y = this.origin.y;
  }
}
