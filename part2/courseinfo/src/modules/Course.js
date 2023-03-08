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
        <p>{part.name} {part.exercises}</p>
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

export default Course