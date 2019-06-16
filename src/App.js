import React from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './components/Question';

constructor(props) {
  super(props);

  this.state = {
    counter: 0,
    questionId: 1,
    question: '',
    answerOptions: [],
    answer: '',
    answersCount: {},
    result: ''
  };
}
this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

componentDidMount() {
  const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));

  this.setState({
    question: quizQuestions[0].question,
    answerOptions: shuffledAnswerOptions[0]
  });
}


shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

setUserAnswer(answer) {
  this.setState((state) => ({
    answersCount: {
      ...state.answersCount,
      [answer]: (state.answersCount[answer] || 0) + 1
    },
    answer: answer
  }));
}

setNextQuestion() {
  const counter = this.state.counter + 1;
  const questionId = this.state.questionId + 1;
  this.setState({
    counter: counter,
    questionId: questionId,
    question: quizQuestions[counter].question,
    answerOptions: quizQuestions[counter].answers,
    answer: ''
  });
}

getResults() {
  const answersCount = this.state.answersCount;
  const answersCountKeys = Object.keys(answersCount);
  const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
  const maxAnswerCount = Math.max.apply(null, answersCountValues);

  return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
}

setResults (result) {
  if (result.length === 1) {
    this.setState({ result: result[0] });
  } else {
    this.setState({ result: 'Undetermined' });
  }
}

handleAnswerSelected(event) {
  this.setUserAnswer(event.currentTarget.value);
  if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);

    }
}

renderQuiz() {
  return (
    <Quiz
      answer={this.state.answer}
      answerOptions={this.state.answerOptions}
      questionId={this.state.questionId}
      question={this.state.question}
      questionTotal={quizQuestions.length}
      onAnswerSelected={this.handleAnswerSelected}
    />
  );
}

renderResult() {
  return (
    <Result quizResult={this.state.result} />
  );
}

render() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>React Quiz</h2>
      </div>
      //<Quiz
      //  answer={this.state.answer}
      //  answerOptions={this.state.answerOptions}
      //  questionId={this.state.questionId}
      //  question={this.state.question}
      //  questionTotal={quizQuestions.length}
      //  onAnswerSelected={this.handleAnswerSelected}
      ///>
      {this.state.result ? this.renderResult() : this.renderQuiz()}

    </div>
  )
}

export default App;
