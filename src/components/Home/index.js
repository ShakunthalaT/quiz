import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'

const questions = [
  {
    "id": 1,
    "question": "What does HTML stand for?",
    "options": [
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    "answer": "Hyper Text Markup Language"
  },
  {
    "id": 2,
    "question": "Which HTML tag is used to define an internal style sheet?",
    "options": [
      "<style>",
      "<script>",
      "<link>",
      "<css>"
    ],
    "answer": "<style>"
  },
  {
    "id": 3,
    "question": "Which CSS property controls the text size?",
    "options": [
      "font-size",
      "text-size",
      "font-style",
      "text-font"
    ],
    "answer": "font-size"
  },
  
  {
    "id": 4,
    "question": "Which HTML attribute is used to define inline styles?",
    "options": [
      "style",
      "class",
      "id",
      "type"
    ],
    "answer": "style"
  },

  {
    "id": 5,
    "question": "What does CSS stand for?",
    "options": [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets"
    ],
    "answer": "Cascading Style Sheets"
  },

] 

function HomeWrapper() {
  const navigate = useNavigate(); 

  return <Home navigate={navigate} />;
}

class Home extends Component {
  state = {
    currentQuestionIndex: 0,
    isComplete: false,  
    userAnswers: [],
    correctAnswers: 0,
    incorrectAnswers: 0,
    score: 0,
    timer: 600, 
    timeUp: false,
    
  }; 

  componentDidMount() {
   this.random()
   this.startTimer();
   }  

  
   startTimer = () => {
    this.timerFunction = setInterval(() => {
      const {timer} = this.state
      if (timer > 0) {
        this.setState(prevState => ({timer: prevState.timer - 1}))
      } else {
        clearInterval(this.timerFunction)
        this.setState({timeUp: true}) 
      }
    }, 1000)
  }
  

  clearTimer = () => {
    // Stop the countdown
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  };

  random() {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]]; 
    }
    this.setState({ questions }); 
  }

  onClickAnswers = (selectedAnswer) => {
    const { currentQuestionIndex, userAnswers } = this.state;
    const isCorrect = selectedAnswer === questions[currentQuestionIndex].answer;
    this.setState(
      {
        userAnswers: [...userAnswers, { questionIndex: currentQuestionIndex, isCorrect }],
      },
      this.nextQuestion
    );
  };

  
  nextQuestion = () => {
    const { currentQuestionIndex } = this.state;
    if (currentQuestionIndex < questions.length - 1) {
      this.setState({ currentQuestionIndex: currentQuestionIndex + 1 });
    } else {
      this.setState({ isComplete: true });  
      this.calculateResults();
     
    }
  }; 

 

  
  calculateResults = () => {
    const { userAnswers } = this.state;
    let correctCount = 0;
    let incorrectCount = 0;

    
    userAnswers.forEach(answer => {
      if (answer.isCorrect) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    });

 
    this.setState({ correctAnswers: correctCount, incorrectAnswers: incorrectCount }, this.updateHighScore);
  };

 


  onSubmit = () => {
    const { navigate } = this.props;  
    const {correctAnswers,incorrectAnswers,timer } = this.state;
    const formattedTimer = this.formatTime(timer)
    navigate('/result', { state: {correctAnswers,incorrectAnswers,formattedTimer } });  
  }; 

  formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = timeInSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }


  render() {
    const {currentQuestionIndex,isComplete,timer} = this.state;
    const formattedTimer = this.formatTime(timer)
    const currentQuestion = questions[currentQuestionIndex]
    return (
      <div className='home-container'>
        <div className='home-content-container'>
        <div className='quiz-questions-container'>
          <h1 className='quiz'>Quiz App</h1>
          <div className='timer'>
          <p className='time-text'>Time left</p>
          <p className='time-text'>{formattedTimer}</p>
          </div>
          
            <>
            <div className="question-container">
                <h1 className='question'>{currentQuestion.question}</h1>
                <ul className="options">
                  {currentQuestion.options.map((option, id) => (
                    <li key={id} className='list-container'>
                      <button onClick={() => this.onClickAnswers(option)}  className='option-button'>
                        {option}
                      </button>
                      </li>
                  ))}
                 </ul>
              </div>
            </>
            <button type="button" className='start-btn'>Let's start the quiz</button>
      </div>
      
        {isComplete && (
          <div>
            <button onClick={this.onSubmit} type="button" className='submit-btn'>
            Submit
          </button>
          </div>
             
          
         )}
      </div>
      </div>
    );
  }
}

export default HomeWrapper; 

