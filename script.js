//////////////////global

//game control
let stage = 0; // keeps track of which function to run
//button
const message = 'Level Select';
const messageX = 960;
const messageY = 490;
//player v
let p1x = 400; //p1 for player
let p1y = 375;
let pWidth = 30;
let pHeight = 70;
//menu buttons
let MENU = 0;

//boxes / obstacles (platforms) {{{{{{FOR LEVEL 1}}}}}}
let b1x = 200; //b1 for box 1
let b1y = 300;
let bWidth = 200;
let bHeight = 40;
//boxes / obstacles (platforms) {{{{{{FOR LEVEL 2}}}}}}
let b2x = 200; //b1 for box 1
let b2y = 300;
let b2Width = 200;
let b2Height = 40;
//boxes / obstacles (platforms) {{{{{{FOR LEVEL 2}}}}}}
let b3x = 200; //b1 for box 1
let b3y = 600;
let b3Width = 200;
let b3Height = 40;
//boxes / obstacles (platforms) {{{{{{FOR LEVEL 2}}}}}}
let b4x = 200; //b1 for box 1
let b4y = 300;
let b4Width = 200;
let b4Height = 40;
//boxes / obstacles (platforms) {{{{{{FOR LEVEL 2}}}}}}
let b5x = 200; //b1 for box 1
let b5y = 300;
let b5Width = 200;
let b5Height = 40;
//key codes
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
//gravity
let jump = false; //jumping or not jumping
let direction = 1; //gravity in the up and down direction
let velocity = 2; //speed of p1
let jumpPower = 15; //strength of player
let fallingSpeed = 5; // same value of velocity
let minHeight = 375; //height of ground
let maxHeight = 50; //maximum height it can go.
let jumpCounter = 0; //keeps track of jumps
//fading in and out
let fade;
let fadeAmount = 1;

//walls under barriers to stop jumping (20 px more than b#y)
var w1y = 260; //w1 for wall under box 1
var wHeight = 10;
//coin1 {{{{{{FOR LEVEL 1}}}}}}
let cHeight = 60; //coin height
let cWidth = 60; //coin width
let c1x = 200;
let c1y = 250;
//coin 2 {{{{{{FOR LEVEL 1}}}}}}
let c2Height = 60; //coin2 height
let c2Width = 60; //coin2 height
let c2x = 200;
let c2y = 75;

//coin 3 {{{{{{FOR LEVEL 1}}}}}}
let c3Height = 60; //coin3 height
let c3Width = 60; //coin3 height
let c3x = 700;
let c3y = 200;
//coin 4
let c5x = 900;
let c5y = 200;
let c5Width = 60;
let c5Height = 60;

//jeff bezos {{{{{{FOR LEVEL 1}}}}}}
let g1x = 200; //g1 for jeff bezos1
let g1y = 375;
let gWidth = 30;
let gHeight = 60;

//jeff bezos 2 {{{{{{FOR LEVEL 1}}}}}}
let g2x = 275; //g1 for jeff bezos2
let g2y = 75;
let g2Width = 30;
let g2Height = 60;

//counter {{{{{{FOR LEVEL 1}}}}}}
let score = 0; //score
let lives = 2; //lives the player has
let totalTime;
let timeLimit = 15; //countdown
let splashTime; //ammount of time on splash screen
let gameTime; //ammount of time in game screen
let timer = 15;
//counter  {{{{{{FOR LEVEL 2}}}}}}
let score2 = 0;
let lives2 = 2;
let gameTime2; //gets the ammount of time in level 1
//spikes
let s1x = 900
let s1y = 375
let sWidth = 100
let sHeight = 50
//multimedia
let coin;
let elon;
let landscape;
let jeff;
let bitcoinFont;
let openFont;//font
let portal;//image for portal
let arrow;
let mouse;
let spike;
/////////////////////////////////setup
function setup() {
  createCanvas(1000, 500);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
      fade = 0//fading text in splash screen
  strokeWeight(0);
} ////////////////////////////////end of setup

////////////////////////////////////////////////////draw
function draw() {

  
  ///IF STAGE
  if (stage == 0) {
    level1();
  } ///close = 0
  keyPressed();
  keyTyped();
  gravity();
  totalTime = millis(); //start timer

  if (stage == 0) {
    splash();
  } //close = 0

  if (stage == 1) {
    level1();
  } //close = 1

  if (stage == 2) {
    winScreen();
  } //close = 2

  if (stage == 3) {
    loseScreen();
  } //close = 3

  if (stage == 4) {
    //pause screen
    pauseScreen();
  } //close = 4
  if (mouseIsPressed == true && stage != 5) {
    stage = 1;//gets rid of a bug
  } //click starts game

  if (stage == 5) {
    //level 2
    level2();
  } //close = 5
  textSize(10);
    if (isMouseInsideText(message, messageX, messageY)) {
    cursor(HAND);
    fill(0, 200, 255);
    stroke(0, 200, 255);
  } else {
    cursor(ARROW);
    fill(255);
    stroke(255);
  }

  text(message, messageX, messageY);

} //////////////////////////////////////////////////end of draw

////////////level 1
function level1() {
  //appearance of game (sky, colour, etc.)
  image(landscape, width/2, height/2, 1000, 500); //sky blue colour

  //grass
  noStroke();
  fill(100, 200, 75); //grass colour - green
  rect(width / 2, 450, width, 100); //location and size

  //window frame
  noFill();
  stroke(255, 10, 120); //outline colour - pink
  strokeWeight(15);
  rect(width / 2, height / 2, width, height);

  //box
  stroke(0);
  strokeWeight(5);
  fill(255, 120, 0); //orange colour
  rect(b1x, b1y, bWidth, bHeight);

  //box 2
  stroke(0);
  strokeWeight(5);
  fill(255, 120, 120);
  rect(700, height / 2, bWidth, bHeight);

  //box 3
  stroke(0);
  strokeWeight(5);
  fill(255, 30, 120);
  rect(b1x, height / 4, bWidth, bHeight);

  //player
  stroke(0);
  fill(150, 0, 170); //purple
  //rect (p1x, p1y, pWidth, pHeight);
  image(elon, p1x, p1y, pWidth, pHeight);

  //collisions for box 1
  if (
    p1x >= b1x - bWidth / 2 &&
    p1x <= b1x + bWidth / 2 &&
    p1y + pHeight / 2 >= b1y - bHeight / 2 &&
    p1y - pHeight / 2 <= b1y + bHeight / 2 &&
    jump == false
  ) {
    p1y = b1y - 55; //dont fall and rest on top of platform
    velocity = 0; //no speed becuase we arent falling
    jumpCounter = 0; //allows us to jump again
  } //close if on box
  //collisions for box 2
  if (
    p1x >= 700 - bWidth / 2 &&
    p1x <= 700 + bWidth / 2 &&
    p1y + pHeight / 2 >= height / 2 - bHeight / 2 &&
    p1y - pHeight / 2 <= height / 2 + bHeight / 2 &&
    jump == false
  ) {
    p1y = height / 2 - 55; //dont fall and rest on top of platform
    velocity = 0; //no speed becuase we arent falling
    jumpCounter = 0; //allows us to jump again
  } //close if on box

  if (
    p1x >= b1x - bWidth / 2 &&
    p1x <= b1x + bWidth / 2 &&
    p1y + pHeight / 2 >= height / 4 - bHeight / 2 &&
    p1y - pHeight / 2 <= height / 4 + bHeight / 2 &&
    jump == false
  ) {
    p1y = height / 4 - 55; //dont fall and rest on top of platform
    velocity = 0; //no speed becuase we arent falling
    jumpCounter = 0; //allows us to jump again
  } //close if on box

  
  //coins
  image(coin, c1x, c1y, cWidth, cHeight);

  //if coin1
  if (
    p1x >= c1x - cWidth / 2 &&
    p1x <= c1x + cWidth / 2 &&
    p1y >= c1y - cHeight / 2 &&
    p1y <= c1y + cHeight / 2
  ) {
    //player hits coins
    score = score + 10; //gets a point
    c1x = -1000; //makes the coin dissapear
  } //end of if coin

  image(coin, c2x, c2y, c2Width, c2Height);
  //if coin2
  if (
    p1x >= c2x - c2Width / 2 &&
    p1x <= c2x + c2Width / 2 &&
    p1y >= c2y - c2Height / 2 &&
    p1y <= c2y + c2Height / 2
  ) {
    //player hits coins
    score = score + 10; //gets a point
    c2x = -1000; //makes the coin dissapear
  } //end of if coin
  image(coin, c3x, c3y, c3Width, c3Height);
  if (
    p1x >= c3x - c3Width / 2 &&
    p1x <= c3x + c3Width / 2 &&
    p1y >= c3y - c3Height / 2 &&
    p1y <= c3y + c3Height / 2
  ) {
    //player hits coins
    score = score + 10; //gets a point
    c3x = -1000; //makes the coin dissapear
  } //end of if coin
c3x = c3x
  image(coin, c3x, c3y, c3Width, c3Height);
  if (
    p1x >= c3x - c3Width / 2 &&
    p1x <= c3x + c3Width / 2 &&
    p1y >= c3y - c3Height / 2 &&
    p1y <= c3y + c3Height / 2
  ) {
    //player hits coins
    score = score + 10; //gets a point
    c3x = -1000; //makes the coin dissapear
  } //end of if coin

  //jeff bezos
  image(jeff, g1x, g1y, gWidth, gHeight);
  if (
    p1x >= g1x - gWidth / 2 &&
    p1x <= g1x + gWidth / 2 &&
    p1y >= g1y - gHeight / 2 &&
    p1y <= g1y + gHeight / 2
  ) {
    lives = lives - 1; //loses life
    p1x = 400;
    p1y = 375;
  } //end of IF JEFF

  //jeff bezos 2
  image(jeff, g2x, g2y, gWidth, gHeight);
  if (
    p1x >= g2x - gWidth / 2 &&
    p1x <= g2x + gWidth / 2 &&
    p1y >= g2y - gHeight / 2 &&
    p1y <= g2y + gHeight / 2
  ) {
    lives = lives - 1; //loses life
    p1x = 400;
    p1y = 375;
  } //end of IF JEFF

  

  //scoreboard
  fill(255);
  stroke(0);
  strokeWeight(0);
  textSize(30);
  text("POINTS:", 70, 50);
  text(score, 165, 50);

  //lives
  fill(255);
  stroke(0);
  strokeWeight(0);
  textSize(30);
  text("LIVES:", 250, 50);
  text(lives, 325, 50);

  //name
  fill(0, 102, 0);
  strokeWeight(0);
  textSize(20);
  text("By Josh", 50, 475);
  //Timer
  splashTime = splashTime; //stops counting time on splash
  totalTime = int((totalTime - splashTime) / 1000); // converts to seconds and integers
  fill(255);
  stroke(0);
  strokeWeight(0);
  textSize(30);
  text("Timer:", 800, 50);
  text(timeLimit - totalTime, 900, 50); //countdown timer
  //code to triger win or lose screen vvvv
  if (score >= 30) {
    // 3 to win because there are 3 coins
    stage = 5; //trigger level 2
  } //end of if
  if (lives <= 0) {
    // no more lives = lose
    stage = 3; //triggers lose after losing lives
  } //end of if lose
  if (totalTime >= timeLimit) {
    stage = 3; //triggers lose after losing time
  }
} ///end of level1

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////level 2
function level2() {
  
  //appearance of game (sky, colour, etc.)
  image(bg, width/2, height/2, 1000, 500); //sky blue colour
  strokeWeight(0);
 // text("This is Level 2", width / 2, height / 2);
  //grass
  noStroke();
  fill(100, 200, 75); //grass colour - green
  rect(width / 2, 450, width, 100); //location and size

  //window frame
  noFill();
  stroke(255, 10, 120); //outline colour - pink
  strokeWeight(15);
  rect(width / 2, height / 2, width, height);


  //box 1
  stroke(0);
  strokeWeight(5);
  fill(255, 120, 120);
  rect(b2x, b2y, b2Width, b2Height);

  //box 2
    stroke(0);
  strokeWeight(5);
  fill(255, 120, 120);
  rect(500, 200, b2Width, b2Height);

  //box 3
  stroke(0);
  strokeWeight(5)
  fill(255,0, 110);
  rect(900, 140, 90, b2Height);



  
  //teleporter
    stroke(0);
  strokeWeight(0);
  fill(255);
  image(portal, 700, 400, 50, 75);  
  image(portal, 900, 100, 50, 75);
    if (
    p1x >= 700 - gWidth / 2 &&
    p1x <= 700 + gWidth / 2 &&
    p1y >= 400- gHeight / 2 &&
    p1y <= 400 + gHeight / 2
  ) {

    p1x = 900;
    p1y = 50;//teleports to designated location
  } //end of IF tp
  //player
  stroke(0);
  fill(150, 0, 170); //purple
  //rect (p1x, p1y, pWidth, pHeight);
  image(elon, p1x, p1y, pWidth, pHeight);

  //scoreboard
  fill(255);
  stroke(0);
  strokeWeight(0);
  textSize(30);
  text("POINTS:", 70, 50);
  text(score, 165, 50);

  //lives
  fill(255);
  stroke(0);
  strokeWeight(0);
  textSize(30);
  text("LIVES:", 250, 50);
  text(lives, 325, 50);

  //name
  fill(255);
  strokeWeight(0);
  textSize(40);
  text("By Josh", 50, 475);
  //Timer
     text(timer, 900, 50);
  gameTime = gameTime; //stops counting time on splash
  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }


  text("Timer:", 800, 50);


  
  //code to triger win or lose screen vvvv
  if (score >= 30) {
    // 3 to win because there are 3 coins
    stage = 5; //trigger level 2
  } //end of if
  if (score >= 60){
stage = 2
    
  }
  if (lives <= 0) {
    // no more lives = lose
    stage = 3; //triggers lose after losing lives
  } //end of if lose
    if (timer <= 0) {
stage = 3
  }
    //collisions for box 1
  if (
    p1x >= b1x - bWidth / 2 &&
    p1x <= b1x + bWidth / 2 &&
    p1y + pHeight / 2 >= b1y - bHeight / 2 &&
    p1y - pHeight / 2 <= b1y + bHeight / 2 &&
    jump == false
  ) {
    p1y = b1y - 55; //dont fall and rest on top of platform
    velocity = 0; //no speed becuase we arent falling
    jumpCounter = 0; //allows us to jump again
  } //close if on box

     //collisions for box 2
  if (
    p1x >= 500 - bWidth / 2 &&
    p1x <= 500 + bWidth / 2 &&
    p1y + pHeight / 2 >= 200 - bHeight / 2 &&
    p1y - pHeight / 2 <= 200 + bHeight / 2 &&
    jump == false
  ) {
    p1y = 200 - 55; //dont fall and rest on top of platform
    velocity = 0; //no speed becuase we arent falling
    jumpCounter = 0; //allows us to jump again
  } //close if on box
  //collisions for box 3
  if (
    p1x >= 900 - 90 / 2 &&
    p1x <= 900 + 90 / 2 &&
    p1y + pHeight / 2 >= 140 - bHeight / 2 &&
    p1y - pHeight / 2 <= 140 + bHeight / 2 &&
    jump == false
  ) {
    p1y = 140 - 55; //dont fall and rest on top of platform
    velocity = 0; //no speed becuase we arent falling
    jumpCounter = 0; //allows us to jump again
  } //close if on box
image(coin, 900, 200, cWidth, cHeight);
//if coin2
  if (
    p1x >= 900 - c2Width / 2 &&
    p1x <= 900 + c2Width / 2 &&
    p1y >= 200 - c2Height / 2 &&
    p1y <= 200 + c2Height / 2
  ) {
    //player hits coins
    score = score + 10; //gets a point
    c5x = -1000; //makes the coin dissapear
  } //end of if coin

  //jeff bezos
  image(jeff, g1x, g1y, gWidth, gHeight);
  if (
    p1x >= g1x - gWidth / 2 &&
    p1x <= g1x + gWidth / 2 &&
    p1y >= g1y - gHeight / 2 &&
    p1y <= g1y + gHeight / 2
  ) {
    lives = lives - 1; //loses life
    p1x = 400;
    p1y = 375;
  } //end of IF JEFF

     //spike 1
  image(spike, s1x, s1y, sWidth, sHeight);
  if (
    p1x >= s1x - sWidth / 2 &&
    p1x <= s1x + sWidth / 2 &&
    p1y >= s1y - sHeight / 2 &&
    p1y <= s1y + sHeight / 2
  ) {
    lives = lives - 1; //loses life
    p1x = 400;
    p1y = 375;
  } //end of IF spike


  
  
} ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////end of level 2

///////////////////////win screen
function winScreen() {
  background(0, 255, 0);
  fill(255);
  stroke(0);
  strokeWeight(4);
  textSize(100);
  text("You Win!", width / 2, height / 2);
} /////end of win screen

///////////////////////lose screen
function loseScreen() {
  background(255, 0, 0);
  fill(0);
  stroke(0);
  strokeWeight(0);
  textSize(100);
  text("You Lose", width / 2, height / 2);
} /////end of lose screen
////////////////////////pause screen
function pauseScreen() {
  background(0, 0, 153);

  strokeWeight(0);
  fill(0, 0, 102);
  textSize(30);
  text("Game Paused", width / 2, height / 3);
  fill(255);
  textSize(50);
  text("Click again to continue", width / 2, height / 2);
} //////end of pause screen

///////gravity
function gravity() {
  if (p1y >= minHeight && jump == false) {
    //stops at ground
    p1y = p1y;
    jumpCounter = 0; //jump counter resets when it hits the green grass
  } //end of ground
  else {
    p1y = p1y + direction * velocity; //makes gravity work
  } // end of else fall

  if (jump == true) {
    if (p1y <= maxHeight || jumpCounter >= jumpPower) {
      if (p1y >= minHeight) {
        p1y = minHeight;
      } //close at min height
      else {
        velocity = fallingSpeed; //fall at max
      } //else end
    } //end of max
    else {
      velocity = -jumpPower; //jumping
      jumpCounter = jumpCounter + 1; //adds to jump counter
    } //end of jump
  } // end of else
  else {
    velocity = fallingSpeed;
  } //close else
} ///end of gravity

/////////keyPressed
function keyPressed() {
  if (keyIsDown(LEFT_ARROW)) {
    p1x = p1x - 5; //MOVES LEFT
  }
  if (keyIsDown(RIGHT_ARROW)) {
    p1x = p1x + 5; //MOVES RIGHT
  }
} // end of keyPressed

///////////////key typed
function keyTyped() {
  if (keyIsDown(UP_ARROW)) {
    jump = true; //jump
  } else {
    jump = false; //does not jump
  } //end of jump
} //////////////end of key typed

/////////////////double clicked
function doubleClicked() {
  stage = 4;
} ///end of double clicked
///////////////////////////////////////////splash
function splash() {
  
  //timer stuff
  splashTime = totalTime; //begins splashscreen timer

  //appearance of game
  background(150, 230, 240);
//mouse 
   textSize(20);
  text("X: "+mouseX, 35, 20);
  text("Y: "+mouseY, 35, 45);
  //title
textFont(openFont, 30)
  fill(0);
  stroke(0);
  strokeWeight(0);
  textSize(100);
  text("BITCOIN RUSH", width / 2, 120);
//images
  image(arrow, 250, 300, 150, 100);
image(mouse, 775, 305, 200, 200);
  image(coin, 250, 430, 70, 70);
  image(coin, 750, 430, 70, 70);
  image(jeff, 100, 375, 125, 200);
image(elon, 900, 375, 125, 200);
  //instructions
  textSize(45);
  text("How to Play:", width/2, 175);
  textSize(20);
  text("Use Arrow Keys to Move Around", 250, 225);
  text("Press Up-Arrow Twice to Double Jump", 250, 250);
  text("Double Click to Pause", 750, 225);
  text("Collect All the Bitcoin to Progress", width/2, 420);
  text("Touching Jeff Bezos Subracts a Life", width/2, 440);
//click sceen to start

  text("CLICK ANYWHERE TO START", width / 2, 470);
   fill(255, 0, 0, fade)
  text("CLICK ANYWHERE TO START", width/2, 470)
  if (fade<0) fadeAmount=10; 
  if (fade>255) fadeAmount=-20; 
  fade += fadeAmount; 
} //close splash

function mouseClicked() {
  if (isMouseInsideText(message, messageX, messageY)) {
    window.open('https://blacklivesmatter.com/', '_blank');
  }
}

function isMouseInsideText(message, messageX, messageY) {
  const messageWidth = textWidth(message);
  const messageTop = messageY - textAscent();
  const messageBottom = messageY + textDescent();

  return mouseX > messageX && mouseX < messageX + messageWidth &&
    mouseY > messageTop && mouseY < messageBottom;
}


function preload() {
  coin = loadImage("download__4_-removebg-preview.png");
  elon = loadImage("elon.png");
  landscape = loadImage("landscape.jpg");
  jeff = loadImage("jeff.png");
  openFont = loadFont("montserrat.ttf");
  portal = loadImage("portal.png");
  bg = loadImage("bg.jpeg");
  arrow = loadImage("arrow_keys.png");
  mouse = loadImage("mouse.png");
  spike = loadImage("spike.png");
} //end of preLoad
