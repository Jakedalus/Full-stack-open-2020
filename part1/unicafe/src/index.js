import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Statistics = ({good, neutral, bad}) => (
  <div>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
  </div>
);

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (feedback) => {
    if (feedback === 'good') {
      setGood(good + 1);
    } else if (feedback === 'bad') {
      setBad(bad + 1);
    } else {
      setNeutral(neutral + 1);
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick('good')} text={'good'} />
      <Button handleClick={() => handleClick('neutral')} text={'neutral'} />
      <Button handleClick={() => handleClick('bad')} text={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, 
  document.getElementById('root')
);