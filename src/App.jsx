//Css
import './App.css'

//Data
import wordList from './data/words.jsx'

//Components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'
import Copyrigth from './components/Copyrigth'

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

  const pickWordAndCategory = useCallback(() =>{

    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length)];

    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category};
  }, [words]);

  const startGame = useCallback(() =>{

    clearLetterStates();

    const {word, category} =pickWordAndCategory();

    let wordLetters = word.split('');

    wordLetters = wordLetters.map(letter => letter.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name)

  }, [pickWordAndCategory]);

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


  useEffect(()=>{

    const uniqueLetter = [... new Set(letters)];

    if(uniqueLetter.length === guessedLetters.length){

      setScore((score) => score + scorePoint);

      startGame();

    }

  }, [guessedLetters, letters, startGame])

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
      
      <Copyrigth ano={2024} nome='Davi Pinheiro de Souza' />
    </div>
  )
}

export default App
