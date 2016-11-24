var rocky = require("rocky");

var yearFont = "28px light numbers Leco-numbers";
var dateFont = "36px bold numbers Leco-numbers";
var timeFont = "42px bold numbers Leco-numbers";

var year = null;
var month = null;
var day = null;
var hours = null;
var minutes = null;

function pad(n) {
  var s = "" + n;
  if (s.length == 1) {
    s = "0" + s;
  }
  return s;
}

function updateDate() {
  var d = new Date();
  year = d.getFullYear();
  month = pad(d.getMonth() + 1);
  day = pad(d.getDate());  
}

function updateTime() {
  var d = new Date(); 
  hours = pad(d.getHours());
  minutes = pad(d.getMinutes());
}

updateDate();

function drawDate(ctx, w) {
  ctx.fillStyle = "#2A3132";
  ctx.font = yearFont;
  ctx.fillText(year, w/2, 4, w);
  ctx.font = dateFont;
  ctx.fillText(month, w/2, 28, w);
  ctx.fillText(day, w/2, 58, w);
}

function drawTime(ctx, w) {
  ctx.fillStyle = "white";
  ctx.font = timeFont;
  ctx.fillText(hours, w/2, 90, w);
  ctx.fillText(minutes, w/2, 126, w);
}

rocky.on("draw", function(event) {
  var ctx = event.context;
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  var w = ctx.canvas.unobstructedWidth;
  ctx.textAlign = 'center';
  ctx.fillStyle = "#90AFC5";
  var midpoint = 97;
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, midpoint);
  drawDate(ctx, w);
  ctx.fillStyle = "#763626";
  ctx.fillRect(0, midpoint, ctx.canvas.clientWidth, ctx.canvas.clientHeight - midpoint);
  drawTime(ctx, w);
});

rocky.on("minutechange", function(event) {
  updateTime();
  rocky.requestDraw();
});

rocky.on("daychange", function(event) {
  updateDate();
});