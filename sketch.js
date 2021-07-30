var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost  = createSprite(300,560);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;

  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  
  if(gameState==="play"){

  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("right")){
    ghost.x = ghost.x + 5;
  }
  if(keyDown("left")){
    ghost.x = ghost.x - 5;
  }
  if(keyDown("space")){
    ghost.velocityY = - 5; 
  }
  ghost.velocityY = ghost.velocityY + 0.3;

  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY = 0;
  }
  if(ghost.isTouching(invisibleBlockGroup) || ghost.y>600){
    ghost.destroy();
    gameState= "end";
  }


  spawnObstacles();
    drawSprites();
  }
  if(gameState === "end"){
    stroke("blue");
    fill("red");
    textSize(30);
    text("Game Over", 250,250);
  }

  
}

function spawnObstacles(){
  if(frameCount%240 === 0){
  door = createSprite(200,0);
  door.x = Math.round(random(120,400));
  door.addImage(doorImg);
  door.velocityY = 3;
  doorsGroup.add(door);
  door.lifetime = 200;

  climber = createSprite(200,70);
  climber.x = door.x;
  climber.addImage(climberImg);
  climber.velocityY = 3;
  climbersGroup.add(climber);
  climber.lifetime = 200;

  invisibleBlock = createSprite(200,80)
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  invisibleBlock.debug = true;
  invisibleBlock.velocityY = 3;
  invisibleBlock.x = climber.x;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.lifetime = 200;

  ghost.depth = door.depth;
  ghost.depth  += 1;
  }
} 