import React from "react";

const Filter = ({ search, handleSearch }) => (
  <div>
    <h3>Search phonebook</h3>
    <input value={search} onChange={handleSearch} />
  </div>
);

export default Filter;
