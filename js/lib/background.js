Game.prototype.drawBackground = function(){
  var ctx = this.ctx;
  var canvas = this.canvas
  ctx.rect(0,0,this.canvas.width,this.canvas.height);
  // add linear gradient
      var grd = ctx.createLinearGradient(canvas.width/2, 0, canvas.width/2, canvas.height);
      // light blue
      grd.addColorStop(0, '#8ED6FF');
      // dark blue
      grd.addColorStop(1, '#004CB3');
      ctx.fillStyle = grd;
      ctx.fill();
}
