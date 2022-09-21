var rs = require('readline-sync');
//const battleField = [['A1', 'A2', 'A3'], ['B1', 'B2', 'B3'], ['C1', 'C2', 'C3']];

let stillPlaying = true;
let ship1 = ''; 
let ship2 = ''; 
let hitShip1 = false;
let hitShip2 = false;
let strikeInput = '';
let strikeInputArray = [];
let strikeXY = '';

const startGame = () => {
  rs.question('Press any key to start the game.');
  resetGame();
  shipGen();
}

const resetGame = () => {
  strikeXY = '';
  hitShip1 = false;
  hitShip2 = false;
  stillPlaying = true;
}

const shipGen = () => {
  ship1 = '';
  ship2 = '';
  ship1 += Math.round(Math.random() * 2) + 1;
  ship1 += Math.round(Math.random() * 2) + 1;
  ship2 += Math.round(Math.random() * 2) + 1;
  ship2 += Math.round(Math.random() * 2) + 1;
  if (ship1 === ship2) shipGen();
}

const getStrikeInput = () => {
  strikeInput = rs.question('Enter a location to strike ie "A2" ');
  strikeInputArray = strikeInput.split('');
}

const resetStrikeXY = () => strikeXY = '';

const resetValidInput = () => validInput = true;

const checkX = (x) => {
  if (x === 'A') strikeXY += 1;
  else if (x === 'B') strikeXY += 2;
  else if (x === 'C') strikeXY += 3;
  else {
    console.log('Incorrect X Input! Try Again');
    validInput = false;
  }
}

const checkY = (y) => {
  if (y === 1) strikeXY += 1;
  else if (y === 2) strikeXY += 2;
  else if (y === 3) strikeXY += 3;
  else {
    console.log('Incorrect Y Input! Try Again');
    validInput = false;
  }
}

const checkIfHit = () => {
  if (strikeXY === ship1) {
    if (!hitShip1) {
      if (hitShip2) wonGame();
      else markShip1Hit();
    } else console.log('You have already picked this location. Miss!');
  } 
  else if (strikeXY === ship2) {
    if (!hitShip2) {
      if (hitShip1) wonGame();
      else markShip2Hit();
    } else console.log('You have already picked this location. Miss!');
  }
  else console.log('You have missed!');
}

const markShip1Hit = () => {
  console.log('Hit! You have sunk battleship number 1. Still one ship remains.');
  hitShip1 = true;
}

const markShip2Hit = () => {
  console.log('Hit! You have sunk battleship number 2. Still one ship remains.');
  hitShip2 = true;
}

const wonGame = () => {
  const playAgain = rs.keyInYN('You have destroyed all battleships. Would you like to play again? ');
  if (!playAgain) stopPlaying();
  if (playAgain) startGame();
}

const stopPlaying = () => stillPlaying = false;

startGame();

while(stillPlaying) {
  getStrikeInput();
  resetStrikeXY();
  resetValidInput();
  checkX(strikeInputArray[0]);
  checkY(Number(strikeInputArray[1]));
  if (validInput) checkIfHit();
}