import React from "react";
import Person from "./Person";

const PersonList = ({ search, persons }) => (
  <div>
    <h2>Numbers</h2>
    {persons
      .filter((person) => RegExp(search, "i").test(person.name))
      .map((person) => (
        <Person key={person.name} person={person} />
      ))}
  </div>
);

export default PersonList;
