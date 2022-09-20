var rs = require('readline-sync');

rs.question('Press any key to start the game.');
const battleField = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', ];
//randomly generate two coordinates. 
const ship1 = Math.round(Math.random() * 3);
console.log(ship1);
const strike = rs.question('Enter a location to strike is "A2"');
//check if matches either of the two coordinates
//create array to track guessed locations
  console.log('Hit! You have sunk a battleship. 1 ship remaining.'); //if matches
  console.log('You have missed!'); //if no match
  console.log('You have already picked this location. Miss!') //if guessed same location

const playAgain = rs.question('You have destroyed all battleships. Would you like to play again? Y/N '); //when both coordinates guessed
// if Y --> start from the top