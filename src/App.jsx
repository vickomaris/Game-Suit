import { useState, useEffect } from 'react';
import './App.css';

const choices = [
  { name: 'rock', image: 'batu.png' },
  { name: 'paper', image: 'kertas.png' },
  { name: 'scissors', image: 'gunting.png' },
];

const App = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [drawCount, setDrawCount] = useState(0);
  const [round, setRound] = useState(0);

  const gameSuit = () => {
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
      setComputerChoice('');
      setResult('');
    }
  };

  useEffect(gameSuit, [playerChoice]);

  const handleChoice = (choice) => {
    setPlayerChoice(choice);
  };

  return (
    <div className="container">
      <h1 className="mb-5 text-center">Rock Paper Scissors</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="choices text-center">
            <div className="sideComputer mb-3">
              <h3>Computer</h3>
              {computerChoice ? (
                <p>
                  <img
                    src={`images/${computerChoice.image}`}
                    alt={computerChoice.name}
                    className="imgComputer"
                  />
                </p>
              ) : (
                <p>Waiting for player to choose...</p>
              )}
            </div>
            <div className="sidePlayer">
              <h3>Player</h3>
              {choices.map((choice, index) => (
                <button
                  key={index}
                  className="btn btn-outline-light m-1"
                  onClick={() => handleChoice(choice.name)}
                >
                  <img
                    src={`images/${choice.image}`}
                    alt={choice.name}
                    className="imgPlayer"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h4 className="text-center mt-3">Round: {round} </h4>
          <h4 className="text-center mt-3"> {result ? result : 'result'}</h4>
          <h4 className="mt-3">
            Score: Player {playerScore} - {computerScore} Computer
          </h4>
          <h4 className="mt-3">Draws: {drawCount}</h4>
        </div>
      </div>
    </div>
  );
};

export default App;
