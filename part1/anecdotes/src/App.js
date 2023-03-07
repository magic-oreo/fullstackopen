import { useState } from 'react'

const App = () => {
  const anecdotes =
  [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const count = anecdotes.length - 1

  const Anecdotes = ({ anecdotes, points }) => {
    return (
      <>
        {anecdotes[selected]}<br />
        has {points[selected]} votes <br />
      </>
    )
  }

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const vote = (selected) => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  const selectRandom = (count) => {
    const handler = Math.floor(Math.random() * count)
    console.log(handler, "RNG")
    return (handler)
  }

  return (
    <>
      <Anecdotes anecdotes={anecdotes} points={points} />
      <Button handleClick={() => vote(selected)} text="vote" />
      <Button handleClick={() => setSelected(selectRandom(count))} text="next anecdote" />
    </>
  )
}

export default App