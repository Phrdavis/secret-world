import './Game.css';
import { useState } from 'react';

const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score
}) => {
    const [letter, setLetter] = useState();


  return (

    
    <div className="game">
        <p className="points">
            Portuação:<span>{score}</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className="tip">
            Dica sobre a palavra <span>{pickedCategory.toUpperCase()}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativas</p> 
        <div className="wordContainer">
            {letters.map((letter, index) => (
                guessedLetters.includes(letter) ? (

                    <span key={index} className='letter'>{letter}</span>

                ) : (

                    <span key={index} className='blanckSquare'></span>

                )
            ))}
            
        </div>
        <div className="letterContainer">

            <p>Tente advinhar uma letra da palavra: </p>
            <form>
                <input type="text" name='letter' maxLength={1} required/>
                <button type='submit'>Jogar!</button>
            </form>

        </div>
        <div className="wrongLettersContainer">
            <p>Letras já utilizadas</p>
            
            {wrongLetters.map((letter, index) => (

                <span key={index}>{letter}, </span>
                
            ))}

        </div>
    </div>
  )
}

export default Game