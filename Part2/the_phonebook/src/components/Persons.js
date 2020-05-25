import React from 'react'
import Note from "./Note"

const Persons = (props) => {

  if (props.filteredList.length === 0) {
    return (
      <div>
        no items match your search
      </div>
    )
  }

  if (props.newFilter === '') {
    return (
      <div>
        {props.persons.map(note =>
          <Note key = {note.id} note = {note} />
        )}
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

export default Persons