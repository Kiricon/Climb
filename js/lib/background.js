Game.prototype.drawBackground = function(){
  var ctx = this.ctx;
  var canvas = this.canvas
  var colorList = [
    "#F8B195",
    "#F67280",
    "#C06C84",
    "#6C5B7B",
    "#355C7D"];
  ctx.rect(0,0,this.canvas.width,this.canvas.height);
  // add linear gradient
      var grd = ctx.createLinearGradient(canvas.width/2, 0, canvas.width/2, canvas.height);
      // light blue
      /*
      grd.addColorStop(0, '#8ED6FF');
      // dark blue
      grd.addColorStop(1, '#004CB3'); */
      colorList.forEach(function(value, index){
        grd.addColorStop(index * (1/colorList.length), value);
      })
      ctx.fillStyle = grd;
      ctx.fill();
}

function gradient(startColor, endColor, steps) {
             var start = {
                     'Hex'   : startColor,
                     'R'     : parseInt(startColor.slice(1,3), 16),
                     'G'     : parseInt(startColor.slice(3,5), 16),
                     'B'     : parseInt(startColor.slice(5,7), 16)
             }
             var end = {
                     'Hex'   : endColor,
                     'R'     : parseInt(endColor.slice(1,3), 16),
                     'G'     : parseInt(endColor.slice(3,5), 16),
                     'B'     : parseInt(endColor.slice(5,7), 16)
             }
             diffR = end['R'] - start['R'];
             diffG = end['G'] - start['G'];
             diffB = end['B'] - start['B'];

             stepsHex  = new Array();
             stepsR    = new Array();
             stepsG    = new Array();
             stepsB    = new Array();

             for(var i = 0; i <= steps; i++) {
                     stepsR[i] = start['R'] + ((diffR / steps) * i);
                     stepsG[i] = start['G'] + ((diffG / steps) * i);
                     stepsB[i] = start['B'] + ((diffB / steps) * i);
                     stepsHex[i] = '#' + Math.round(stepsR[i]).toString(16) + '' + Math.round(stepsG[i]).toString(16) + '' + Math.round(stepsB[i]).toString(16);
             }
             return stepsHex;

         }
