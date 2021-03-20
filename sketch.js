var database;
var pet, dogImg; 
var happyDog, happyDogImg;
var cat, catImg;
var foodS, foodStock;
var welcome;
var button1, button2;
var ask, puppy, kitten, kittenFed;

var gameState = ask;

function preload()
{
	dogImg = loadImage("images/dog.png");
  happyDogImg = loadImage("images/dog1.png");
  catImg = loadImage("images/cat.png")
}

function setup() {
  database = firebase.database();
  console.log(database);
  
  createCanvas(500, 500);

  welcome = createElement('h1');
 
  button1 = createButton('Dog');
  button2 = createButton('Cat');

  pet = createSprite(250, 250, 20, 20)
 // dog.addImage(catImg);
 // dog.scale = 0.2;
  pet.visible = false;

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
 
  
  if(keyWentDown(UP_ARROW) && gameState === "puppy"){
    writeStock(foodS);
    pet.addImage(happyDogImg);
  //  console.log("working");

  }

  if(keyWentDown(UP_ARROW) && gameState === "kitten" ){
    writeStock(foodS);
 //   gameState = "kittenFed";
   // pet.addImage(happyDogImg);
  //  console.log("working");

  }
 /* if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    pet.addImage(happyDogImg);
  //  console.log("working");

  }*/

  fill(255, 255, 255);
 


  if(gameState === ask){
    //console.log("working");
    background("White");
    
    welcome.html("Choose your pet!");
    welcome.position(500, 180);
   
    button1.position(540, 300);
    button2.position(640, 300);
  }
  else if(gameState === "puppy"){
    pet.visible = true;
   // console.log("working");
    background(46, 139, 87); 
    textSize(25);
    text("Press UP_ARROW Key to feed Benji", 50, 50);
    textSize(22);
    text("Food remaining:" + foodS, 120, 150);
  }
  else if(gameState === "kitten"){
    pet.visible = true;
   // console.log("working");
    background(46, 139, 87); 
    textSize(25);
    text("Press UP_ARROW Key to feed Lucy", 50, 50);
    textSize(22);
    text("Food remaining:" + foodS, 120, 150);
  }
  
  buttonPressed();
  //readStock();
  //writeStock();
  drawSprites();
  
}

function buttonPressed(){

  button1.mousePressed(()=>{
    welcome.hide();
    button1.hide();
    button2.hide();
    pet.addImage(dogImg);
    pet.scale = 0.2;
    gameState = "puppy";

   

 })

  button2.mousePressed(()=>{
    welcome.hide();
     button1.hide();
     button2.hide();
    pet.addImage(catImg);
     pet.scale = 0.25;
     gameState = "kitten";

   

 })
 
 
}
  function readStock(data){
    foodS = data.val();
}

function writeStock(x){
  
  if(x<=0){
     x = 0;
  }
  else{
    x = x-1;
  }
  
  database.ref('/').update({
    Food: x
  })
}

