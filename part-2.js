var rs = require('readline-sync');

const letterGrid = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
let dim = 10;
let grid = [];
let strikeInput = '';
let strikeInputArray = [];
let guessedCoords = [];
let sunkShips = [0, 0, 0, 0, 0]; 
let won = false;

const ship1 = {
    name: 'Frigate',
    coords: [[],[]],
  }

const ship2 = {
  name: 'Cruiser',
  coords: [[],[],[]],
  }

  const ship3 = {
  name: 'Destroyer',
  coords: [[],[],[]],
  }

const ship4 = {
  name: 'Submarine',
  coords: [[],[],[],[]],
  }

const ship5 = {
  name: 'Aircraft Carrier',
  coords: [[],[],[],[],[]],
  }

//helper functions
const startGame = () => {
  rs.question('Press any key to start the game.');
  gameSetup();
}

const gameSetup = () => {
  resetValues();
  createGrid(10);
  setupShips();
  placeShips();
}

const resetValues = () => {
  strikeInput = '';
  strikeInputArray = [];
  guessedCoords = [];
  sunkShips = [0, 0, 0, 0, 0];
  won = false;
}

const createGrid = (dim = 10) => {
  let arr = new Array(dim);
  for (let i = 0; i < dim; i++) arr[i] = new Array(dim).fill('~');
  grid = arr;
}

const setupShips = () => {
  ship1.coords = coordsGen(ship1.coords.length);  
  ship2.coords = coordsGen(ship2.coords.length);  
  ship3.coords = coordsGen(ship3.coords.length);  
  ship4.coords = coordsGen(ship4.coords.length);  
  ship5.coords = coordsGen(ship5.coords.length);
}

const coordsGen = (span) => {
  let startCoord = [];
  let allCoords = [];
  let dir = 0;

  do {
    allCoords = [];
    startCoord = [Math.floor(Math.random() * dim), Math.floor(Math.random() * dim)];
    dir = Math.floor(Math.random() * 2);
    if(dir) {//horiz right
      for(let i = 0; i < span; i++) {
        if((startCoord[1] + i) < dim) {
          if(grid[startCoord[0]][startCoord[1] + i] != 's') allCoords.push([startCoord[0], startCoord[1] + i]);
          else break;
        }
      }
    }
    else { //vert down
      for(let i = 0; i < span; i++) {
        if((startCoord[0] + i) < dim) {
          if(grid[startCoord[0] + i][startCoord[1]] != 's') allCoords.push([startCoord[0] + i, startCoord[1]]);
          else break;
        }
      }
    }
  }while(allCoords.length != span)
  
  return allCoords;
}

const placeShips = () => {
  ship1.coords.map((val) => grid[val[0]].splice(val[1], 1, 's'));
  ship2.coords.map((val) => grid[val[0]].splice(val[1], 1, 's'));
  ship3.coords.map((val) => grid[val[0]].splice(val[1], 1, 's'));
  ship4.coords.map((val) => grid[val[0]].splice(val[1], 1, 's'));
  ship5.coords.map((val) => grid[val[0]].splice(val[1], 1, 's'));

}

const drawGrid = () => console.log(grid);

const getStrikeInput = () => {
  strikeInput = rs.question(`
Enter a location to strike ie "A2" 
`);
  strikeInputArray = strikeInput.split('');
  checkInputValidity();
  convertCoord();
  checkIfDuplicate();
  addToGuessedCoords();
}

const checkInputValidity = () => {
  let validCol = /^[A-Ja-j]+$/;
  let validRow = /^[0-9]+$/;
  if(!strikeInputArray[0].match(validCol) || !strikeInputArray[1].match(validRow)) {
    console.log(`
Incorrect Input, try again!
`);
    getStrikeInput();
  }
}

const convertCoord = () => {
  let capitalizedInput = strikeInputArray[0].toUpperCase();
  strikeInputArray[0] = letterGrid.indexOf(capitalizedInput);
  strikeInputArray[1] = Number(strikeInputArray[1]);
}

const checkIfDuplicate = () => {
  if(guessedCoords.length > 0) {
    let guessedVal = guessedCoords.findIndex((elem) => elem[0] === strikeInputArray[0] && elem[1] === strikeInputArray[1]);
    if(guessedVal != -1) {
      console.log(`
You have already picked this location. Try Again!
`);
      getStrikeInput();
    }
  }
}

const addToGuessedCoords = () => guessedCoords.push([strikeInputArray[0],strikeInputArray[1]]);

const checkIfHit = () => {
  let hit = false;

  ship1.coords.map((c, i) => {
    let foundMatch = c.every((val,index) => val === strikeInputArray[index]);
    if(foundMatch) {
      console.log(`Hit! You just hit ${ship1.name}.`);
      grid[c[0]].splice(c[1], 1, 'x');
      hit = true;
      checkIfSunk(ship1, 1);
    }
  }) 
  if(!hit) {
    ship2.coords.map((c) => {
      let foundMatch = c.every((val,index) => val === strikeInputArray[index]);
      if(foundMatch) {
        console.log(`Hit! You just hit ${ship2.name}.`);
        grid[c[0]].splice(c[1], 1, 'x');
        hit = true;
        checkIfSunk(ship2, 2);
      }
    }) 
  }
  if(!hit) {
    ship3.coords.map((c) => {
      let foundMatch = c.every((val,index) => val === strikeInputArray[index]);
      if(foundMatch) {
        console.log(`Hit! You just hit ${ship3.name}.`);
        grid[c[0]].splice(c[1], 1, 'x');
        hit = true;
        checkIfSunk(ship3, 3);
      }
    }) 
  }
  if(!hit) {
    ship4.coords.map((c) => {
      let foundMatch = c.every((val,index) => val === strikeInputArray[index]);
      if(foundMatch) {
        console.log(`Hit! You just hit ${ship4.name}.`);
        grid[c[0]].splice(c[1], 1, 'x');
        hit = true;
        checkIfSunk(ship4, 4);
      }
    }) 
  }
  if(!hit) {
    ship5.coords.map((c) => {
      let foundMatch = c.every((val,index) => val === strikeInputArray[index]);
      if(foundMatch) {
        console.log(`Hit! You just hit ${ship5.name}.`);
        grid[c[0]].splice(c[1], 1, 'x');
        hit = true;
        checkIfSunk(ship5, 5);
      }
    }) 
  }
  if(!hit) console.log(`
You have missed!
  `);
}

const checkIfSunk = (ship, num) => {
  let sunk = true;
  ship.coords.map((c) => { 
    if(grid[c[0]][c[1]] === 's') sunk = false;
  });

  if(sunk) {
    console.log(`You just sunk ${ship.name}!`);
    sunkShips[num-1] = 1;
    console.log('sunkShips: ', sunkShips);
  }
}

const statusUpdate = () => {
  let existingShip = sunkShips.findIndex((elem) => elem === 0);
  if(existingShip != -1) printUpdate();
  else wonGame();
}

const printUpdate = () => {
  console.log(`Here's a quick update on each ship's status:`);
  if(sunkShips[0]) console.log(`${ship1.name} is sunk.`);
  else console.log(`${ship1.name} is still alive!`);
  if(sunkShips[1]) console.log(`${ship2.name} is sunk.`);
  else console.log(`${ship2.name} is still alive!`);
  if(sunkShips[2]) console.log(`${ship3.name} is sunk.`);
  else console.log(`${ship3.name} is still alive!`);
  if(sunkShips[3]) console.log(`${ship4.name} is sunk.`);
  else console.log(`${ship4.name} is still alive!`);
  if(sunkShips[4]) console.log(`${ship5.name} is sunk.`);
  else console.log(`${ship5.name} is still alive!`);
}

const wonGame = () => {
  const playAgain = rs.keyInYN('You have destroyed all battleships. Would you like to play again? ');
  if(playAgain) startGame();
  else won = true;
}

//Mini BattleShip Game
startGame();
while(!won) {
  getStrikeInput();
  checkIfHit();
  statusUpdate();
}
