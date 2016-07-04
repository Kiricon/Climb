function Wall(){
  this.x = 0;
  this.y = -(y(4));
  this.height = y(2);
  this.width = x(2);
  this.side = "";
}

Wall.prototype.spawn = function(side){
    if(side == "left"){
      this.x = x(2) - this.width/2;
    }else{
      this.x = x(18) - this.width/2;
    }
    this.side = side;
}

Wall.prototype.move = function(){
  if(this.y != y(20)){
    this.y += y(0.4);
  }
}
