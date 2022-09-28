import React, { useState } from 'react';

function Guesser() {
    const messages = {
      newNumber: "A new number has been generated. Good luck!",
      wrongGuess: "Not quite...",
      gameOver: "Game over ;(",
      rightGuess: "Correct!!",
    };
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
      setGuess("");
      setShowAnswer(true);
      setPrevAnswer(number);
      setGuessesRemaining(5);
      getRandomNumber();
    }

    function makeGuess() {
      setGuessesRemaining(guessesRemaining - 1);

      let newMsg = "";
      let shouldReset = false;
      if (parseInt(guess) == number) {
        newMsg = messages.rightGuess;
        shouldReset = true;
      } else if (guessesRemaining == 1) {
        newMsg = messages.gameOver;
        shouldReset = true;
      } else {
        newMsg = messages.wrongGuess;
      }
      

      if (shouldReset) { reset(); }
      setAnswerMessage(newMsg);
      return false;
    }

    return (
        <div>
          <h1>Welcome to this simple number guessing game!</h1>
          <button onClick={getRandomNumber}>
            Generate random number
          </button>
          <h3>
            {"Guesses remaining: " + guessesRemaining}
          </h3>
          <input type="text" name="guess" value={guess} onChange={(e) => setGuess(e.target.value)}/>
          <button onClick={makeGuess} disabled={!guess || isNaN(+guess)}>
            Guess!
          </button>
          <p className={showAnswer ? 'fadeOut' : 'fadeIn'} onTransitionEnd={() => setAnswerMessage(messages.newNumber)}>{answerMessage}</p>
          <button onClick={reset} disabled={guessesRemaining == 5}>
            Give up :&#40;
          </button>
          <h3 className={showAnswer ? 'fadeIn' : 'fadeOut'} onTransitionEnd={() => setShowAnswer(false)}>
            {"The number was " + prevAnswer}
          </h3>
        </div>
    );
}

export default Guesser;