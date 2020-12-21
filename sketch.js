var gameState="play";
var towerImage,tower;
var ghostImage,doorImage,climberImage,ghostImage2;
var doorsGroup,door;
var climbers,climbersGroup;
var ghost;
var invisibleBlock,invisibleBlockGroup;
var gameSound;
var score=0;

function preload(){
    towerImage=loadImage("tower.png");
    ghostImage=loadImage("ghost-standing.png");
    doorImage=loadImage("door.png");
    climberImage=loadImage("climber.png");
    ghostImage2=loadImage("ghost-jumping.png");
    gameSound=loadSound("spooky.wav");
}

function setup(){
    createCanvas(600,600);

    gameSound.loop();

    tower=createSprite(300,300);
    tower.addImage("tower",towerImage);
    tower.velocityY=1;

    doorsGroup=new Group();
    climbersGroup=new Group();
    invisibleBlockGroup=new Group();

    ghost=createSprite(300,300);
    ghost.addImage("bhoot",ghostImage);
    ghost.scale=0.3;
    ghost.setVelocity(0,0);
}

function draw(){
    background(0);




    if(gameState==="play"){
      if(keyDown("left_arrow")){
         ghost.velocityX=-2;
      }
      if(keyDown("right_arrow")){
           ghost.velocityX=2;
      }

      if(keyDown("space")){
           ghost.velocityY=-5;
      }

      ghost.velocityY=ghost.velocityY+0.5;


      if(tower.y>400){
          tower.y=300;
      }


      spawnDoors();

      if(ghost.isTouching(climbersGroup)){
          ghost.velocityY=0;
    }

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
        ghost.destroy();
        gameState="end";
    }
    drawSprites();
      
    score = score + Math.round(frameRate()/60);
    textSize(40);
    fill("yellow");
    text(score,400,100);

    }


    if(gameState==="end"){
        textSize(50);
        fill("yellow");
        stroke("yellow");
        text("GAME OVER",150,300)

        

    }

  
  
  

}

function spawnDoors(){
  if(frameCount%250===0){
    door=createSprite(200,-52);
    door.addImage("door",doorImage);
    door.x=Math.round(random(150,450));
    door.velocityY=1;
    door.lifetime=650;
    doorsGroup.add(door);
    
    ghost.depth=door.depth;
    ghost.depth += 1;
    
    climbers=createSprite(200,10);
    climbers.addImage("climber",climberImage);
    climbers.velocityY=1;
    climbers.x=door.x;
    climbers.lifetime=650;
    climbersGroup.add(climbers);
    
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climbers.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=650;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug=false;
    //invisibleBlock.visible=false;
  }
}