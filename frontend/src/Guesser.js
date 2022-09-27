import React, { useState } from 'react';

function Guesser() {
    const [prevAnswer, setPrevAnswer] = useState(0);
    const [number, setNumber] = useState(getRandomNumber);
    const [guess, setGuess] = useState("");
    const [answerMessage, setAnswerMessage] = useState("Good luck!");
    const [guessesRemaining, setGuessesRemaining] = useState(5);
    const [showAnswer, setShowAnswer] = useState(false);
  
    function getRandomNumber() {
        fetch('http://localhost:5000/')
        .then(res => res.json())
        .then(obj => {
            setNumber(obj.num);
            console.log("the random number is " + obj.num);
        });
    }

    function reset() {
      setShowAnswer(true);
      setPrevAnswer(number);
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
          <h1>Welcome to this simple number guessing game!</h1>
          <button onClick={getRandomNumber}>
            Generate random number
          </button>
          <h3>{"Guesses remaining: " + guessesRemaining}</h3>
          <input type="text" name="guess" onChange={(e) => setGuess(e.target.value)}/>
          <button onClick={makeGuess}>
            Guess!
          </button>
          <p>{answerMessage}</p>
          <button onClick={reset}>
            Give up :&#40;
          </button>
          { showAnswer 
              ? <h3>{"The number was " + prevAnswer}</h3>
              : null
          }
        </div>
    );
}

export default Guesser;