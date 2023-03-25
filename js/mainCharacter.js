
class mainCharacter extends Character {
  constructor (x, y, name){
      super(x,y, name)
  }
  contour(){
    ctx.strokeStyle = "red";
    ctx.strokeRect(this.x, this.y, caseWidth, caseWidth);
  }
} 

//Fight between other characters
function mainBattle(mainChar,character2){
    let result2 = character2.choice()
    document.querySelector("#encounter h3").setAttribute('class','notTie');
    document.querySelector("#encounter h3").innerHTML ="It's time for Battle, choose your weapon"
    console.log(`opponent choice is ${result2} and main character choice is ${mainChar.hand}`)  
    //Clearing previous img
    document.getElementById("previous").setAttribute('class','hidden');
    document.getElementById("next").setAttribute('class','hidden');
    document.getElementById("fail").setAttribute('class','hidden');
    //Action depending on result
    if(mainChar.hand === result2){
      document.querySelector("#encounter h3").innerHTML = "It's a tie try again"
      document.querySelector("#encounter h3").setAttribute('class','tie');
    }
    else if(mainChar.hand ==="Rock"){
      if(result2 === "Scissors"){win(mainChar)}
      else {lose(character2)}
    }
    else if(mainChar.hand === "Paper"){
      if(result2 === "Rock"){win(mainChar)}
      else {lose(character2)}
    }
    else if(mainChar.hand === "Scissors"){
      if(result2 === "Paper"){win(mainChar)}
      else {lose(character2)}
    }
}
  
function hideResult(){
    document.getElementById("result").setAttribute('class','hidden')
}

function win(mainChar){
  console.log(`Winner = ${mainChar.name}`)
  document.getElementById("previous").setAttribute('src', mainChar.img.src);
  mainChar.advance()
  document.querySelector("#result h3").innerHTML =`You win and evolve to ${mainChar.stadeName}`;
  document.getElementById("encounter").setAttribute('class','hidden')
  document.getElementById("result").setAttribute('class','visible');
  //Glitch Effect
  document.getElementById("next").setAttribute('src', mainChar.img.src);
  compte = 0;
  intervalGlitch = setInterval(glitchEffect, 10)
  setTimeout(resume,3000);
  setTimeout(hideResult,3000);
}

function lose(character2){
  console.log(`Winner = ${character2.name}`)
  character2.advance()
  document.querySelector("#result h3").innerHTML =`You lose, sorry evolution is a long path`;
  document.getElementById("encounter").setAttribute('class','hidden')
  document.getElementById("result").setAttribute('class','visible');
  document.getElementById("fail").setAttribute('class','visible');
  setTimeout(resume,3000);
  setTimeout(hideResult,3000);
}

function glitchEffect() {
  compte += 1 
  if(compte <=50){
    document.getElementById("previous").setAttribute('class','visible');
  }
  else if(compte>= 2500/16){
    clearInterval(intervalGlitch)
  }
  else if(compte % 10 === 0){
    document.getElementById("previous").setAttribute('class','visible');
    document.getElementById("next").setAttribute('class','hidden');
  }
  else if(compte%10 === 10/2){
    document.getElementById("previous").setAttribute('class','hidden');
    document.getElementById("next").setAttribute('class','visible');
  }
}

function currentStade() {
  for(let el of stadeArr){
    if(mainChar.stadeName == el.stadeName){
      document.getElementById(el.stadeName).setAttribute('class','currentStade')
    }
    else{
      document.getElementById(el.stadeName).setAttribute('class','hidden');
    }
  }
}