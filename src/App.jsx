import { useState, useEffect } from 'react';
import './App.css';

const choices = [
  { name: 'rock', image: 'batu.png' },
  { name: 'paper', image: 'kertas.png' },
  { name: 'scissors', image: 'gunting.png' },
];

const App = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState(''); // Menggunakan null sebagai nilai awal
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [drawCount, setDrawCount] = useState(0);
  const [round, setRound] = useState(0);

  const gameResult = () => {
    if (playerChoice !== '') {
      const computerPick = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(computerPick);

      const playerIndex = choices.findIndex(
        (choice) => choice.name === playerChoice
      );
      const computerIndex = choices.findIndex(
        (choice) => choice.name === computerPick.name
      );

      if (playerIndex === computerIndex) {
        setResult('Draw');
        setDrawCount(drawCount + 1);
      } else if ((playerIndex + 1) % 3 === computerIndex) {
        setResult('Computer wins');
        setComputerScore(computerScore + 1);
      } else {
        setResult('Player wins');
        setPlayerScore(playerScore + 1);
      }

      setRound(round + 1);
    } else {
      setComputerChoice(null); // Set computerChoice menjadi null jika pemain belum memilih
      setResult('');
    }
  };

  useEffect(gameResult, [playerChoice]);

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Rock Paper Scissors</h1>
      <div className="row">
        <div className="col-md-6">
          <h3>Player</h3>
          <div className="choices">
            {choices.map((choice, index) => (
              <button
                key={index}
                className="btn btn-primary m-1"
                onClick={() => handleChoice(choice.name)}
              >
                <img src={`images/${choice.image}`} alt={choice.name} />
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h3>Computer</h3>
          {computerChoice ? (
            <p>
              <img
                src={`images/${computerChoice.image}`}
                alt={computerChoice.name}
              />
            </p>
          ) : (
            <p>Waiting for player to choose...</p>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Result: {result}</h4>
        </div>
        <div className="col-md-6">
          <h4>
            Score: Player {playerScore} - {computerScore} Computer
          </h4>
          <h4>Draws:{drawCount}</h4>
          <p>Round: {round} </p>
        </div>
      </div>
    </div>
  );
};

export default App;
