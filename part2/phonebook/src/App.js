import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

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
  };
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Search phonebook</h3>
      <input value={search} onChange={handleSearch} />

      <h3>Add a new entry</h3>
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
        {persons.filter(person => RegExp(search, 'i').test(person.name)).map(person => <p key={person.name}>{person.name}, {person.number}</p>)}
      </div>
    </div>
  );
};

export default App;
