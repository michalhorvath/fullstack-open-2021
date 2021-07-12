import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(a => 0))

  const handleNext = () => {
    const randomAnecdode = Math.floor(Math.random() * (anecdotes.length-1) )
    setSelected(randomAnecdode)
  }

  const handleVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  const mostVotes = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <div>
        <button onClick={handleVote} >vote</button>
        <button onClick={handleNext} >next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotes]}
      <div>has {votes[mostVotes]} votes</div>
    </div>
  )
}

export default App
