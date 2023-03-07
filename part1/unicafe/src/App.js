import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const Content = () => {
    return (
      <>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
      </>
    )
  }

  const Statistics = ({ good, neutral, bad }) => {
    const all = (good + neutral + bad)
    const average = (good - bad) / all
    const positive = (good / all) * 100 + '%'

    const StatisticLine = ({ text, value }) => {
      return (
        <>
          <tr><td>{text}</td><td>{value}</td></tr>
        </>
      )
    }

    if (all === 0) return (
      <>
        No feedback given
      </>
    )
    return (
      <>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      </>
    )
  }

  return (
    <>
      <h1>give feedback</h1>
      <Content />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App