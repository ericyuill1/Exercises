import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.courseName}
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
      <Text part = {props.cparts[0].name} exercise = {props.cparts[0].exercises}/>
      <Text part = {props.cparts[1].name} exercises = {props.cparts[1].exercises}/>
      <Text part = {props.cparts[2].name} exercises = {props.cparts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.cparts[0].exercises + props.cparts[1].exercises + props.cparts[2].exercises}
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
      <Header courseName = {course.name}/>
      <Content cparts = {course.parts}/>
      <Total cparts = {course.parts}/>
    </div>
  )
}

//done

ReactDOM.render(<App />, document.getElementById('root'))