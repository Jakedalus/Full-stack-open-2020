import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
);

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad;
  const average = (good + (bad * -1)) / all;
  const positive = (good / all) * 100;
  
  return (
  <div>
    { all !== 0 ?
    <table>
      <tbody>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='average' value={average} />
        <Statistic text='positive' value={positive} />
      </tbody>
    </table> :
    <div>
      <p>No feedback given</p>
    </div>
    }
  </div>
)};

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