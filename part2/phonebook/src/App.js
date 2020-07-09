import React, { useState } from "react";
import PersonList from './PersonList'
import Filter from  './Filter'
import PersonForm from './PersonForm'

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
        setNewNumber('');
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

      <Filter search={search} handleSearch={handleSearch} />

      <PersonForm 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      <PersonList search={search} persons={persons} />
    </div>
  );
};

export default App;
