// Definition of the Character class
class Character {
  constructor(x , y , name){
    this.x = x;
    this.y = y;
    this.width = characterWidth;
    this.height = characterWidth;
    //this.color = color;
    this.img = new Image(); 
    this.img.src = './images/Egg_detoure.png';
    this.name = name
    this.hand = "";
    /*Stade d'évolution 0=oeuf, 1=poussin, 2=poule, 3=dino, 4=superdino*/ 
    this.stade = 0 ;
    this.stadeName = "Egg"
    this.followers = 0;
  }
  draw(){
    ctx.drawImage(this.img, this.x+5 , this.y+5, this.width, this.height);
  }
  moveCharacter(){
    let newX=0;
    let newY=0;
    let direction = Math.random()
    if(direction >=1/2){newX = Math.floor(Math.random()*2)*100-50}
    else{newY = Math.floor(Math.random()*2)*100-50}
    
    if(newX>=0){this.x=Math.min(this.x+newX,canvasWidth-caseWidth)}
    else{this.x=Math.max(this.x+newX,0)}

    if(newY>=0){this.y=Math.min(this.y+newY,canvasHeight-caseWidth)}
    else{this.y=Math.max(this.y+newY,0)}
  }
  choice(){
    let result = Math.floor(Math.random()*3);
    if(result ===0){return "Rock"}
    else if (result ===1){return "Scissors"}
    else {return "Paper"}
  }
  //test avec des couleurs Oeuf = bleu, Poussin = jaune, Poule = rouge, dino = vert, super dino = marron 
  advance(){
    if(this.stade<5){this.stade+=1;}
    switch (this.stade){
      case 0:
        //this.color = "blue";
        this.stadeName = stadeArr[0].stadeName;
        this.img.src = stadeArr[0].stadeImg;
        break;
      case 1:
        //this.color = "yellow";
        this.stadeName = stadeArr[1].stadeName;
        this.img.src = stadeArr[1].stadeImg;
        break;
      case 2:
        //this.color = "red";
        this.stadeName = stadeArr[2].stadeName;
        this.img.src = stadeArr[2].stadeImg;
        break;
      case 3:
        //this.color = "green";
        this.stadeName = stadeArr[3].stadeName;
        this.img.src = stadeArr[3].stadeImg;
        break;
      case 4:
        //this.color = "brown";
        this.stadeName = stadeArr[4].stadeName;
        this.img.src = stadeArr[4].stadeImg;
        this.followers +=1;
        break;
    } 
  }

}

// Creation of the other Characters 
function createCharacters(){
  let randX = 0 ;
  let randY = 0 ;
  for(let i= 0; i<nbOfCharacters ; i++){
    let check = 1;
    
    while(check >0 ){
      /*Positionnement aléatoire des perso*/
      check = 0;
      randX = Math.floor(Math.random()*(canvasWidth/caseWidth))*caseWidth
      randY = Math.floor(Math.random()*(canvasHeight/caseWidth))*caseWidth
      let tempCharacter = new Character(randX,randY)
      for(let el of characters){
        if(checkPosition(tempCharacter,el)){
          check+=1
        }
      }
      if(checkPosition(tempCharacter,mainChar)){
        check+=1
      }
    }
    characters.push(new Character(randX,randY,i));
  }
}

//Fight between other characters
function battle(character1,character2){
  if(Math.random()<1/2){
    console.log(`Winner = ${character1.name}`);
    character1.advance()
  }
  else{
    console.log(`Winner = ${character2.name}`)
    character2.advance()
  }
}

function finalStage(){
  for(let i=0; i<stadeArr.length-1; i++){
    characters[i].stade=i-1
    characters[i].advance()
  }
  let tempFollow = stadeArr.length-1 - 4
  for(let j=stadeArr.length; j<=stadeArr.length+4; j++){
    characters[j].stade=3
    characters[j].advance()
    if(j != stadeArr.length+4){
      characters[j].followers = Math.floor(Math.random()*tempFollow)
      tempFollow -= characters[j].followers;
    }
    else{characters[j].followers = tempFollow}
  }
  characters.splice(stadeArr.length+5,characters.length-stadeArr.length+5)
}
