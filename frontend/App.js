import React, { useState } from 'react';
import './App.css';

function App() {
  // Rock Paper Scissors State & Logic
  const choices = ['rock', 'paper', 'scissors'];
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');

  const getResult = (player, computer) => {
    if (player === computer) return "It's a tie!";
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) return 'You win!';
    return 'You lose!';
  };

  const handleRPSClick = (choice) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    const outcome = getResult(choice, randomChoice);
    setPlayerChoice(choice);
    setComputerChoice(randomChoice);
    setResult(outcome);
  };

  const resetRPSGame = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('');
  };

  // Number Guessing Game State & Logic
  const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;
  const [targetNumber, setTargetNumber] = useState(getRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleGuess = () => {
    const number = parseInt(guess);
    if (isNaN(number)) {
      setMessage('Please enter a valid number.');
      return;
    }

    setAttempts(attempts + 1);

    if (number === targetNumber) {
      setMessage(`🎉 Correct! The number was ${targetNumber}. You guessed it in ${attempts + 1} tries.`);
    } else if (number < targetNumber) {
      setMessage('📉 Too low. Try a higher number.');
    } else {
      setMessage('📈 Too high. Try a lower number.');
    }
  };

  const handleRestart = () => {
    setTargetNumber(getRandomNumber());
    setGuess('');
    setMessage('');
    setAttempts(0);
  };

  return (
    <>
      {/* Rock Paper Scissors Section */}
      <div className="game-container">
        <h1 className="title">Rock Paper Scissors</h1>

        {!result ? (
          <div className="buttons">
            {choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handleRPSClick(choice)}
                className="choice-button"
              >
                {choice.charAt(0).toUpperCase() + choice.slice(1)}
              </button>
            ))}
          </div>
        ) : (
          <div className="result-section">
            <p>You chose: <strong>{playerChoice}</strong></p>
            <p>Computer chose: <strong>{computerChoice}</strong></p>
            <h2 className="result">{result}</h2>
            <button onClick={resetRPSGame} className="play-again-button">
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Number Guessing Game Section */}
      <div className="guessing-game-container">
        <h1>Number Guessing Game</h1>
        <p>Guess a number between 1 and 100</p>

        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess"
        />
        <button onClick={handleGuess}>Guess</button>

        {message && <p className="message">{message}</p>}

        {message.includes('Correct') && (
          <button onClick={handleRestart} className="restart-button">
            Play Again
          </button>
        )}
      </div>
    </>
  );
}

export default App;
