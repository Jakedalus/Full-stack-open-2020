import React, { useState, useEffect } from 'react';



function App() {

  const [search, setSearch] = useState('');

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="App">
      <label htmlFor="search">find countries</label>
      <input onChange={handleChange} type="text" name="search" value={search}/>
      <ul id="countries">
      </ul>
    </div>
  );
}

export default App;
