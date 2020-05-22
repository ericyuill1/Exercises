import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {

  const [selected, setSelected] = useState(0)

  const [ index0, setindex0 ] = useState(0)
  const [ index1, setindex1 ] = useState(0)
  const [ index2, setindex2 ] = useState(0)
  const [ index3, setindex3 ] = useState(0)
  const [ index4, setindex4 ] = useState(0)
  const [ index5, setindex5 ] = useState(0)

  const points = [index0, index1, index2, index3, index4, index5]

  let index = 0

  const handleRandomClick = () => {
    while (index === selected) {
      index = Math.round(5 * Math.random(0,5))
    }
    setSelected(index)
  }

  const handleVote = () => {
    if (selected === 0) {
      setindex0(index0 + 1)
    }
    if (selected === 1) {
      setindex1(index1 + 1)
    }
    if (selected === 2) {
      setindex2(index2 + 1)
    }
    if (selected === 3) {
      setindex3(index3 + 1)
    }
    if (selected === 4) {
      setindex4(index4 + 1)
    }
    if (selected === 5) {
      setindex5(index5 + 1)
    }
  }

  console.log("votes", points)
  console.log("Max", points.indexOf(Math.max(...points)))
  

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
      <p>
        {props.anecdotes[points.indexOf(Math.max(...points))]}
      </p>
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