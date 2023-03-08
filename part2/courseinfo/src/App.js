const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(parts =>
        <Part key={parts.id} part={parts} />
      )}
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({ sum }) => {
  return (
    <p><b>Total of {sum} exercises</b></p>
  )
}

const Course = ({ course }) => {
  const sum = course.parts
  .map((part) => part.exercises)
  .reduce((prev, cur) => prev + cur)

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'The final frontier',
        exercises: 57,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App