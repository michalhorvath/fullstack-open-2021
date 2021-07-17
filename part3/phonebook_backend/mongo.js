const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('missing arguments')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://michalhorvath:${password}@cluster0.r4vnp.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('person', personSchema)

const addPerson = (name, number) => {
  const person = new Person({ name, number })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

const printPersons = () => {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  addPerson(name, number)
} else if (process.argv.length === 3) {
  printPersons()
} else {
  console.log('wrong arguments')
}
