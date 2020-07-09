import React from "react";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>
      <strong>Number of exercises {sum}</strong>
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total course={course} />
  </div>
);

export default Course;
