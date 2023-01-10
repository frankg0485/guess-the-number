import React, { useState } from 'react';

function Guesser() {
    const messages = {
      newNumber: "A new number has been generated. Good luck!",
      high: "Too high...",
      low: "Too low...",
      gameOver: "Better luck next time :|",
      rightGuess: "Correct!!",
    };

    const [prevAnswer, setPrevAnswer] = useState(0);
    const [guess, setGuess] = useState("");
    const [answerMessage, setAnswerMessage] = useState("Good luck!");
    const [guessesRemaining, setGuessesRemaining] = useState(5);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [lowerBound, setLowerBound] = useState(1);
    const [upperBound, setUpperBound] = useState(10);
    const [number, setNumber] = useState(getRandomNumber);

    function getRandomNumber() {
        fetch(`http://localhost:5000/?lower=${lowerBound}&upper=${upperBound}`)
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
      let guessNum = parseInt(guess);

      if (guessNum == number) {
        newMsg = messages.rightGuess;
        setScore(score + 1);
        shouldReset = true;
      } else if (guessesRemaining == 1) {
        newMsg = messages.gameOver;
        shouldReset = true;
      } else if (guessNum > number) {
        newMsg = messages.high;
      } else if (guessNum < number) {
        newMsg = messages.low;
      }
      

      setGuess("");
      if (shouldReset) { reset(); }
      setAnswerMessage(newMsg);
      return false;
    }

    function handleKeyDown(event) {
      if (isNumber(guess) && event.keyCode === 13) {
        makeGuess();
      }
    }

    function isNumber(numStr) {
      return numStr && !isNaN(+numStr);
    }

    return (
        <div>
          <h1>Welcome to this simple number guessing game!</h1>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <span style={{flex: 2}} />
            <p style={{flex: 1}}>
              Lower bound:
            </p>
            <input style={{flex: 1}} type="text" name="lowBound" value={lowerBound} onChange={(e) => setLowerBound(e.target.value)}/>
            <span style={{flex: 2}} />
          </div>
          <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <span style={{flex: 2}} />
            <p style={{flex: 1}}>
              Upper bound:
            </p>
            <input style={{flex: 1}} type="text" name="highBound" value={upperBound} onChange={(e) => setUpperBound(e.target.value)}/>
            <span style={{flex: 2}} />          </div>
          <h2>
            {"Score: " + score}
          </h2>
          <h3>
            {"Guesses remaining: " + guessesRemaining}
          </h3>
          <input type="text" name="guess" value={guess} onKeyUp={handleKeyDown} onChange={(e) => setGuess(e.target.value)}/>
          <button onClick={makeGuess} disabled={!isNumber(guess)}>
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