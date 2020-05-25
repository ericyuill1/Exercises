import React, {useState} from 'react'
import Note from "./components/Note"

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 0},
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 1}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const checkPerson = (person) => person.name === newName
    if (persons.some(checkPerson)) {
      console.log("it's the same")
      window.alert(newName + ' is already a name')
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const filterPerson = (person) => person.name === newFilter
    if (persons.some(filterPerson)) {
      console.log("found_filtered")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>
          filter shown with <input value = {newFilter}
          onChange = {handleFilterChange}/>
        </p>
      </div>
      <form onSubmit = {addName}>
        <div>
          name: <input value = {newName}
          onChange = {handleNameChange}/>
        </div>
        <div>
          number: <input value = {newNumber}
          onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(note =>
          <Note key = {note.id} note = {note} />
        )}
    </div>
  )
}

export default App