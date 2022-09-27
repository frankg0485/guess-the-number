import React, { useLayoutEffect, useState } from 'react';

function Guesser() {
    const [number, setNumber] = useState("");
    const [guess, setGuess] = useState("");
    const [answerMessage, setAnswerMessage] = useState("Good luck!");
    const [guessesRemaining, setGuessesRemaining] = useState(5);

    function getRandomNumber() {
        fetch('http://localhost:5000/')
        .then(res => res.json())
        .then(obj => {
            setNumber(obj.num);
        });
    }

    function reset() {
      setGuessesRemaining(5);
      setAnswerMessage("A new number has been generated. Good luck!")
      getRandomNumber();
    }

    function makeGuess() {
      setGuessesRemaining(guessesRemaining - 1);
      if (parseInt(guess) == number) {
        setAnswerMessage("Correct!!");
        reset();
      } else if (guessesRemaining == 1) {
        setAnswerMessage("Game over ;(");
        reset();
      } else {
        setAnswerMessage("Not quite...");
      }
      return false;
    }

    return (
        <div>
          <button onClick={getRandomNumber}>
            Generate random number
          </button>
          <h1>{"Guesses remaining: " + guessesRemaining}</h1>
          <input type="text" name="guess" onChange={(e) => setGuess(e.target.value)}/>
          <button onClick={makeGuess}>
            Guess!
          </button>
          { true 
              ? <p>{answerMessage}</p>
              : null
          }
          <button>
            Give up :&#40;
          </button>
          <h1>{"The number was " + number}</h1>
        </div>
    );
}

export default Guesser;