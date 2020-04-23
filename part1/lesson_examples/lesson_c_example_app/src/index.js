import React, { useState } from 'react';
import ReactDOM from 'react-dom';


/////
// const Hello = ({name, age}) => {

//   const bornYear = () => new Date().getFullYear() - age;

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>
//         So You were probably born in {bornYear()}
//       </p>
//     </div>
//   );
// };

// const App = () => {
//   const name = 'Peter';
//   const age = 10;

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   );
// };


///// SIMPLE COUNTER EXAMPLE
// const App = ({counter}) => (
//   <div>{counter}</div>
// );

// let counter = 1;

// const refresh = () => {
//   ReactDOM.render(<App counter={counter} />, document.getElementById('root'));
// };

// setInterval(() => {
//   refresh()
//   counter += 1
// }, 1000);


///// COUNTER WITH STATE
const Display = ({counter}) => (
  <div>{counter}</div>
);

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const App = props => {
  const [ counter, setCounter ] = useState(0);

  // setTimeout(() => setCounter(counter + 1), 1000);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <>
      <Display counter={counter} />
      <Button handleClick={decreaseByOne} text={'-'} />
      <Button handleClick={increaseByOne} text={'+'} />
      <Button handleClick={setToZero} text={'reset'} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));