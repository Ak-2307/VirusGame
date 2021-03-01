var backgroundImg;
var wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9, wall10, wall11, wall12, wall13, wall14, wall15;
var player, playerImg;
var glitch, glitchGroup, glitchImg;
var ksecu,ksecuImg;
var border1, border2, border3, border4;
const PLAY=1;
const END=0;
const WON = 2;
var gameState=PLAY;
var flag=0;
var vis = 1;


function preload(){
  playerImg=loadImage("images/Player.png");
  ksecuImg=loadImage("images/secretcode.jpg");
  glitchImg=loadImage("images/glitch.jpg");
  backgroundImg=loadImage("images/backgroundGif.gif");

}

function setup(){
  
  canvas = createCanvas(displayWidth - 20, displayHeight-30);

  //the top and bottom border respectively
  border1=createSprite(displayWidth/2-10, displayHeight-(height-50), width-100, 20);
  border1.shapeColor=rgb(18,13,20);
  border2=createSprite(displayWidth/2-10, displayHeight-50, width-100, 20);
  border2.shapeColor=rgb(18,13,20);

  //the left and right respectively
  border3=createSprite(displayWidth-(width-40), displayHeight/2+10, 20, height-100);
  border3.shapeColor=rgb(18,13,20);
  border4=createSprite(displayWidth-80, displayHeight/2+10, 20, height-100);
  border4.shapeColor=rgb(18,13,20);

  //the horizontal walls
  wall1=createSprite(displayWidth/4-50, displayHeight/4, 300, 10);
  wall1.shapeColor=rgb(18,13,20);
  wall2=createSprite(displayWidth/2+80, displayHeight/2, 350, 10);
  wall2.shapeColor=rgb(18,13,20);
  wall7=createSprite(displayWidth*3/4, displayHeight/2-250, 350,10);
  wall7.shapeColor=rgb(18,13,20);

  //the vertical walls
  wall3=createSprite(displayWidth-960, displayHeight/2-(130), 10, 200);
  wall3.shapeColor=rgb(18,13,20);
  wall4=createSprite(displayWidth/4-50, displayHeight/2+50, 10, 200);
  wall4.shapeColor=rgb(18,13,20);
  wall5=createSprite(displayWidth/2, displayHeight/2+200, 10, 200);
  wall5.shapeColor=rgb(18,13,20);
  wall6=createSprite(displayWidth*3/4, displayHeight/2+50, 10, 200);
  wall6.shapeColor=rgb(18,13,20);

//creating the player 
player=createSprite(displayWidth-100, displayHeight-100, 50,50);
player.addImage("player image", playerImg);
player.scale=0.15;

//creating the key
ksecu=createSprite(displayWidth/15, displayHeight-(height-90), 30,30);
ksecu.addImage("the secret code", ksecuImg);
ksecu.scale=0.3;

//glitch group
glitchGroup = new Group();

}


function draw(){
  background(backgroundImg);
  
if(gameState === PLAY){
    //adding control to the player with arrow keys
    controlPlayer();

    player.bounceOff(border1);
    player.bounceOff(border2);
    player.bounceOff(border3);
    player.bounceOff(border4);
    player.bounceOff(wall1);
    player.bounceOff(wall2);
    player.bounceOff(wall3);
    player.bounceOff(wall4);
    player.bounceOff(wall5);
    player.bounceOff(wall6);
    player.bounceOff(wall7);

      if(glitchGroup.isTouching(player) && flag===0){
        // life=life+1;
        flag=1;
        vis = vis -0.01;
        console.log("vis "+ vis);
        if(vis <= 0 ){
          gameState = END ;
          player.remove();
        }
        else{
          var rgb = "rgba(255,255,255,"+vis+")";
          console.log(rgb);
          //player.tint="rgb(117, 19, 163)";
          player.tint=rgb;
        }
     
     }

          //incase player reaches end !!!
          if(player){
           if(ksecu.isTouching(player)){
             player.collide(ksecu);
            gameState = WON;
          
          }
      }
    
}
else if(gameState === END ){
  text("Game over ",displayWidth/2,displayHeight/2);
}
else if (gameState === WON){
  text("You Won!!!",displayWidth/4,displayHeight/4);
  glitchGroup.destroyEach();
}

if(gameState !== WON){
  spawnglitch();
}


drawSprites();
}

    function controlPlayer(){
      if(keyDown(UP_ARROW)){
        player.y=player.y-30;
        flag=0;
      }
      if(keyDown(DOWN_ARROW)){
        player.y=player.y+30;
        flag=0;
      }
      if(keyDown(LEFT_ARROW)){
        player.x=player.x-30;
        flag=0;
      }
      if(keyDown(RIGHT_ARROW)){
        player.x=player.x+30;
        flag=0;
      }
    }

function spawnglitch(){
  if(frameCount%50==0){
    glitch=createSprite(10,10,20,20);
    glitch.addImage("the glitch blocks", glitchImg);
    glitch.scale=0.1;
    glitch.x=Math.round(random(displayWidth-(width-20), displayWidth-40));
    glitch.y=Math.round(random(displayHeight-(height-50), displayHeight-30));
    glitchGroup.add(glitch);
  }
}
