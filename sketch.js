var gif;
var man,man1;
var ground;
var bg1;
var m,m1;
var m2,m2i;
var f,f1;
var w,w1;
var score = 0;
var s,s1;
var d,d1;
var b,b1;
var lifetime = 0;
var gameState = "serve";
var coins = 0;
var b3;
var c;
var l1;

function preload(){ 
    //man1 = loadAnimation("IMAGES/soldier.png","IMAGES/soldier1.png");
    man1 = loadImage("IMAGES/soldier.png");

    bg1 = loadImage("IMAGES/bg2.jpg");

    m= loadImage("IMAGES/mon1.png");

    f = loadImage("IMAGES/fireball.png");

    w = loadImage("IMAGES/waterball.png");

    s = loadImage("IMAGES/sw.png");

    m2 = loadImage("IMAGES/m211.png");

    d = loadImage("IMAGES/dia.png");

    b = loadImage("IMAGES/bo.png");

    b3 = loadImage("IMAGES/retro.jpg");

    c = loadImage("IMAGES/coin.png");

    lost = loadImage("IMAGES/loose.jpg");
}    

function setup(){
    createCanvas(displayWidth,displayHeight);

    man = createSprite(50,400);
    man.addImage(man1);
    man.scale = 0.3;

    ground = createSprite(800,800,800,5);
    ground.visible = false;

    f1group = new Group();

    w1g = new Group();

    s1g = new Group();

    m1g = new Group();

    m2g = new Group();

    d1g = new Group();

    b1g = new Group();

}

function draw(){

    background(bg1);

    fill("white");
    textSize(30);

    if(gameState==="serve")
    {
      background(0);
      text("Press 's' to Start the game", 200,100);
      
      text("Press up/down/left/right to move the player", 200,200);
      
      text("Press ctrl to use the sword", 200,300);
      
      text("Press space to release a waterball", 200,400);
    }
    if (gameState==="serve" && keyDown("s"))
    {
      gameState="play";
    }

    if(gameState==="play")
    {
          text("score = " + score,430,50 );
      
          text("lifetime = " + lifetime,250,50 );
      
          man.collide(ground);
      
          if (keyWentDown("space")|| touches.length>0){
            touches =[];
            w1 = createSprite(man.x,man.y);
            w1.addImage(w);
            w1.scale = 0.1;
            w1.velocityX = 5;
            w1g.add(w1);
              }
      
            if (keyWentDown("ctrl") || touches.length>0){
            touches =[];
            s1 = createSprite(man.x,man.y);
            s1.addImage(s);
            s1.scale = 0.1;
            s1.velocityX = 5;
            s1g.add(s1);
                  }
      
          if(w1g.isTouching(f1group)){
            f1.destroy();
            score++;
          }
      
          if(man.isTouching(d1g)){
            lifetime++;
            coins = coins + 5;
            d1.destroy();
          }
      
          if(man.isTouching(b1g)){
            lifetime = lifetime - 1;
            b1.destroy();
          }
      
          if(s1g.isTouching(m1g,m2g)){
            m1.destroy();
            m2i.destroy();
            score++;
          }
      
          if (keyDown("UP_ARROW")){
            if(man.y>25){
              man.y = man.y-10;
            }
              }
      
          if (keyDown("DOWN_ARROW")){
              man.y = man.y+10;
          }
      
          if (keyDown("LEFT_ARROW")){
            man.x = man.x-10;
          }        
      
          if (keyDown("RIGHT_ARROW")){
            man.x = man.x+10;
            }        
      
          if(frameCount % 120 === 0){
      
          m1 = createSprite(800,random(0,1000));
          m1.addImage(m);
          m1.scale = 0.1;
          m1.velocityX = -5;
          m1g.add(m1);
      
          m2i = createSprite(800,random(0,1000));
          m2i.addImage(m2);
          m2i.scale = 0.1;
          m2i.velocityX = -5;
          m2g.add(m2i);
          
          }
      
          if(frameCount % 180 === 0){
            f1 = createSprite(800,random(0,1000));
            f1.addImage(f);
            f1.scale = 0.2;
            f1.velocityX = -5;
            f1group.add(f1);
          }
      
          if(frameCount % 150 === 0){
            d1 = createSprite(800,random(0,1000));
            d1.addImage(d);
            d1.scale = 0.1;
            d1.velocityX = -5;
            d1g.add(d1);
          
            b1 = createSprite(800,random(0,1000));
            b1.addImage(b);
            b1.scale = 0.1;
            b1.velocityX = -5;
            b1g.add(b1);
      
          }
          drawSprites();  

    if(lifetime <0){
      gameState = "end";
    }
}

    if(gameState === "end"){
      background(lost);
      fill("black");
      text("YOU LOST", 200,100);
    }
    if(gameState === "play" && lifetime === 2 && score >= 1){
      gameState = "win";
    }

    if(gameState === "win"){
      background(b3);
      //text("YOU WIN", 200,100);
      text("Press R to RESTART ",200,100);
      text("coins = "+ coins, 200,150);
    }

    if(keyDown("r") && gameState ==="win"){
      gameState ="serve";
      score = 0;
      lifetime =0;
    }

}