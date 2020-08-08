

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

//console.log("THEURL", url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'name is shorter than minimum allowed length'],
    required: true
  },
  number: {
    type: Number,
    min: [9999999.5, 'number not long enough'],
    required: true
  }
})

noteSchema.plugin(uniqueValidator)

// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

module.exports = mongoose.model('Person', noteSchema)