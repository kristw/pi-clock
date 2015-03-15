'use strict';

var current = {
  digit: 3,
  carryOver: 1,
  position: 1
};

var canvas = document.getElementById('clockvas');
var context = canvas.getContext('2d');

var stepSize = 30;
var centerX = canvas.clientWidth/2;
var centerY = canvas.clientHeight/2;

var color = d3.scale.category10();

d3.text('data/pi1000000.txt', function(pi){
  function piNth(i){
    return i>0 ? pi[i+1] : pi[i];
  }

  for(var i=10;i>0;i--){
    drawCircle(centerX, centerY, i*stepSize, null);
  }

  var prev = {
    x: centerX,
    y: centerY
  };

  function draw(i){
    var digit = piNth(i);

    // var angle = i * 6;
    // var r = stepSize * digit;

    var minute = Math.floor(i/(60));
    var angle = minute * 6;
    var r = (i%60) / 60 * 300;

    var x = centerX + r * Math.sin(angle*Math.PI/180);
    var y = centerY - r * Math.cos(angle*Math.PI/180);

    if(i%60==0){
      drawCircle(centerX, centerY, stepSize * 10, {
        fill: 'rgba(255,255,255,'+0.05+')'
      });

      context.beginPath();
      context.moveTo(centerX, centerY);
      context.lineWidth = 5;
      context.lineTo(
        centerX + stepSize * 10 * Math.sin(angle*Math.PI/180),
        centerY - stepSize * 10 * Math.cos(angle*Math.PI/180)
      );
      context.strokeStyle = '#e5e5e5';
      context.stroke();
    }

    drawCircle(x, y, 3, {
      fill: color(digit),
      lineWidth: 1,
      stroke: 'rgba(0,0,0,0)'
    });

    // drawCircle(x, y, 5, {
    //   fill: color(Math.floor(i/60)),
    //   lineWidth: 1
    // });

    // context.beginPath();
    // context.moveTo(prev.x, prev.y);
    // context.lineWidth = 3;
    // context.lineTo(x, y);
    // context.strokeStyle = color(Math.floor(i/60));
    // context.stroke();

    // prev.x = x;
    // prev.y = y;
  }

  // for(var j=0;j<3600;j++){
  //   draw(j);
  // }

  var now = new Date();
  var i= now.getHours()*3600+ now.getMinutes() * 60 + now.getSeconds();
  window.setInterval(function(){

    draw(i);
    i++;
  }, 10);

});

function drawCircle(cx, cy, r, options){
  context.beginPath();
  context.arc(cx, cy, r, 0, 2 * Math.PI, false);
  context.fillStyle = (options && options.fill) ? options.fill : '#eee';
  context.fill();
  context.lineWidth = (options && options.hasOwnProperty('lineWidth')) ? options.lineWidth: 5;
  context.strokeStyle = (options && options.stroke) ? options.stroke : '#ddd';
  context.stroke();
}