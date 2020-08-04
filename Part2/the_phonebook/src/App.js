import React, {useState, useEffect} from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Notification from "./components/Notification"
import Error from "./components/Error"
import noteService from './services/Names'

const refreshPage = () => {
  window.location.reload(false);
}

const Persons = (props) => {

  if (props.newFilter === '') {
    return (
      <div>
        {props.persons.map(note =>
          <Note key = {note.id} note = {note} />
        )}
      </div>
    )
  }

  if (props.filteredList.length === 0) {
    return (
      <div>
        no items match your search
      </div>
    )
  }

    return (
      <div>
        {props.filteredList.map(note =>
          <Note key = {note.id} note = {note} />
        )}
      </div>
    )
  }

  const Note = ({ note }) => {

  const [ persons, setPersons ] = useState([])

  const cease = () => {
    if (window.confirm("Delete " + note.name + "?")) {
      
        noteService
          .rid(note.id)
        noteService
          .getAll()
          .then(response => {
          setPersons(response.data)
        })

        refreshPage()
        
      }

    return

    }

  return (
    <div>
      {note.name} {note.number}
      <button onClick = {cease}>
        delete
      </button>
    </div>
  )
}

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ filteredList, setNewList ] = useState([])
  const [addMessage, setAddMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const checkPerson = (person) => person.name === newName
    const checkNumber = (person) => person.number === newNumber

    const nameObject = {
      name: newName,
      number: newNumber,
      id: Math.max(persons.id) + 1
    }

    if (persons.some(checkPerson)) {
      const match = persons.filter(person => person.name.includes(newName))
      console.log("match", match)
      console.log("match.id", match[0].id)
      if (window.confirm(newName + ' is already added to the phonebook, replace the old number with the new one?')) {
        
        const replaceObject = {
          name: match[0].name,
          number: newNumber,
          id: match[0].id
        }

        noteService
          .update(match[0].id, replaceObject)
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} was already deleted from the server`
            )
            setTimeout(() => {
              setAddMessage(null)
              refreshPage()
            }, 5000)
            setNewName('')
            setNewNumber('')
            return
            })
            setAddMessage(
              `Updating ${nameObject.name}'s number`
            )
            setTimeout(() => {
              setAddMessage(null)
              refreshPage()
            }, 1000)
          }
          return
        }
          

    if (persons.some(checkNumber)) {
      window.alert(newNumber + ' is already in use')
      setNewNumber('')
      return
    }
    
    noteService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setAddMessage(
          `Added '${nameObject.name}'`
        )
        setTimeout(() => {
          setAddMessage(null)
        }, 5000)
      })
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
      <Notification message={addMessage}/>
      <Error message={errorMessage}/>
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