function Game(){
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.sprite = new Square();
  this.walls = [];
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
  // Handle all the magic for the walls
  var self = this;
  this.walls.forEach(function(value, index){
    if(value.y <= y(20)){
      self.walls.splice(index, 1);
      delete value;
    }else{
      var offset = y(20) - (value.y+value.height)
      if(offset <= 0){
        var wall = new Wall();
        wall.spawn("left");
        self.walls.push(wall);
      }
      value.move();
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle= "#333";
      ctx.fillRec(value.x, value.y, value.width, value.height);
      ctx.restore();
    }
  })




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
  var size = x(2);
  var spotx = x(4) - size/2;
  var spoty = this.canvas.height - size - this.canvas.height/20;
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
  for(var i = 5; i > 0; i--){
    var spot = 4*i;
    var wall = new Wall();
    wall.spawn(y(spot));
    self.walls.push(wall);
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
