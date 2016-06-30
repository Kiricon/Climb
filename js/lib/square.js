function Square(context){
  this.origin = {x: 0, y: 0};
  this.x = 0;
  this.y = 0;
  this.moveTo = {x:0, y:0};
  this.width = 0;
  this.height = 0;
  this.color = "";
}

Square.prototype.jump = function(y){
  this.moveTo.y -=y;
}

Square.prototype.shouldMove = function(){
  if(this.moveTo.y == this.origin.y && this.y == this.origin.y){
    return false
  }else{
    return true;
  }
}


Square.prototype.move = function(){

  var diff = Math.abs(this.y - this.moveTo.y);
    if(diff > 1 && this.y > this.moveTo.y){
    diff = diff/5;
  }else if(diff > 1 && this.y < this.moveTo.y){
    diff = diff / (diff/5);
  }
  if(this.y > this.moveTo.y){
    this.y -= diff;
  }else if(this.y < this.moveTo.y){
    this.y += diff;
  }

  if(this.y == this.moveTo.y && this.y != this.origin.y){
    this.moveTo.y = this.origin.y;
  }
}
