const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var monkey, monkeyImage, monkeyOceanImage;
var vineGroup, vineImage;
var bombGroup, bombImage;
var jungle, jungleImage;
var beach, beachImage;
var ocean, oceanImage;
var desert, desertImage;
var snow, snowImage;
var bambooforest, bambooforestImage;
var bananaImage, bananaGroup;
var coconutImage, coconutGroup;
var seaweedImage, seaweedGroup;
var raspberryImage, raspberryGroup;
var blueberryImage, blueberryGroup;
var bambooImageImage, bambooGroup;
var groundImage, platform, ground2;
var gameOver, gameOverImage;
var earth, earthImage;
var endScene, endImage;

var boomSound, splatSound, endSound;

var score = 0;

var intro = 1;
var gameIntro = 2;
var start1 = 3;
var play1 = 4;
var over = 5;
var start2 = 6;
var start3 = 7;
var start4 = 8;
var start5 = 9;
var start6 = 10;
var play2 = 11;
var play3 = 12;
var play4 = 13;
var play5 = 14;
var play6 = 15;
var pause = 16;
var end = 17;
var gameState = intro;

function preload(){
  jungleImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  monkeyImage = loadImage("monkey.png");
  monkeyOceanImage = loadImage("monkey2.png");
  vineImage = loadImage("vine.png");
  bombImage = loadImage("bomb.png");
  gameOverImage = loadImage("gameover.png");

  beachImage = loadImage("beach.jpg");
  coconutImage = loadImage("coconut.png");

  oceanImage = loadImage("underthesea.png");
  seaweedImage = loadImage("seaweed.png");

  desertImage = loadImage("desert2.jpg");
  raspberryImage = loadImage("raspberry.png");

  snowImage = loadImage("snow.jpg");
  blueberryImage = loadImage("blueberry.png");

  bambooforestImage = loadImage("bamboo2.jpg");
  bambooImage = loadImage("bamboo.png");

  earthImage = loadImage("earth.png");

  endImage = loadImage("party.jpg");

  boomSound = loadSound("boom.mp3");
  splatSound = loadSound("splat.mp3");
  endSound = loadSound("partytime.mp3");
}

function setup() {
  createCanvas(810,400);

  engine = Engine.create();
  world = engine.world;

  jungle = createSprite(600,200,800,500);
  jungle.addImage("jungle", jungleImage);
  jungle.scale = 1.5;
  jungle.velocityX = -(3 + 2 * score/10);
  jungle.visible = false;

  beach = createSprite(550,200,820,500);
  beach.addImage("beach", beachImage);
  beach.scale = 0.6;
  //beach.velocityX = -(3 + 2 * score/10);
  beach.visible = false;

  ocean = createSprite(400,200,820,500);
  ocean.addImage("ocean", oceanImage);
  ocean.scale = 0.8;
  //ocean.velocityX = -(3 + 2 * score/10);
  ocean.visible = false;

  desert = createSprite(400,200,820,500);
  desert.addImage("desert", desertImage);
  desert.scale = 2;
  //desert.velocityX = -(3 + 2 * score/10);
  desert.visible = false;

  bambooforest = createSprite(400,200,820,500);
  bambooforest.addImage("bambooforest", bambooforestImage);
  bambooforest.scale = 3.5;
  //bambooforest.velocityX = -(3 + 2 * score/10);
  bambooforest.visible = false;

  snow = createSprite(600,200,820,500);
  snow.addImage("snow", snowImage);
  snow.scale = 0.2;
  //snow.velocityX = -(3 + 2 * score/10);
  snow.visible = false;

  earth = createSprite(405,200,20,20);
  earth.addImage("earth", earthImage);
  earth.scale = 0.5;
  earth.visible = false;

  platform = new Ground(100,110,50,10);

  ground2 = createSprite(400,395,800,5);
  ground2.visible = false;

  monkey = createSprite(100,100,100,100);
  monkey.addImage("monkey", monkeyImage);
  monkey.addImage("monkey2", monkeyOceanImage);
  monkey.scale = 0.1;
  monkey.setCollider("circle",0,0,500);
  monkey.debug = false;

  gameOver = createSprite(400,200,20,20);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  endScene = createSprite(400,200,850,900);
  endScene.addImage("party", endImage);
  endScene.scale = 1.5;
  endScene.visible = false;
  
  bananaGroup = new Group();
  vineGroup = new Group();
  bombGroup = new Group();
  coconutGroup = new Group();
  bambooGroup = new Group();
  raspberryGroup = new Group();
  blueberryGroup = new Group();
  seaweedGroup = new Group();

}

function draw() {
  background("lightblue"); 

  if (gameState === intro){
    background("darkblue");
    
    earth.visible = true;
    
    monkey.x = 700;
    monkey.y = 300;
    monkey.scale = 0.3;

    if(keyDown(32)){
      gameState = gameIntro;
    }
  }

  if(gameState === gameIntro){
    background("lightblue");
    earth.visible = false;
    monkey.visible = true;
    monkey.scale = 0.1;

    if(keyDown(DOWN_ARROW)){
      gameState = start1;
    }

    if(keyDown(RIGHT_ARROW)){
      gameState = start2;
    }
  }

  if(gameState === start1){

    background("green");

    jungle.visible = true;
    monkey.visible = true;
    jungle.velocityX = 0;  
    jungle.x = 500;

    monkey.x = 100;
    monkey.y = 100;

    if(keyDown(32)){
      gameState = play1;
    }

    if(keyDown(RIGHT_ARROW)){
      gameState = start2;
    }

    monkey.velocityY = 0;

  }

  if(gameState === play1){

    if(jungle.x < 200){
      jungle.x = 600;
      jungle.velocityX = -(2 + 2 * score/10);
    }
    
    spawnBananas();
    spawnVines();
    spawnBombs();

    jungle.velocityX = -(2+2*score/10);

    if(keyDown(UP_ARROW) && monkey.y > 10){
      monkey.x = monkey.x + 5;
      monkey.y = monkey.y - 25;
    }
    if(keyDown(LEFT_ARROW) && monkey.x > 10){
      monkey.x = monkey.x - 10;
    }
    if(keyDown(RIGHT_ARROW) && monkey.x < 790){
      monkey.x = monkey.x + 10;
    }

    if(bananaGroup.isTouching(monkey)){
      score = score + 1;
      bananaGroup.destroyEach();
      splatSound.play();
    }

    if(bombGroup.isTouching(monkey)){
      gameState = over;
      boomSound.play();
    }

    monkey.collide(ground2);

    platform.x = 0;
    platform.y = 400;

    monkey.velocityY = monkey.velocityY + 0.8;

    if(score >= 25){
      gameState = pause;
      jungle.visible = true;
      monkey.visible = true;
    }
  }

  if(gameState === pause){
    jungle.velocityX = 0;
    ocean.velocityX = 0;
    desert.velocityX = 0;
    bambooforest.velocityX = 0;
    beach.velocityX = 0;
    snow.velocityX = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    
    bananaGroup.setVelocityXEach(0);
    bombGroup.setVelocityXEach(0);
    vineGroup.setVelocityXEach(0);
    coconutGroup.setVelocityXEach(0);

    bananaGroup.destroyEach();
    bombGroup.destroyEach();
    vineGroup.destroyEach();
    coconutGroup.setVelocityXEach(0);

    if(keyDown(32) && score === 25){
      gameState = start2;
    }
    if(keyDown(32)&& score === 50){
      gameState = start3;
    }
    if(keyDown(32) && score === 60){
      gameState = start4;
    }
    if(keyDown(32)&& score === 70){
      gameState = start5;
    }
    if(keyDown(32) && score === 80){
      gameState = start6;
    }
    if(keyDown(32) && score === 100){
      gameState = end;
    }
  }

  if(gameState === start2){
    beach.visible = true;
    jungle.visible = false;

    monkey.x = 100;
    monkey.y = 100;

    score = 0;

    if(keyDown(32)){
      gameState = play2;
    }
    if(keyDown(DOWN_ARROW)){
      gameState = start3;
    }
  }

  if(gameState === play2){
    spawnBombs();
    spawnCoconuts();

    beach.velocityX = -(2+2*score/10);
    
    if(beach.x < 250){
      beach.x = 550;
      beach.velocityX = -(2+2*score/10)
    }

    if(coconutGroup.isTouching(monkey)){
      score = score + 1;
      coconutGroup.destroyEach();
      splatSound.play();
    }
    if(bombGroup.isTouching(monkey)){
      gameState = over;
      boomSound.play();
    }

    if(keyDown(UP_ARROW) && monkey.y > 10){
      monkey.x = monkey.x + 5;
      monkey.y = monkey.y - 25;
    }
    if(keyDown(LEFT_ARROW) && monkey.x > 10){
      monkey.x = monkey.x - 10;
    }
    if(keyDown(RIGHT_ARROW) && monkey.x < 790){
      monkey.x = monkey.x + 10;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground2);

    if(score >= 50){
      gameState = pause;
      beach.velocityX = 0;
      monkey.velocityX = 0;
    }
  }

  if(gameState === start3){
    beach.visible = false;
    ocean.visible = true;
    monkey.visible = true;
    monkey.x = 100;
    monkey.y = 100;

    monkey.changeImage("monkey2",monkeyOceanImage);

    if(keyDown(RIGHT_ARROW)){
      gameState = play3;
    }
    if(keyDown(UP_ARROW)){
      gameState = start4;
    }
  }

  if(gameState === play3){
    spawnBombs();
    spawnSeaweed();

    monkey.changeImage("monkey2",monkeyOceanImage);

    ocean.velocityX = -(2+2*score/10);
    
    if(ocean.x < 300){
      ocean.x = 450;
      ocean.velocityX = -(2+2*score/10)
    }

    if(seaweedGroup.isTouching(monkey)){
      score = score + 1;
      seaweedGroup.destroyEach();
      splatSound.play();
    }
    if(bombGroup.isTouching(monkey)){
      gameState = over;
      boomSound.play();
    }

    if(keyDown(UP_ARROW) && monkey.y > 10){
      monkey.x = monkey.x + 5;
      monkey.y = monkey.y - 25;
    }
    if(keyDown(LEFT_ARROW) && monkey.x > 10){
      monkey.x = monkey.x - 10;
    }
    if(keyDown(RIGHT_ARROW) && monkey.x < 790){
      monkey.x = monkey.x + 10;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground2);

    if(score >= 60){
      gameState = pause;
      ocean.velocityX = 0;
      monkey.velocityX = 0;
    }
  }

  if(gameState === start4){
    ocean.visbible = false;
    desert.visible = true;
    monkey.visible = true;
    
    monkey.x = 100;
    monkey.y = 100;

    monkey.changeImage("monkey", monkeyImage);

    if(keyDown(32)){
      gameState = play4;
    }
    if(keyDown(RIGHT_ARROW)){
      gameState = start5
    }
  }

  if(gameState === play4){
    spawnBombs();
    spawnRaspberries();

    monkey.changeImage("monkey",monkeyImage);

    desert.velocityX = -(2+2*score/10);
    
    if(desert.x < 300){
      desert.x = 450;
      desert.velocityX = -(2+2*score/10)
    }

    if(raspberryGroup.isTouching(monkey)){
      score = score + 1;
      raspberryGroup.destroyEach();
      splatSound.play();
    }
    if(bombGroup.isTouching(monkey)){
      gameState = over;
      boomSound.play();
    }

    if(keyDown(UP_ARROW) && monkey.y > 10){
      monkey.x = monkey.x + 5;
      monkey.y = monkey.y - 25;
    }
    if(keyDown(LEFT_ARROW) && monkey.x > 10){
      monkey.x = monkey.x - 10;
    }
    if(keyDown(RIGHT_ARROW) && monkey.x < 790){
      monkey.x = monkey.x + 10;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground2);

    if(score >= 70){
      gameState = pause;
      desert.velocityX = 0;
      monkey.velocityX = 0;
    }
  }

  if(gameState === start5){
    desert.visbible = false;
    bambooforest.visible = true;
    monkey.visible = true;
    
    monkey.x = 100;
    monkey.y = 100;

    if(keyDown(32)){
      gameState = play5;
    }
    if(keyDown(UP_ARROW)){
      gameState = start6;
    }
  }

  if(gameState === play5){
    desert.visible = false;
    ocean.visible = false;
    beach.visible = false;
    background("lightgreen");

    spawnBombs();
    spawnBamboo();

    bambooforest.velocityX = -(2+2*score/10);
    
    if(bambooforest.x < 400){
      bambooforest.x = 500;
      bambooforest.velocityX = -(2+2*score/10)
    }

    if(bambooGroup.isTouching(monkey)){
      score = score + 1;
      bambooGroup.destroyEach();
      splatSound.play();
    }
    if(bombGroup.isTouching(monkey)){
      gameState = over;
      boomSound.play();
    }

    if(keyDown(UP_ARROW) && monkey.y > 10){
      monkey.x = monkey.x + 5;
      monkey.y = monkey.y - 25;
    }
    if(keyDown(LEFT_ARROW) && monkey.x > 10){
      monkey.x = monkey.x - 10;
    }
    if(keyDown(RIGHT_ARROW) && monkey.x < 790){
      monkey.x = monkey.x + 10;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground2);

    if(score >= 80){
      gameState = pause;
      bambooforest.velocityX = 0;
      monkey.velocityX = 0;
    }
  }

  if(gameState === start6){
    snow.visible = true;
    bambooforest.visible = false;
    monkey.visible = true;
    
    monkey.x = 100;
    monkey.y = 100;

    if(keyDown(32)){
      gameState = play6;
    }
  }

  if(gameState === play6){
    desert.visible = false;
    ocean.visible = false;
    beach.visible = false;
    bambooforest.visible = false;
    snow.visible = true;
    background("lightblue");

    spawnBombs();
    spawnBlueberries();

    snow.velocityX = -(2+2*score/10);
    
    if(snow.x < 270){
      snow.x = 500;
      snow.velocityX = -(2+2*score/10)
    }

    if(blueberryGroup.isTouching(monkey)){
      score = score + 1;
      blueberryGroup.destroyEach();
      splatSound.play();
    }
    if(bombGroup.isTouching(monkey)){
      gameState = over;
      boomSound.play();
    }

    if(keyDown(UP_ARROW) && monkey.y > 10){
      monkey.x = monkey.x + 5;
      monkey.y = monkey.y - 25;
    }
    if(keyDown(LEFT_ARROW) && monkey.x > 10){
      monkey.x = monkey.x - 10;
    }
    if(keyDown(RIGHT_ARROW) && monkey.x < 790){
      monkey.x = monkey.x + 10;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground2);

    if(score >= 100){
      gameState = end;
      snow.velocityX = 0;
      monkey.velocityX = 0;
    }
  }

  if(gameState === over){
    jungle.velocityX = 0;
    beach.velocityX = 0;
    ocean.velocityX = 0;
    desert.velocityX = 0;
    bambooforest.velocityX = 0;
    snow.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    bombGroup.setVelocityXEach(0);
    vineGroup.setVelocityXEach(0);
    coconutGroup.setVelocityXEach(0);
    seaweedGroup.setVelocityXEach(0);
    raspberryGroup.setVelocityXEach(0);
    bambooGroup.setVelocityXEach(0);
    blueberryGroup.setVelocityXEach(0);
    monkey.velocityX = 0;

    monkey.visible = false;
    gameOver.visible = true;

    bananaGroup.destroyEach();
    bombGroup.destroyEach();
    coconutGroup.destroyEach();
    vineGroup.destroyEach();
    seaweedGroup.destroyEach();
    raspberryGroup.destroyEach();
    bambooGroup.destroyEach();
    blueberryGroup.destroyEach();

    if(keyDown(DOWN_ARROW)){
      reset();
    }
  }

  if(gameState === end){
    snow.visible = false;
    bambooforest.visible = false;
    beach.visible = false;
    jungle.visible = false;
    desert.visible = false;
    ocean.visible = false;
    endScene.visible = true;

    //endSound.play();

    monkey.visible = true;
    monkey.scale = 0.2;
    monkey.velocityX = 1;
    monkey.velocityY = -1;

    if(monkey.x > 390){
      monkey.velocityX = -1;
    }
    if(monkey.x < 10){
      monkey.velocityX = 1;
    }
    if(monkey.y < 10){
      monkey.velocityY = 1;
    }

    monkey.bounceOff(ground2);

    jungle.velocityX = 0;
    beach.velocityX = 0;
    ocean.velocityX = 0;
    desert.velocityX = 0;
    bambooforest.velocityX = 0;
    snow.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    bombGroup.setVelocityXEach(0);
    vineGroup.setVelocityXEach(0);
    coconutGroup.setVelocityXEach(0);
    seaweedGroup.setVelocityXEach(0);
    raspberryGroup.setVelocityXEach(0);
    bambooGroup.setVelocityXEach(0);
    blueberryGroup.setVelocityXEach(0);
    monkey.velocityX = 0;

    bananaGroup.destroyEach();
    bombGroup.destroyEach();
    coconutGroup.destroyEach();
    vineGroup.destroyEach();
    seaweedGroup.destroyEach();
    raspberryGroup.destroyEach();
    bambooGroup.destroyEach();
    blueberryGroup.destroyEach();

    if(keyDown(32)){
      reset();
    }
  }

  drawSprites();
  monkey.display();

  Engine.update(engine);

  if(gameState === start1){
    textSize(30);
    fill("white");
    text("Collect 25 bananas to move to the next level",150,200);
    text("Press space bar to continue",250,250);
    text("Or press right arrow to go to next level",200,300);
    textSize(50);
    stroke("black");
    strokeWeight(2);
    text("Level 1",350,75);
  }
  if(gameState === over){
    fill("white");
    textSize(15);
    stroke("black");
    strokeWeight(1);
    text("Press down arrow to restart",300,390);
  }

  if(gameState === start3){
    textSize(30);
    stroke("darkgray");
    strokeWeight(2);
    fill("white");
    text("Collect 60 seaweed to win!",200,200);
    text("Press right arrow to play",200,250);
    text("Or press up arrow to go to next level",200,300);
    textSize(40);
    stroke("black");
    strokeWeight(2);
    text("Level 3",350,100);
  }

  if(gameState === start4){
    textSize(30);
    fill("white");
    stroke("darkgray");
    strokeWeight(2);
    text("Collect 70 raspberries to win!",200,200);
    text("Press space to play",250,250);
    text("Or press right arrow to go to next level",200,300);
    textSize(40);
    stroke("black");
    strokeWeight(2);
    text("Level 4",350,100);
  }

  if(gameState === start5){
    textSize(30);
    fill("white");
    stroke("darkgray");
    strokeWeight(2);
    text("Collect 80 bamboo to win!",250,200);
    text("Press space to play",300,250);
    text("Or press up arrow to go to next level",175,300);
    textSize(40);
    stroke("black");
    strokeWeight(2);
    text("Level 5",350,100);
  }

  if(gameState === start6){
    textSize(30);
    fill("black");
    text("Collect 100 blueberries to win the whole game!",150,200);
    text("Press space to play",300,250);
    textSize(40);
    fill("black");
    stroke("white");
    strokeWeight(2);
    text("Level 6: Final Level", 275,100);
  }

  if(gameState === gameIntro){
    textSize(40);
    fill("white");
    stroke("green");
    strokeWeight(2);
    text("How to Play: ",300,50);
    textSize(25);
    strokeWeight(1);
    text("Help Moe the monkey collect food from around the globe",70,100);
    text("To move : ", 70,150);
    textSize(20);
    text("Use up arrow to jump up", 70, 180);
    text("Use the left and right arrows to move side to side", 70,210);
    text("Collect all the food you need to pass the level", 220,260);
    text("There is a total of six levels to pass",255,290)
    text("But watch out for the bombs!",280,320);
    text("Press down arrow to continue to first level",280,350);
    text("Press right arrow to continue to second level",280,380);
  }

  if(gameState === intro){
    textSize(70);
    fill("white");
    stroke("brown");
    strokeWeight(3);
    text("Monkey",2,130);
    text("Chow",575,130);
    textSize(20);
    text("Press Space to Continue",50,350);
  }
if(gameState === play1 || gameState === play2 || gameState === play3 || gameState === play4 || gameState === play5 || gameState === play6){
  textSize(15);
  fill("white");
  text("Score : " + score,700,20);
}

if(gameState === start2){
  fill("white");
  textSize(30);
  text("Collect 50 coconuts to win!",250,200);
  text("Press space bar to play",250,250);
  text("Or press down arrow to preceed to next level",125,300);
  textSize(40);
  stroke("black");
  strokeWeight(2);
  text("Level Two!",300,100);
}

if(gameState === pause){
  textSize(25);
  fill("white");
  stroke("darkgray");
  strokeWeight(2);
  text("Hurray! You've passed the level!",260,150);
  text("Press space to go onto the next level!",250,250);
}

if(gameState === end){
  textSize(45);
  fill("white");
  stroke("cyan");
  strokeWeight(1);
  text("Hurray! You've won the game!",250,100);
  textSize(20);
  text("Press space to restart",300,300);
}
}

function spawnBananas(){
  if(frameCount % 60 === 0){
    var banana = createSprite(790,100,20,20);
    banana.y = Math.round(random(10,350));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -(3 + 2 * score/10);
    banana.lifetime = -1;
    bananaGroup.add(banana);
  }
}

function spawnVines(){
  if(frameCount % 180 === 0){
    var vine = createSprite(790,100,20,20);
    vine.addImage("vine", vineImage);
    vine.scale = 0.5;
    vine.velocityX = -(2+2*score/10);
    vine.lifetime = -1;
    vineGroup.add(vine);
  }
}

function spawnBombs(){
  if(frameCount % 240 === 0){
    var bomb = createSprite(790,100,20,20);
    bomb.y = Math.round(random(10,350));
    bomb.velocityX = -(2+2*score/10);
    bomb.addImage(bombImage);
    bomb.scale = 0.1;
    bomb.lifeTime = -1;
    bombGroup.add(bomb);
  }
}

function spawnCoconuts(){
  if(frameCount % 60 === 0){
    var coconut = createSprite(790,100,20,20);
    coconut.y = Math.round(random(10,350));
    coconut.addImage(coconutImage);
    coconut.velocityX = -(2+2*score/10);
    coconut.scale = 0.02;
    coconut.lifetime = -1;
    coconutGroup.add(coconut);
  }
}

function spawnSeaweed(){
  if(frameCount % 60 === 0){
    var seaweed = createSprite(790,100,20,20);
    seaweed.y = Math.round(random(10,350));
    seaweed.addImage(seaweedImage);
    seaweed.velocityX = -(2+2*score/10);
    seaweed.scale = 0.1;
    seaweed.lifetime = -1;
    seaweedGroup.add(seaweed);
  }
}

function spawnRaspberries(){
  if(frameCount % 60 === 0){
    var raspberry = createSprite(790,100,20,20);
    raspberry.y = Math.round(random(10,350));
    raspberry.addImage(raspberryImage);
    raspberry.velocityX = -(2+2*score/10);
    raspberry.scale = 0.01;
    raspberry.lifetime = -1;
    raspberryGroup.add(raspberry);
  }
}

function spawnBamboo(){
  if(frameCount % 60 === 0){
    var bamboo = createSprite(790,100,20,20);
    bamboo.y = Math.round(random(10,350));
    bamboo.addImage(bambooImage);
    bamboo.velocityX = -(2+2*score/10);
    bamboo.scale = 0.05;
    bamboo.lifetime = -1;
    bambooGroup.add(bamboo);
  }
}

function spawnBlueberries(){
  if(frameCount % 60 === 0){
    var blueberry = createSprite(790,100,20,20);
    blueberry.y = Math.round(random(10,350));
    blueberry.addImage(blueberryImage);
    blueberry.velocityX = -(2+2*score/10);
    blueberry.scale = 0.01;
    blueberry.lifetime = -1;
    blueberryGroup.add(blueberry);
  }
}

function reset(){
  window.location.reload();
}