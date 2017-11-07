var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

// Random integer generator
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  if (getRandomInt(0, 1) === 0){
    this.move = 'right';
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandomInt(-175, 0);
    this.y = TILE_HEIGHT * getRandomInt(4, 5) - 21;
  }
  else {
    this.move = 'left';
    this.sprite = 'images/enemy-bug-left.png';
    this.x = getRandomInt(707, 882);
    this.y = 83 * getRandomInt(2, 3) - 21;
  }
  this.speed = getRandomInt(100, 400);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.move === 'right'){
    if (this.x <= 707){
      this.x += this.speed * dt;
    }
    else {
      this.x = -75 - getRandomInt(100, 2000);
      this.y = 83 * getRandomInt(4, 5) - 21;
      this.speed = getRandomInt(100, 400);
    }
  }
  else {
    if (this.x >= -102){
      this.x -= this.speed * dt;
    }
    else {
      this.x = getRandomInt(807, 2807);
      this.y = 83 * getRandomInt(2, 3) - 21;
      this.speed = getRandomInt(100, 400);
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(){
  this.sprite = 'images/char-boy.png';
  this.lives = 3;
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a handleInput() method.
Player.prototype.handleInput = function(string){
  if (this.x >= (101/2) && string === 'left'){
    this.x -= 101;
  }
  else if (this.y >= 86 && string === 'up'){
    this.y -= 83;
  }
  else if (this.x <= (101/2) * 10 && string === 'right'){
    this.x += 101;
  }
  else if (this.y <= 80 * 5 && string === 'down'){
    this.y += 83;
  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

for (var x = 0; x <= 5; x++){
  var enemy = new Enemy();
  allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player();

//Add Gems object
var Gem = function(){
  var gemArray = ['images/Gem Blue.png',
  'images/Gem Green.png',
  'images/Gem Orange.png'];
  this.sprite = gemArray[getRandomInt(0, 2)];
  this.x = (101 / 2) * (getRandomInt(0, 6) * 2);
  this.y = 83 * getRandomInt(2, 4) - 21;
  this.points = 0;
  this.highScore = 0;
};

// Updates highscore if achieved in current game
Gem.prototype.update = function(){
  if (this.highScore < this.points){
    this.highScore = this.points;
  }
};

Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Instantiate Gem object
var gem = new Gem();

// Create a Star that will slow down Enemies
var Star = function(){
  this.sprite = 'images/Star.png';
  this.x = -150;
  this.y = 83 * getRandomInt(2, 4) - 21;
};

Star.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instatiate Star object
var star = new Star();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
  // Attribute to https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser 
  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
  }, false);
});
