import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => {

  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

const Statistics = (props) => {

  if (props.good + props.neutral + props.bad === 0) {
    return (
    <div>
      No feedback given
    </div>
    )
  }
  
  return (
    <table>
      <colgroup span = "2"></colgroup>
        <tbody>
          <tr>
            <td>
              <Statistic text = "good"/>
            </td>
            <td>
              <Statistic value = {props.good}/>
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text = "neutral"/>
            </td>
            <td>
              <Statistic value = {props.neutral}/>
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text = "bad"/>
            </td>
            <td>
              <Statistic value = {props.bad}/>
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text = "all"/>
            </td>
            <td>
              <Statistic value = {props.good + props.neutral + props.bad}/>
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text = "average"/>
            </td>
            <td>
              <Statistic value = {(props.good + props.neutral + props.bad)/3}/>
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text = "positive"/>
            </td>
            <td>
              <Statistic value = {props.good * 100 / (props.good + props.neutral + props.bad) + '%'}/>
            </td>
          </tr>
      </tbody>
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
      <div>
        <h1>
          give feedback
        </h1>
      </div>
    )
  }

  const Display2 = () => {
    return (
      <div>
        <h1>
          statistics
        </h1>
      </div>
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