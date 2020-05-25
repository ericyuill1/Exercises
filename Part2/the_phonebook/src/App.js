import React, {useState} from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {

  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 0},
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 1}
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ filteredList, setNewList ] = useState([...persons])

  const addName = (event) => {
    event.preventDefault()
    const checkPerson = (person) => person.name === newName
    if (persons.some(checkPerson)) {
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
    let filteredList = persons.filter(person => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setNewList(filteredList)
    console.log(filteredList)
  }

  console.log("newFilter: ", newFilter)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}/>
      <PersonForm addName = {addName} newName = {newName} 
        handleNameChange = {handleNameChange} newNumber = {newNumber} 
        handleNumberChange = {handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons = {persons} newFilter = {newFilter} filteredList = {filteredList}/>
    </div>
  )
}

export default App