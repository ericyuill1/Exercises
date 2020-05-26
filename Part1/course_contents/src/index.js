import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Text = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Text part = {props.cpart1} exercise = {props.cexercises1}/>
      <Text part = {props.cpart2} exercises = {props.cexercises2}/>
      <Text part = {props.cpart3} exercises = {props.cexercises3}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course.name}/>
      <Content cpart1 = {course.parts[0].name} cexercises1 = {course.parts[0].exercises} cpart2 = {course.parts[1].name} cexercises2 = {course.parts[1].exercises} cpart3 = {course.parts[2].name} cexercises3 = {course.parts[2].exercises}/>
      <Total exercises1 = {course.parts[0].exercises} exercises2 = {course.parts[1].exercises} exercises3 = {course.parts[2].exercises}/>
    </div>
  )
}

//done

ReactDOM.render(<App />, document.getElementById('root'))