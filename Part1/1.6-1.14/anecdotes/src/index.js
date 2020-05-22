import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(6).fill(0))

  const copy = [...points]

  const handleRandomClick = () => {
    let index = 0
    while (index === selected) {
      index = Math.round(5 * Math.random(0,5))
    }
    setSelected(index)
  }

  const handleVote = () => {
    copy[selected] += 1
    setPoints(copy)
  }

  const MaxVotes = (props) => {
    if (Math.max(...copy) === 0) {
      return (
        <div>
          <p>
            No one has voted yet...
          </p>
        </div>
      )
    }
      return (
        <div>
          <p>
            {props.anecdotes[copy.indexOf(Math.max(...copy))]}
          </p>
        </div>
      )
  }

  console.log("votes:", points)
  console.log("Max:", Math.max(...copy))
  console.log("Max Index:", copy.indexOf(Math.max(...copy)))
  
  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <p>
        {props.anecdotes[selected]}
      </p>
      <p>
        has {points[selected]} votes
      </p>
      <button onClick = {handleVote}>
        vote
      </button>
      <button onClick = {handleRandomClick}>
        next anecdote
      </button>
      <h1>
        Anectode with the most votes
      </h1>
      <MaxVotes anecdotes = {props.anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>,document.getElementById('root'))