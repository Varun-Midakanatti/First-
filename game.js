var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;
var count = 0;
var colors = ["blue", "red", "green", "yellow"];

//Event handler on key press
$(document).keypress(function() {
  if (started !== true) {
    generateSequence();
  }
  started = true;
});

//Event handler on mouse click
$(".btn").on("click", function() {
  var color = $(this).attr("id");
  $(this).addClass("pressed");
  setTimeout(function() {
    $(`#${color}`).removeClass("pressed");
  }, 100);
  userPattern.push(color);
  checkSequence(count);
  count += 1;
});

function generateSequence() {
  level += 1;
  $("h1").text(`Level ${level}`);
  var num = Math.floor(Math.random() * 4);
  var randomColor = colors[num];
  gamePattern.push(randomColor);
  $(`#${randomColor}`).fadeOut(200).fadeIn(200);
  var sound = new Audio(`sounds/${randomColor}.mp3`);
  sound.play();
  userPattern = [];
  count = 0;
}

function checkSequence(ind) {
  if (userPattern[ind] === gamePattern[ind]) {
    for (i = 0; i<userPattern.length; i++) {
      if (userPattern[i] !== gamePattern[i]){
        gameOver();
      }
    }
    if (ind === gamePattern.length-1) {
      setTimeout(function () {
        generateSequence();
      }, 1000);
    }
  } else if (ind > gamePattern.length || userPattern[ind] !== gamePattern[ind]) {
    gameOver();
  }
}

function gameOver() {
  $("h1").text("Loser! Press any key to restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  var finsound = new Audio("sounds/wrong.mp3");
  finsound.play();
  started = false;
  level = 0;
  gamePattern = [];
  count = 0;
}
