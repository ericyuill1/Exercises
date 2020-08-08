const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@openstack.jobjd.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', noteSchema)

if (name === null && number === null) {
  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
  return
}

const person = new Person({
  name: name,
  number: number
})

person.save().then(result => {
  console.log(result)
  console.log('added', person.name, person.number, 'to phonebook')
  mongoose.connection.close()
})