function Game() {
    this.status = "setup";
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.sprite = new Square();
    this.walls = [];
    this.wallLength = 10;
    this.last = "";
    //this.resize();
    this.setupSprite();
    this.createWalls();
    this.init();
    this.highScore = 0;
    this.runTime = 0;
    this.holdInterval;
}

Game.prototype.init = function() {
    var self = this;
    var timer = setInterval(function() {
        self.draw();
    }, 20);
    this.listen(); //Listen for Mouse or Touch Events
}
Game.prototype.draw = function() {
    var ctx = this.ctx;
    var sprite = this.sprite;
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Simple stuff to fill out our canvas
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFF";
    if (this.status == "active") {
        this.runTime += 0.1;
    }
    this.drawBackground(this.runTime);
    if (this.status == "setup") {
        //console.log('hotdog');
        ctx.save();
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Press Space to Start", this.canvas.width / 4, this.canvas.height / 2);
        ctx.restore();
    }
    if (this.status == "dead") {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        var width = ctx.measureText("You died!").width;
        ctx.fillText("You died!", this.canvas.width / 2 - width / 2, this.canvas.height / 2);
        ctx.restore();
        document.getElementById('replay').style.display = "block";
        if (this.runTime > 0 && this.runTime > 4) {
            this.runTime -= 2;
        } else if (this.runTime < 4 && this.runTime > 0) {
            this.runTime = 0;
        }
    }
    // Draw score
    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    var hiscoreWidth = ctx.measureText(this.highScore).width;
    ctx.fillText(this.highScore, this.canvas.width / 2 - hiscoreWidth / 2, y(2));
    ctx.font = "20px Arial";
    var scoreWidth = ctx.measureText(sprite.score).width;
    ctx.fillText(sprite.score, this.canvas.width / 2 - scoreWidth / 2, y(3));
    ctx.restore();

    // DELETE OLD ONES
    var self = this;
    var deleteIndex = "";
    for (var i = this.walls.length - 1; i >= 0; i--) {
        var value = this.walls[i];
        if (value.y >= y(20)) {
            self.walls.splice(i, 1);
            delete value;
        }
    }
    // MOVE AND SPAWN WALL
    for (var i = 0; i < this.walls.length; i++) {
        var value = this.walls[i];
        if (value.y + value.height >= y(20) && self.walls.length <= self.wallLength) {
            var wall = new Wall();
            wall.spawn(self.leftRight());
            self.walls.push(wall);
        }
        value.move();
        ctx.save();
        ctx.beginPath();
        var grd = ctx.createLinearGradient(value.x, canvas.height / 2, value.x + value.width, canvas.height / 2);
        /* ctx.fillStyle= "#FFF"; */
        ctx.rect(value.x, value.y, value.width, value.height);
        if (value.side == "left") {
            grd.addColorStop(1, value.colorOne);
            grd.addColorStop(0, value.colorTwo);
        } else {
            grd.addColorStop(1, value.colorTwo);
            grd.addColorStop(0, value.colorOne);
        }
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.restore();

    }


    ctx.save();
    ctx.beginPath();

    if (sprite.shouldMove()) {
        sprite.move();
    }
    if (sprite.shouldExplode(this.status, this.walls)) {
        this.status = "dead";
        sprite.score = 0;
        sprite.deadOffSet = 0;
    }
    if (sprite.score > this.highScore) {
        this.highScore = sprite.score;
    }
    /*
  ctx.translate(sprite.x+sprite.width/2, sprite.y+sprite.height/2);
  ctx.rotate(sprite.rotation * Math.PI/180); */
    ctx.fillStyle = sprite.color;
    if (this.status != "dead") {
        ctx.translate(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2);
        ctx.rotate(sprite.rotation * Math.PI / 180);
        ctx.shadowBlur = 7;
        ctx.shadowColor = sprite.color;
        ctx.fillRect(-sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height);
    } else {

        // Animation of the sprite exploding
        sprite.explode();
        var bitw = sprite.width / 2;
        var bith = sprite.height / 2;
        ctx.save();
        ctx.translate(sprite.x - sprite.deadOffSet, sprite.y - sprite.deadOffSet);
        ctx.rotate(sprite.deadOffSet * Math.PI / 180);
        ctx.fillRect(-bitw, -bith, bitw, bith);
        ctx.restore();
        ctx.save();
        ctx.translate(sprite.x - sprite.deadOffSet, sprite.y + bith + sprite.deadOffSet);
        ctx.rotate(-sprite.deadOffSet * Math.PI / 180);
        ctx.fillRect(-bitw, -bith, bitw, bith);
        ctx.restore();
        ctx.save();
        ctx.translate(sprite.x + bitw + sprite.deadOffSet, sprite.y - sprite.deadOffSet);
        ctx.rotate(sprite.deadOffSet * Math.PI / 180);
        ctx.fillRect(-bitw, -bith, bitw, bith);
        ctx.restore();
        ctx.save();
        ctx.translate(sprite.x + bitw + sprite.deadOffSet, sprite.y + bith + sprite.deadOffSet);
        ctx.rotate(-sprite.deadOffSet * Math.PI / 180);
        ctx.fillRect(-bitw, -bith, bitw, bith);
        ctx.restore();
    }

    ctx.restore();

    // Draw Jump Sparks
    if(sprite.spark >= 0 ){
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "#FFF";
      var deg = 45 * (Math.PI/180);
      if(sprite.side() == "right"){
        //ctx.fillRect(sprite.x+sprite.spark, sprite.y-20-sprite.spark, 10, 10);
        ctx.save();
        ctx.translate(sprite.x+sprite.spark+5, sprite.y+sprite.height+20+3);
        ctx.rotate(-deg);
        ctx.fillRect(-5, -3, 10, 6);
        ctx.restore();
        ctx.save();
        ctx.translate(sprite.x+sprite.spark+5, sprite.y-30+sprite.spark+3);
        ctx.rotate(deg);
        ctx.fillRect(-5,-3, 10, 6);
        ctx.restore();
      }else{
        ctx.save();
        ctx.translate(sprite.x+sprite.width-sprite.spark+5, sprite.y+sprite.height+20+3);
        ctx.rotate(deg);
        ctx.fillRect(-5, -3, 10, 6);
        ctx.restore();
        ctx.save();
        ctx.translate(sprite.x+sprite.width-sprite.spark+5, sprite.y-30+sprite.spark+3);
        ctx.rotate(-deg);
        ctx.fillRect(-5, -3, 10, 6);
        ctx.restore();
      }
      ctx.restore();
      sprite.spark -= 6;
    }

}

Game.prototype.listen = function() {
    var self = this;
    document.getElementsByTagName('body')[0].addEventListener('keydown', function(e) {
        if (e.keyCode == 32) {
            if (self.status != "dead") {
                //  self.setInterval = setInterval(function(){self.sprite.jump()}, 20)
                self.sprite.jump();
                self.status = "active";
            }else{
                self.replay();

                self.elements.replayButton.style.display = "none";
            }
        }
    }, false);
    document.getElementsByTagName('body')[0].addEventListener('keyup', function(e) {
        if (e.keyCode == 32 && self.status != "dead") {
            //  clearInterval(self.setInterval);
            //  self.sprite.jumpEnd();
        }
    }, false)
    document.getElementsByTagName('body')[0].addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (self.status != "dead") {
            self.sprite.jump();
            self.status = "active";
        }
    });

    this.elements.replayButton.addEventListener('click', function(e) {
        self.replay();

        this.style.display = "none";
    });
}

Game.prototype.replay = function(){
    this.status = "setup";
    this.setupSprite();

    //self.runTime = 0;
    this.resetRunTime = true;
};

// Set up some basic sizes for the sprite
Game.prototype.setupSprite = function() {
    var size = x(1);
    var spotx = x(3) - size / 2;
    //var spoty = this.canvas.height - size - this.canvas.height/20;
    var spoty = y(15) - size / 2;
    this.sprite.height = size;
    this.sprite.width = size;
    this.sprite.x = spotx;
    this.sprite.y = spoty;
    this.sprite.origin.y = spoty;
    this.sprite.origin.x = spotx;
    this.sprite.moveTo.x = spotx;
    this.sprite.moveTo.y = spoty;
    this.sprite.color = "#fff";

    this.elements = {
        replayButton: document.getElementById('replay')
    }
}
// Spawn the walls in to existense so it can begin deleting and making new ones
Game.prototype.createWalls = function() {
    var self = this;
    for (var i = 0; i < this.wallLength; i++) {
        var wall = new Wall();
        wall.spawn(this.leftRight());
        wall.y = y(i * 2);
        this.walls.push(wall);
    }
}

Game.prototype.resize = function() {
    var height = window.innerHeight;
    while (height / 20 % 1 != 0) {
        height--;
    }
    this.canvas.height = height;
    this.canvas.style.height = height + "px";
    this.canvas.width = height / 4 * 3;
    this.canvas.style.width = height / 4 * 3 + "px";
}

function x(num) {
    var canvas = document.getElementById('canvas');
    var block = canvas.width / 20;
    var result = block * num;
    return result;
}

function y(num) {
    var canvas = document.getElementById('canvas');
    var block = canvas.height / 20;
    var result = block * num;
    return result;
}
// Choose what side the wall should spawn on depending on the curreng game state
Game.prototype.leftRight = function() {
    var chosenValue = Math.random() < 0.5 ? "left" : "right";
    var left = 0;
    var right = 0;
    this.walls.forEach(function(value) {
        if (value.side == "left") {
            left++;
        } else {
            right++;
        }
    });
    var diff = Math.abs(left - right);
    if (diff > 1) {
        if (left > right) {
            chosenValue = Math.random() < 0.8 ? "right" : "left";
            //  chosenValue = "right";
        } else {
            chosenValue = Math.random() < 0.8 ? "left" : "right";
            //chosenValue = "left";
        }
    } else {
        chosenValue = this.last;
    }
    this.last = chosenValue;
    return chosenValue;
}
