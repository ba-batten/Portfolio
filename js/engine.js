/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */
var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 707;
    canvas.height = 675;
    doc.getElementById('canvas-container').appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        resetPlayer();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
        gemCollision();
        starCollision();
        starGemCheckSpace();
    }

    // reset player to original position when collision occurs with enemy
    function checkCollisions(){
      allEnemies.forEach(function(enemy) {
        if ((enemy.x >= player.x - 70) && (enemy.x <= player.x + 70) &&
            (enemy.y >= player.y - 30) && (enemy.y <= player.y + 30)) {
              resetPlayer();
              // resetGem();
              player.lives--;
              if (player.lives < 1){
                resetPlayerLives();
                resetGemPoints();
                resetEnemies();
                resetStar();
              }
            }
        });
    }

    // Detect Player collision with a Gem and then reset the Gem to
    // another location and add a point.
    // Add a new Enemy for every 5 Gems collected
    function gemCollision(){
      if ((gem.x >= player.x - 70) &&
          (gem.x <= player.x + 70) &&
          (gem.y >= player.y - 30) &&
          (gem.y <= player.y + 30)) {
            resetGem();
            gem.points++;
            // Increase number of Enemies by 1 for every 5 Gems collected
            if (gem.points % 5 === 0){
              addEnemy();
            }
            // Award a Star for ever 10 Gems collected
            if (gem.points % 10 === 0){
              moveStar();
            }
            // Award an extra life for every 15 Gems collected up to a
            // maximum of 7 lives
            if (gem.points % 15 === 0 && player.lives < 8){
              player.lives++;
            }
          }
      }

      // Detect collision with Star causing all Enemies to slow down by 1/3
      // for 5 seconds
      function starCollision(){
        if ((star.x >= player.x - 70) && (star.x <= player.x + 70) &&
        (star.y >= player.y - 30) && (star.y <= player.y + 30)) {
          slowEnemiesDown();
          speedEnemiesUp();
          resetStar();
        }
      }

      // Slow down Enemies
      function slowEnemiesDown(){setTimeout(function(){
        allEnemies.forEach(function(enemy){
          enemy.speed = enemy.speed * (1/3);
        });
        }, 200);
      }

      // Speed up Enemies to original speeds
      function speedEnemiesUp(){setTimeout(function(){
        allEnemies.forEach(function(enemy){
          enemy.speed = getRandomInt(100, 500);
        });
      }, 5000);
      }


      // Detect if Star and Gem are on the same space and reset Star if true
      function starGemCheckSpace(){
        if (star.x === gem.x && star.y === gem.y){
          moveStar();
        }
      }


    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        // console.log(allEnemies.length);
        gem.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/grass-block.png',   // Second row is grass
                'images/stone-block.png',   // Row 1 of 4 of stone
                'images/stone-block.png',   // Row 2 of 4 of stone
                'images/stone-block.png',   // Row 3 of 4 of stone
                'images/stone-block.png',   // Row 4 of 4 of grass
                'images/grass-block.png'    // Bottom row is grass
            ],
            numRows = 7,
            numCols = 7,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();


        // draw a rectangle to display score
        ctx.fillStyle = 'rgb(9, 37, 81)';
        ctx.fillRect(0, 5, 707, 45);
        ctx.fillStyle = '#5fc148';
        ctx.fillRect(0, 5, 707, 5);
        ctx.fillRect(0, 50, 707, 5);

        // display score
        ctx.font = '24px Monospace';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.textAlign = 'right';
        ctx.fillText('SCORE: ', 640, 37);
        ctx.fillText(gem.points, 660, 37);

        // display high score
        ctx.fillText('HIGH SCORE: ', 420, 37);
        ctx.fillText(gem.highScore, 445, 37);

        // display number of lives remaining
        for (var x = 0; x < player.lives; x++){
          ctx.drawImage(Resources.get('images/heart-small.png'), 5 + (x * 30), 3);
        }
        // ctx.textAlign = 'left';
        // ctx.fillText('LIVES: ', 40, 82);
        // ctx.fillText(player.lives, 135, 82);
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
         gem.render();
         star.render();

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();

    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function resetPlayer() {
        // noop
        // var charArray = ['images/char-boy.png',
        // 'images/char-cat-girl.png',
        // 'images/char-horn-girl.png',
        // 'images/char-princess-girl.png'];
        //
        // player.sprite = charArray[getRandomInt(0, 3)];
        player.x = (101/2) * 6;
        player.y = (83 * 6) - 21;
    }

    // Reset Player lives
    function resetPlayerLives(){
      player.lives = 3;
    }

    //Reset the position and color of gem
    function resetGem(){
      var gemArray = ['images/Gem Blue.png',
      'images/Gem Green.png',
      'images/Gem Orange.png'];
      gem.sprite = gemArray[getRandomInt(0, 2)];
      gem.x = (101 / 2) * (getRandomInt(0, 6) * 2);
      gem.y = 83 * getRandomInt(2, 4) - 21;
    }

    // Reset Gem points
    function resetGemPoints(){
      gem.points = 0;
    }

    // Reset Ster
    function resetStar(){
      star.sprite = 'images/Star.png';
      star.x = -100;
      star.y = 83 * getRandomInt(2, 4) - 21;
    }

    // Move Star
    // This function will be used if the star is ever placed in the same space
    // as a Gem
    function moveStar(){
      star.x = (101 / 2) * (getRandomInt(0, 6) * 2);
    }

    // Reset enemies to beginning difficulty
    function resetEnemies(){
      allEnemies = [];

      for (var x = 0; x <= 5; x++){
        var enemy = new Enemy();
        allEnemies.push(enemy);
      }
    }

    // Function to add an enemy
    function addEnemy(){
      var enemy = new Enemy();
      allEnemies.push(enemy);
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-princess-girl.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png',
        'images/heart-small.png',
        'images/Star.png',
        'images/enemy-bug-left.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
