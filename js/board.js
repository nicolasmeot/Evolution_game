/* let board = [
    {x: 0, y:0},
  ]
  
  let x0=0;
  let y0=0;
  
  function createArray(array){
    for (let i=0; i<canvasWidth/caseWidth ; i++){
      y0=0;
      for(let j=0; j<canvasHeight/caseWidth; j++){
        array.push({x:x0,y:y0})
        y0 += caseWidth;
      }
      x0+= caseWidth;
    }
  }
  
  let test = createArray(board);
  
  for(let el of board){
    let red = Math.floor(Math.random() * 255);
    let green =  Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    let newEl = new Character(el.x, el.y,`rgb(${red},${green},${blue})` )
    newEl.draw()
  }*/