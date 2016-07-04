function Wall(){
  this.x = 0;
  this.y = -(y(4));
  this.height = y(4);
  this.width = x(2);
}

Wall.prototype.spawn = function(side){
    if(side == "left"){
      this.y = y(1) - this.width/2;
    }else{
      this.y = y(19) - this.width/2;
    }
}

Wall.prototype.move = function(){
  if(this.y != y(20)){
    this.y += y(0.01);
  }
}
