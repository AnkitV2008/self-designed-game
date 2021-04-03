
var START =0
var PLAY = 1;
var END = 2;

var gameState = START
var start,startImg;
var alien
var ground
var invisibleGround
var groundImg
var monsterImg
var background1,background1Img
var cryImg
var restartImg,gameoverImg,restart,gameover
var jumpSound , checkPointSound, dieSound
var sound
var Score = 0


function preload(){
  alien_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png");
  
  //groundImg=loadImage("sprite_base.png")
  groundImg=loadImage("base.png")
  
  monsterImg=loadAnimation("monster1.png","monster2.png")
  background1Img=loadImage("bg1.png")
  
  cryImg=loadImage("cry.png")
  
  startImg=loadImage("poster.jpg")
  
  restartImg=loadImage("restart.png")
  gameoverImg=loadImage("gOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  sound = loadSound("sound.wav");
}

function setup(){
    createCanvas(700,400)
  
  start=createSprite(350,175)
  start.addImage(startImg)
  start.scale=2
  
  background1=createSprite(350,120)
  background1.addImage(background1Img)
  background1.scale=2
  background1.visible =false;
  
  alien = createSprite(150,245,20,10);
  alien.addAnimation("running",alien_running)
  alien.addAnimation("crying",cryImg)
  alien.scale = 1.5;
  alien.visible =false;
  
   ground = createSprite(350,350,700,10);
  ground.scale=1.8
  ground.addImage(groundImg);
ground.visible =false;
  
   invisibleGround = createSprite(250,310,700,5);
  invisibleGround.visible =false;

  obstaclesGroup = createGroup();
  
  restart=createSprite(350,250,20,20)
  restart.addImage(restartImg)
    restart.scale = 0.7;
restart.visible =false;
  
  gameOver = createSprite(350,170);
  gameOver.addImage(gameoverImg);
    gameOver.scale = 0.3;
gameOver.visible =false;
  
    sound.loop();

alien.debug=false
  
}

function draw (){
  background("black")
  
  
  
  if(gameState === START){
    
    if(keyDown("space")){
      gameState = PLAY;
    } 
    
  }
  
 else if (gameState === PLAY){
  start.destroy();
   
     background1.visible =true
     alien.visible =true;
     ground.visible =true;
    gameOver.visible =false;
    restart.visible =false;

    Score = Score + Math.round(getFrameRate()/30)

    if(Score>0 && Score%200 === 0){
       checkPointSound.play() 
    }
    
    
  alien.setCollider("circle",0,0,30);
  console.log(alien.y)
  
  if(keyDown("space") && alien.y >= 262) {
      alien.velocityY = -18;
      jumpSound.play();
  }
  
  alien.velocityY = alien.velocityY + 0.8;
      ground.velocityX = -(4 + 3* Score/80)
  
  if(ground.x<0){
    
    ground.x=ground.width/2
  }

  spawnObstacles();
    if(obstaclesGroup.isTouching(alien)){
      
      gameState=END;
      dieSound.play()
    }
}
if (gameState===END){
  
              gameOver.visible =true;
        restart.visible = true;

  ground.velocityX=0
      obstaclesGroup.setLifetimeEach(-1);

     obstaclesGroup.setVelocityXEach(0);
  
  alien.changeAnimation("crying",cryImg)
  alien.scale=0.3
    alien.setCollider("circle",0,125,60);
  
  
  if(mousePressedOver(restart)) {
      reset();
    }

}

  alien.collide(invisibleGround)

  drawSprites();

  fill("black");
  textFont("Agency FB")
  textSize(18);
  textStyle(BOLD);
  text("Score: "+ Score,600,50)

  if(gameState === START){
    stroke("white");
    fill("black")
    textFont("Agency FB")
    textSize(50);
    text("Press Space to continue ", 150,300); 
  }  
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
    alien.scale = 1.5;

  alien.changeAnimation("running",alien_running);
  
  Score = 0
}


function spawnObstacles(){
 
  if(frameCount%80===0){
     obstacle=createSprite(700,285,20,20)
    obstacle.addAnimation("monster",monsterImg)
    obstacle.scale=0.2
     obstacle.velocityX = -(4 + 3* Score/60)

     obstacle.lifetime=400;

    obstaclesGroup.add(obstacle);

  }
  
  
}
