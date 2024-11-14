import { useLocation,Link } from 'react-router-dom';
import './index.css'

function Result() {
  const location = useLocation();  // Use useLocation to access state
  const { correctAnswers,incorrectAnswers,formattedTimer } = location.state || {};  // Destructure score and timer from state

  return (
    <div className='result-container'>
      <h1 className='heading'>Quiz finished</h1>
      <p className='text'>CorrectAnswers : {correctAnswers}</p>
      <p className='text'>IncorrectAnswers : {incorrectAnswers}</p>
      <p className='text'>Time left : {formattedTimer}</p>
      <div className="score-container">
              <p className="score-text">Your score : </p>
              <p className="score-text">{correctAnswers}/5</p>
        </div>
      {correctAnswers < 4 ? 
      (<p className='try-again'>Try again</p>):(<p className='well'>Well done!</p>)}
      <Link to="/">
        <button type="button" className='retry-btn'>Retry</button>
      </Link>
      
    </div>
  );
}

export default Result;


