import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, value}) => (
  <tr>
    <td> {text} </td>
    <td> {value} </td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad
  let average = (good - bad) / all
  let positive = (good / all * 100) + " %"

  if (all == 0) {
    return (
      <div>
       No feedback given
      </div>
    )
  } else {
    return (
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={all} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positive} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}  />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

export default App
