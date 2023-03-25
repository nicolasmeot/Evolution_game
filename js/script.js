//Définition des variables
let ctx = document.getElementById('canvas').getContext('2d');
let canvasWidth = 1000;
let canvasHeight = 700;
let caseWidth = 50;
let characterWidth = 40;
let intervalOn;
let frame

//variables du glitch 
let compte
let intervalGlitch

// Initialization of Characters
let mainChar
let characters = []
let nbOfCharacters = 20 ;
let stadeArr = [
  {stadeName : "Egg", stadeImg :'./images/Egg_detoure.png'},
  {stadeName : "Chick", stadeImg :'./images/Chick.png'},
  {stadeName : "Chicken", stadeImg :'./images/Chicken.png'},
  {stadeName : "Dino", stadeImg :'./images/Dino_detoure.png'},
  {stadeName : "SuperDino", stadeImg :'./images/SuperDino_detoure.png'},
]

// Fight initialization
let fightWindow = document.getElementById("encounter");
let rockBtn = document.getElementById("Rock");
let paperBtn = document.getElementById("Paper");
let scissorsBtn = document.getElementById("Scissors");
let resultMain
let opponent


// Game sequence
function startGame() {
  // Clean canvas and Characters array if re-start
  clear();
  characters.splice(0,characters.length)
  //Initializing the new game
  mainChar = new mainCharacter(350,500,"red","Nico")
  createCharacters();
  frame = 1 
  intervalOn = setInterval(updateGameArea,16);
  document.getElementById('stop-button').onclick = () => {stopGame();}
}

function updateGameArea(){
  clear();
  //Moving bots
  if(frame % 100 === 0){
    for(let el of characters){
      let tempCharacters= characters.slice();
      tempCharacters.splice(tempCharacters.indexOf(el),1);
      el.moveCharacter();
      for(let element of tempCharacters){
        if(checkPosition(el,element) === true && element.stade === el.stade){
          console.log(`fight between ${characters.indexOf(el)} and ${characters.indexOf(element)}`)
          battle(el, element)
        }
      }   
    }
  }
  for(let el of characters){
    if(checkPosition(el,mainChar) === true && el.stade === mainChar.stade){
      stopGame();
      fightWindow.setAttribute('class', 'visible');
      //mainBattle(el,mainChar);
      opponent = el;
      console.log(opponent.name);  
    }
  }
  for(let el of characters){
    el.draw();
  }
  mainChar.draw();
  mainChar.contour();
  currentStade();
  frame+=1;
}

// 
function clear () {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function resume() {
  intervalOn = setInterval(updateGameArea,16);
}

function stopGame(){
  clearInterval(intervalOn)
  }

function checkPosition(character1,character2){
  if(character1.x === character2.x && character1.y === character2.y){
    return true
  }
}

// User's commands

document.getElementById('start-button').onclick = () => {startGame();};


document.addEventListener('keydown', (e) => {
  e.preventDefault();
  switch (e.keyCode) {
    case 38: // up arrow
      if(mainChar.y>=5){ 
      mainChar.y -= 50;
      }
      break;
    case 40: // down arrow
      if(mainChar.y<(canvasHeight-caseWidth)){
      mainChar.y += 50;
      }
      break;
    case 37: // left arrow
      if(mainChar.x >= 5){
      mainChar.x -= 50;
      }
      break;
    case 39: // right arrow
      if(mainChar.x<(canvasWidth-caseWidth)){
      mainChar.x += 50;
      }
      break;
  }
});

rockBtn.addEventListener('click', () => {
  mainChar.hand="Rock";
  mainBattle(mainChar, opponent);
  console.log(opponent.name);
  console.log(mainChar.hand)
});
paperBtn.addEventListener('click', () => {
  mainChar.hand = "Paper"
  mainBattle(mainChar, opponent);
  console.log(opponent.name);
  console.log(mainChar.hand)
});
scissorsBtn.addEventListener('click', () => {
  mainChar.hand ="Scissors";
  mainBattle(mainChar, opponent);
  console.log(opponent.name);
  console.log(mainChar.hand)
});

