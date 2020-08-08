import React from 'react'

const PersonForm = (props) => {
  
    return (
      <form onSubmit = {props.addName}>
          
            <tr>
              <td>
            name: <input value = {props.newName}
            onChange = {props.handleNameChange}/>
              </td>
              <td>
            number: <input value = {props.newNumber}
            onChange = {props.handleNumberChange}/>
              </td>
            </tr>
          
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

export default PersonForm