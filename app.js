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
