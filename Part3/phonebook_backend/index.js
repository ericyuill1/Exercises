require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))

const Person = require('./models/person')

const cors = require('cors')
app.use(cors())

var morgan = require('morgan')
const { response } = require('express')
console.log(response)

app.use(morgan('tiny'))

morgan.token('string', function (request, response) {
  const body = request.body
  console.log(response)

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  return JSON.stringify(person)
})

app.use(morgan(':string'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
    console.log('PERSONS: ',persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    let length = persons.length
    //console.log('PERSONS: ',persons)
    let content = `<p1>Phonebook has info for ${length} people</p1><br><br><p1>${new Date()}</p1>`
    response.send(content)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (request, response) => {

  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    //.catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body
  //console.log(body)
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON)
    })
    .catch(error => next(error))


})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const checkPerson = (person) => person.name === body.name

  if (persons.some(checkPerson)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
