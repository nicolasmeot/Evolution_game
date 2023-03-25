
class mainCharacter extends Character {
    constructor (x, y, color, name){
        super(x,y,color, name)
    }
} 

//Fight between other characters
function mainBattle(mainChar,character2){
    let result2 = character2.choice()
    document.querySelector("#encounter h3").setAttribute('class','notTie');
    document.querySelector("#encounter h3").innerHTML ="It's time for Battle, choose your weapon"
    console.log(`opponent choice is ${result2} and main character choice is ${mainChar.hand}`)  
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
  mainChar.advance()
  document.querySelector("#result h3").innerHTML =`You win and evolve to ${mainChar.name}`;
  document.getElementById("encounter").setAttribute('class','hidden')
  document.getElementById("result").setAttribute('class','visible');
  setTimeout(resume,3000);
  setTimeout(hideResult,3000);
}

function lose(character2){
  console.log(`Winner = ${character2.name}`)
  character2.advance()
  document.querySelector("#result h3").innerHTML =`You lose, sorry evolution is a long path`;
  document.getElementById("encounter").setAttribute('class','hidden')
  document.getElementById("result").setAttribute('class','visible');
  setTimeout(resume,3000);
  setTimeout(hideResult,3000);
}

function glitchEffect() {}