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
// const Display = ({counter}) => (
//   <div>{counter}</div>
// );

// const Button = ({handleClick, text}) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// );

// const App = props => {
//   const [ counter, setCounter ] = useState(0);

//   // setTimeout(() => setCounter(counter + 1), 1000);

//   const increaseByOne = () => setCounter(counter + 1);
//   const decreaseByOne = () => setCounter(counter - 1);
//   const setToZero = () => setCounter(0);

//   return (
//     <>
//       <Display counter={counter} />
//       <Button handleClick={decreaseByOne} text={'-'} />
//       <Button handleClick={increaseByOne} text={'+'} />
//       <Button handleClick={setToZero} text={'reset'} />
//     </>
//   );
// }


///// MORE COMPLEX STATE

const History = props => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    );
  };

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
};

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const App = props => {
  // const [clicks, setClicks] = useState({
  //   left: 0, right: 0
  // });
  // const handleLeftClick = () => {
  //   setClicks({...clicks, left: clicks.left + 1});
  // };
  // const handleRightClick = () => {
  //   setClicks({...clicks, right: clicks.right + 1});
  // };

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  };

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text={'left'} />
      <Button handleClick={handleRightClick} text={'right'} />
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));