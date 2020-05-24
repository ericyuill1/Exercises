import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }
  
  return (
    <table>
      <Statistic text = "good" value = {props.good}/>
      <Statistic text = "neutral" value = {props.neutral}/>
      <Statistic text = "bad" value = {props.bad}/>
      <Statistic text = "all" value = {props.good + props.neutral + props.bad}/>
      <Statistic text = "average" value = {(props.good + props.neutral + props.bad)/3}/>
      <Statistic text = "positive" value = {props.good * 100 / (props.good + props.neutral + props.bad) + '%'}/>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const Display1 = () => {
    return (
      <h1>
        give feedback
      </h1>
    )
  }

  const Display2 = () => {
    return (
      <h1>
        statistics
      </h1>
    )
  }

  return (
    <div>
      <Display1/>
      <Button handleClick = {handleGoodClick} text = "good"/>
      <Button handleClick = {handleNeutralClick} text = "neutral"/>
      <Button handleClick = {handleBadClick} text = "bad"/>
      <Display2/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))