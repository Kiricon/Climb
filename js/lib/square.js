function Square(context){
  this.origin = {x: 0, y: 0};
  this.x = 0;
  this.y = 0;
  this.moveTo = {x:0, y:0};
  this.width = 0;
  this.height = 0;
  this.color = "";
  this.rotation = 0;
  this.jumpNo = 0;
}

Square.prototype.jump = function(){
  var diff = Math.abs(this.x - this.moveTo.x);
  //console.log(this.jumpNo);
  if(diff < x(0.5) || this.jumpNo <2){
      this.jumpNo++;
//  this.moveTo.y = this.y -y(1);
  var spotx = x(3)-this.width/2;
  if(this.moveTo.x == spotx){
  spotx = x(17) - this.width/2;
  }
  this.moveTo.x = spotx;
  }

}

Square.prototype.shouldMove = function(){
  /*
  if(this.moveTo.y == this.origin.y && this.y == this.origin.y){
    return false
  }else{
    return true;
  } */
  return true;
}


Square.prototype.move = function(){
  var diffx = Math.abs(this.x - this.moveTo.x);
  var diff = Math.abs(this.y - this.moveTo.y);
    if(diff > 1 && this.y > this.moveTo.y && this.x != this.moveTo.x){
    diff = diff/10;
  }else if(diff > 1 && this.y < this.moveTo.y){
    //diff = diff / (diff/7.5);
    diff = y(0.2);
  }
  diff = diff;
  if(this.y > this.moveTo.y){
    this.y -= diff;
  }else if(this.y < this.moveTo.y){
    this.y += diff;
  }




  if(diffx > 1 && this.x > this.moveTo.x){
    diffx = diffx / (diffx/30);
  }else if(diffx > 1 && this.x < this.moveTo.x){
    diffx = diffx / (diffx/30);
  }
  if(this.x > this.moveTo.x){
    this.x -= diffx;
  }else if(this.x < this.moveTo.x){
    this.x += diffx;
  }
  this.rotation++;
  if(this.x == this.moveTo.x){
    this.jumpNo = 0;
  }
  /*
  if(this.y == this.moveTo.y && this.y != this.origin.y){
    this.moveTo.y = this.origin.y;
    this.jumpNo = 0;
    console.log('this');
  } */
}
