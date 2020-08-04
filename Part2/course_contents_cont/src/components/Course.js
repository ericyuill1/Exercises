import React from 'react'

const Course = ({courses}) => {
    return (
      <div>
          <h1>
            Web development curriculum
          </h1>
        {courses.map(course =>
          <div>
            <Header key = {course.id} course = {course.name}/>
            <Content key = {course.id} parts = {course.parts}/>
          </div>
        )}
      </div>
    )
  }
  
  const Header = ({course}) => {
    return (
      <div>
        <h3>
          {course}
        </h3>
      </div>
    )
  }
  
  const Content = ({parts}) => {
  
    const exeArr = parts.map(notes => notes.exercises)
      console.log(exeArr)
    var sum = exeArr.reduce(function(a, b){
      return a + b;
    }, 0);
      console.log(sum)
  
    return (
      <div>
        {parts.map(note =>
          <Parts key = {note.id} note = {note}/>
        )}
        <Total sum = {sum}/>
      </div>
    )
  }
  
  const Parts = ({ note }) => {
    return (
      <p>{note.name} {note.exercises}</p>
    )
  }
  
  const Total = ({sum}) => {
    return (
      <h3>
        total of {sum} exercises
      </h3>
    )
  }

  export default Course