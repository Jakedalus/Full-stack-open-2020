import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: '555-555-5555' }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addName = (event) => {
    // console.log('addName', newName, persons, persons.map(person => person.name).includes(newName));
    event.preventDefault();
    if (newName !== '' && newNumber !== '') {
      if (persons.map(person => person.name).includes(newName)) {
        window.alert(`${newName} is already added to phonebook`)
      } else {
        const newPerson = {name: newName, number: newNumber};
        setPersons(persons.concat(newPerson));
        setNewName('');
      }
      
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        {/* <div>debug: {newName}</div> */}
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name}, {person.number}</p>)}
      </div>
    </div>
  );
};

export default App;
