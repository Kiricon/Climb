function Game(){
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.sprite = new Square();
  this.walls = [];
  this.wallLength = 10;
  this.last = "";
  this.setupSprite();
  this.createWalls();
  this.init();
}

Game.prototype.init = function(){
  var self = this;
  var timer=setInterval(function(){self.draw();},20);
  this.listen();    //Listen for Mouse or Touch Events
}
Game.prototype.draw = function(){
  var ctx = this.ctx;
  var sprite = this.sprite;
  ctx.clearRect(0, 0, canvas.width, canvas.height); //Simple stuff to fill out our canvas
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFF";

  // DELETE OLD ONES
  var self = this;
  var deleteIndex = "";
  for(var i = this.walls.length-1; i>= 0; i--){
    var value = this.walls[i];
    if(value.y >= y(20)){
      self.walls.splice(i, 1);
      delete value;
    }
  }
  // MOVE AND SPAWN WALL
  for(var i = 0; i < this.walls.length; i++){
    var value = this.walls[i];
      if(value.y+value.height >= y(20) && self.walls.length <= self.wallLength){
        var wall = new Wall();
        wall.spawn(self.leftRight());
        self.walls.push(wall);
      }
      value.move();
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle= "#333";
      ctx.fillRect(value.x, value.y, value.width, value.height);
      ctx.restore();

  }


  ctx.save();
  ctx.beginPath();

  if(sprite.shouldMove()){
    sprite.move();
  }
  /*
  ctx.translate(sprite.x+sprite.width/2, sprite.y+sprite.height/2);
  ctx.rotate(sprite.rotation * Math.PI/180); */
  ctx.fillStyle = sprite.color;
  ctx.fillRect(sprite.x,sprite.y,sprite.width,sprite.height);

  ctx.restore();
}
Game.prototype.listen = function(){
  var self = this;
  document.getElementsByTagName('body')[0].addEventListener('keydown', function(e){
    if(e.keyCode == 32){
      self.sprite.jump();
    }
  }, false);
}

Game.prototype.setupSprite = function(){
  var size = x(1);
  var spotx = x(3) - size/2;
  //var spoty = this.canvas.height - size - this.canvas.height/20;
  var spoty = y(15) - size/2;
  this.sprite.height = size;
  this.sprite.width = size;
  this.sprite.x = spotx;
  this.sprite.y = spoty;
  this.sprite.origin.y = spoty;
  this.sprite.origin.x = spotx;
  this.sprite.moveTo.x = spotx;
  this.sprite.moveTo.y = spoty;
  this.sprite.color = "#FF0000";
}

Game.prototype.createWalls = function(){
  var self = this;
  for(var i = 0; i < this.wallLength; i++){
    var wall = new Wall();
    wall.spawn(this.leftRight());
    wall.y = y(i*2);
    this.walls.push(wall);
  }
}

function x(num){
  var canvas = document.getElementById('canvas');
  var block = canvas.width/20;
  var result = block * num;
  return result;
}

function y(num){
  var canvas = document.getElementById('canvas');
  var block = canvas.height/20;
  var result = block * num;
  return result;
}

Game.prototype.leftRight = function(){
  var chosenValue = Math.random() < 0.5 ? "left": "right";
  var left = 0;
  var right = 0;
  this.walls.forEach(function(value){
    if(value.side == "left"){
      left++;
    }else{
      right++;
    }
  });
  var diff = Math.abs(left-right);
  if(diff > 1){
    if(left > right){
      chosenValue = "right";
    }else{
      chosenValue = "left";
    }
  }else{
    chosenValue = this.last;
  }
  this.last = chosenValue;
  return chosenValue;
}
