let score, roundSource, activePlayer, gamePlaying;

init();

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Random number
    let dice = Math.floor(Math.random() * 6 + 1);
    // 2. display the result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    // 3. update the round score if the rolled number was not a 1
    if (dice !== 1) {
      // add score
      roundSource += dice;
      //display
      document.querySelector(
        '#current--' + activePlayer
      ).textContent = roundSource;
    } else {
      // next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlaying) {
    // 1. Add CURRENT score to GLOBAL score
    score[activePlayer] += roundSource;
    // 2. Update the UI
    document.querySelector('#score--' + activePlayer).textContent = score[activePlayer];
    // 3. Check if player won the game
    if (score[activePlayer] >= 50) {
      document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player--' + activePlayer).classList.add('player--winner');
      document.querySelector('.player--' + activePlayer).classList.add('name');
      document.querySelector('.player--' + activePlayer).classList.remove('active');
      gamePlaying = false;
    } else {
      // next player
      nextPlayer();
    }
  }
});
      // next player
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundSource = 0;
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  score = [0, 0];
  activePlayer = 0;
  roundSource = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');

  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--' + activePlayer).classList.remove('name');
}
