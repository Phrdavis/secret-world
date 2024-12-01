//Css
import './App.css'

//Data
import wordList from './data/words.jsx'

//Components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

//React
import { useState, useEffect, useCallback } from 'react'


const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]

function App() {

  const guessesQtd = 3;
  const scorePoint = 50

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordList)

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(scorePoint);

  const pickWordAndCategory = () =>{

    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length)];

    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category};
  }

  const startGame = () =>{

    const {word, category} =pickWordAndCategory();

    let wordLetters = word.split('');

    wordLetters = wordLetters.map(letter => letter.toLowerCase());

    console.log(word, category)
    console.log(wordLetters)

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name)

  }

  const verifyLetter = (letter) =>{

    const normalizedLetter = letter.toLowerCase();

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){

      return;

    } 

    if(letters.includes(normalizedLetter)){

      setGuessedLetters([...guessedLetters, normalizedLetter]);

    }else{

      setWrongLetters([...wrongLetters, normalizedLetter]);

      setGuesses((guesses) => guesses - 1);

    }

  }

  const clearLetterStates = () => {

    setGuessedLetters([]);
    setWrongLetters([]);

  }

  useEffect(() =>{

    if(guesses <= 0){

      clearLetterStates();
      setGameStage(stages[2].name);

    }

  }, [guesses]);

  const retry = () =>{

    setScore(0);
    setGuesses(guessesQtd);
    setGameStage(stages[0].name);

  }

  return (
    <div className='App'>
      {gameStage == 'start' && <StartScreen startGame={startGame}  />}
      {gameStage == 'game' && <Game 
                                  verifyLetter={verifyLetter} 
                                  pickedCategory={pickedCategory} 
                                  pickedWord={pickedWord} 
                                  letters={letters} 
                                  guessedLetters={guessedLetters}
                                  wrongLetters={wrongLetters}
                                  guesses={guesses}
                                  score={score}
                                 />}
      {gameStage == 'end' && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App
