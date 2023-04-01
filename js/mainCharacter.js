
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
    document.getElementById("resultImg").setAttribute('class','hidden');
    //Action depending on result
    if(mainChar.hand === result2){
      document.querySelector("#encounter h3").innerHTML = "It's a tie try again"
      document.querySelector("#encounter h3").setAttribute('class','tie');
    }
    else if(mainChar.hand ==="Rock"){
      if(result2 === "Scissors"){win(mainChar, character2)}
      else {lose(character2)}
    }
    else if(mainChar.hand === "Paper"){
      if(result2 === "Rock"){win(mainChar, character2)}
      else {lose(character2)}
    }
    else if(mainChar.hand === "Scissors"){
      if(result2 === "Paper"){win(mainChar, character2)}
      else {lose(character2)}
    }
}
  
function hideResult(){
    document.getElementById("result").setAttribute('class','hidden')
}

function win(mainChar, loser){
  console.log(`Winner = ${mainChar.name}`)
  // Normal win
  if(mainChar.stade <4){
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
  // Final stage initialization
  else if(mainChar.stade === 4 && mainChar.followers === 0){
    document.querySelector("#result h3").innerHTML =`You reached the final stage, now either you win or go back from the start`;
    console.log(`Winner = ${mainChar.name}`)
    document.getElementById("encounter").setAttribute('class','hidden');
    document.getElementById("result").setAttribute('class','visible');
    finalStage();
    mainChar.followers = 1;
    setTimeout(resume,3000);
    setTimeout(hideResult,3000);
  }
  //Final stage win
  else if(mainChar.stade === 4 && characters.length > stadeArr.length-1){
    mainChar.followers += loser.followers + 1
    characters.splice(characters.indexOf(loser),1);
    document.querySelector("#result h3").innerHTML =`You win and have now ${mainChar.followers} supporters`;
    console.log(`Winner = ${mainChar.name}`)
    document.getElementById("encounter").setAttribute('class','hidden');
    document.getElementById("result").setAttribute('class','visible');
    document.getElementById("resultImg").setAttribute('class','visible');
    document.getElementById("resultImg").setAttribute('src','https://media.tenor.com/6RlWL6d6uzEAAAAM/dinosaur-jurassic-park.gif' );
    setTimeout(resume,3000);
    setTimeout(hideResult,3000);
  }

  //Final stage Final Win
  else if(mainChar.stade === 4 && characters.length === stadeArr.length){
    document.querySelector("#result h3").innerHTML =`🎉 Congratulations, you are the last one remaining 🎉`;
    document.getElementById("result").setAttribute('class','visible');
    document.getElementById("resultImg").setAttribute('class','visible');
    document.getElementById("resultImg").setAttribute('src','https://media.tenor.com/6RlWL6d6uzEAAAAM/dinosaur-jurassic-park.gif' );
  }
}

function lose(character2){
  // Normal lose
  if(mainChar.stade <=4 && mainChar.followers ===0){
    console.log(`Winner = ${character2.name}`)
    character2.advance()
    document.querySelector("#result h3").innerHTML =`You lose, sorry evolution is a long path`;
    document.getElementById("encounter").setAttribute('class','hidden')
    document.getElementById("result").setAttribute('class','visible');
    document.getElementById("resultImg").setAttribute('class','visible');
    document.getElementById("resultImg").setAttribute('src','https://media.tenor.com/Xm9MHAyGVR0AAAAC/better-luck-next-time-try-again.gif' );
    setTimeout(resume,3000);
    setTimeout(hideResult,3000);
  }

  //Final stage lose
  else if(mainChar.stade === 4){
    console.log(`Winner = ${character2.name}`)
    document.querySelector("#result h3").innerHTML =`You lose and need to crawl your way up the pyramid again`;
    document.getElementById("encounter").setAttribute('class','hidden')
    document.getElementById("result").setAttribute('class','visible');
    document.getElementById("resultImg").setAttribute('class','visible');
    document.getElementById("resultImg").setAttribute('src','https://media.tenor.com/FhF7cOauHTcAAAAM/oyun-bitti-loser.gif')
  }
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