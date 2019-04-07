/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Done by Jonas
// var scores, roundScore, activePlayer, gamePlaying;

// init();

// document.querySelector('.btn-roll').addEventListener('click', function(){
// 	if(gamePlaying){
// 		//1. Random number
// 		var dice = 	Math.floor(Math.random()*(6)+1);
// 		//2. Display the result
// 		var diceDOM = document.querySelector('.dice');
// 		diceDOM.style.display = 'block';
// 		diceDOM.src = 'dice-' + dice + '.png';
// 		//3. Update the round score IF th rolled number was NOT a 1
// 		if(dice !== 1){
// 			//Add score
// 			roundScore+=dice;
// 			document.querySelector('#current-' + activePlayer).textContent = roundScore;
// 		} else {
// 			//Next player
// 			nextPlayer();
// 		}
// 	}
// });

// document.querySelector('.btn-hold').addEventListener('click', function(){
// 	if(gamePlaying){
// 		//Add CURRENT score to GLOBAL score
// 		scores[activePlayer]+=roundScore;
// 		//Update the UI
// 		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
// 		// Check if player won the game
// 		if(scores[activePlayer] >= 20){
// 			document.querySelector('#name-' + activePlayer).textContent ='Winner!';
// 			document.querySelector('.dice').style.display = 'none';
// 			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
// 			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
// 			gamePlaying=false;
// 		} else{
// 			//Next player
// 			nextPlayer();
// 		} 
// 	}	
// });

// document.querySelector('.btn-new').addEventListener('click', init);

// function nextPlayer(){
// 	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
// 	roundScore = 0;

// 	document.getElementById('current-0').textContent = '0';
// 	document.getElementById('current-1').textContent = '0';

// 	document.querySelector('.player-0-panel').classList.toggle('active');
// 	document.querySelector('.player-1-panel').classList.toggle('active');

// 	document.querySelector('.dice').style.display = 'none';
// }

// function init(){
// 	scores =[0, 0];
// 	roundScore = 0;
// 	activePlayer = 0;

// 	document.querySelector('.dice').style.display = 'none';

// 	document.getElementById('score-0').textContent = '0';
// 	document.getElementById('score-1').textContent = '0';
// 	document.getElementById('current-0').textContent = '0';
// 	document.getElementById('current-1').textContent = '0';
// 	document.getElementById('name-0').textContent ='Player 1';
// 	document.getElementById('name-1').textContent ='Player 2';
// 	document.querySelector('.player-0-panel').classList.remove('winner');
// 	document.querySelector('.player-1-panel').classList.remove('winner');
// 	document.querySelector('.player-0-panel').classList.remove('active');
// 	document.querySelector('.player-1-panel').classList.remove('active');
// 	document.querySelector('.player-0-panel').classList.add('active');

// 	gamePlaying=true;
// }


//Setter
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<strong>' + dice + '</strong>'

//Getter
// var x = document.querySelector('#score-0').textContent;

//--------------------------------------------------------------------------------------------------------------------




// DONE by me-----------------------------------------------------------------------------------------------------------
var scores, roundScore, activePlayer, gamePlaying, lastDice, lastDice2, winningScore;
init();

document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', hold);

document.querySelector('.final-score').addEventListener('input', function(){
	if(this.value>0){
		winningScore = this.value;
	} else {
		winningScore = 100;
	}
});


function init(){
	//looping through players to simplify code and setting initial config for both players DOM
	for(var i=0;i<2;i++){
		activePlayer=i;
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		document.querySelector('#name-' + activePlayer).textContent = "Player " + (i+1);
		document.querySelector('#score-' + activePlayer).textContent = 0;
		document.querySelector('#current-' + activePlayer).textContent = 0;
	}
	//setting global variables to initial state
	scores =[0, 0];
	roundScore = 0;
	activePlayer=0;
	gamePlaying=true;
	lastDice=0;
	lastDice2=0;
	winningScore=100;
	//Setting both dices to display none (make them invisible)
	hideDice();
	//Adding the class "active" to player 1 as default
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function nextPlayer(){
		//ternary operator if activePlayer is Player 1 then change it to Player 2 and Vice Versa
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		//setting roundScore to 0
		roundScore=0;
		//Setting both players roundScore DOM to 0
		document.querySelector('#current-0').textContent = roundScore;
		document.querySelector('#current-1').textContent = roundScore;
		//toggle the "active" class depending of which player currently has it
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		//Setting both dices to display none (make them invisible)
		hideDice();
		//Setting the lastDice to 0 (previous dice)
		lastDice=0;
		lastDice2=0;
}
//Function to roll the dice
function rollDice(){
	//Checking if gamePlaying === true (If game isn't over)
	if(gamePlaying){
		//Generating both random numbers between 1 and 6 for dices
		var dice = 	Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		//Setting the images of both dices to match the random number
		document.querySelector('.dice').setAttribute('src', "dice-" + dice +".png");
		document.querySelector('.dice2').setAttribute('src', "dice-" + dice2 +".png");
		//Setting the display of the dice img to block (make them visible)
		document.querySelector('.dice').style.display = 'block';
		document.querySelector('.dice2').style.display = 'block';
		//Checking if this dice roll and previos dice roll are equal to 6
		if((dice === 6 && lastDice === 6) || (dice2 === 6 && lastDice2 === 6)){
			//Then removing current player TOTAL score
			scores[activePlayer]=0;
			//Displaying total Score to 0
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			//Next player turn
			nextPlayer();
			//Checking if both dice rolls are different than 1
		} else if(dice !== 1 && dice2!==1){
			//Adding the sum of both dices to the round score
			roundScore+=dice+dice2;
			//displaying the sum of both dices to the round score
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			//If an dice equals 1 then
		} else {
			//Next player turn
			nextPlayer();
		}
		//Setting the lastDice variable to the previous roll
		lastDice=dice;
		lastDice2=dice;
	}
}
//Function on the hold button
function hold(){
	//Checking if gamePlaying === true (If game isn't over)
	if(gamePlaying){
		//Adding the roundScore to the active player TOTAL scorer
		scores[activePlayer]+=roundScore;
		//Displaying the active player TOTAL score
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		//Checking if the active player TOTAL score is equal or over the winning score
		if(scores[activePlayer] >= winningScore){
			//Displaying Winner! instead of the player name
			document.querySelector('#name-' + activePlayer).textContent = "Winner!";
			//Removing the class active from the winner
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			//Adding the class winner to the winner player
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			hideDice();
			//Setting gameplying to false (Game is over)
			gamePlaying=false;
		} else {
			nextPlayer();
		}
	}
}
//Function that hides the dices
function hideDice(){
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
}
//---------------------------------------------------------------------------------------------------------

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/