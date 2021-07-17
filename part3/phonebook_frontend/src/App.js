import React, { useState, useEffect } from 'react'
import personServices from './services/persons'

const Notification = ({ message, color }) => {
  const greenNotificationStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null || message === '') {
    return null
  }

  return (
    <div style={greenNotificationStyle}>
      {message}
    </div>
  )
}


const Person = ({person, deletePerson}) => (
  <div>
    {person.name} {person.number} <button onClick={deletePerson} >delete</button>
  </div>
)

const Persons = ({persons, deletePerson}) => (
  <div>
    {persons.map(person => <Person key={person.name} person={person} deletePerson={() => deletePerson(person.id)} />)}
  </div>
)

const NameFilter = ({nameFilter, handleNameFilterChange}) => (
  <div>
    filter show with <input value={nameFilter} onChange={handleNameFilterChange} />
  </div>
)

const PersonForm = ({addNewRecord, newName, handleNameChange, newNumber, handleNumberChange}) => (
  <form onSubmit={addNewRecord}>
    <div>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </div>
  </form>
)

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ notification, setNotification ] = useState('')
  const [ error, setError ] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  },[])

  const addNewRecord = (event) => {
    event.preventDefault()
    const newRecord = {name: newName, number: newNumber}

    if (persons.findIndex(p => p.name === newRecord.name) >= 0){
      const result = 
        window.confirm(`${newName} is already added to phonebook, do you want to replace old number?`)
      if (result){
        personServices
          .update(persons.find(p => p.name === newRecord.name).id, newRecord)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ?
              updatedPerson : person
            ))
            setNotification(`Updated ${updatedPerson.name}`)
            setTimeout(() => {setNotification('')}, 2000)
          })
          .catch( error => {
            if (error.response.data.error){
              console.log(error.response.data)
              setError(error.response.data.error)
              setTimeout(() => {setError('')}, 2000)
            } else {
              setError(`Can't update ${newRecord.name}, it has been already removed!`)
              setTimeout(() => {setError('')}, 2000)
              setPersons(persons.filter(person => person.id !== persons.find(p => p.name === newRecord.name).id))
            }
          })
      }
      return
    }

    personServices
      .create(newRecord)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${returnedPerson.name}`)
        setTimeout(() => {setNotification('')}, 2000)
      })
      .catch(error => {
        console.log(error.response.data)
        setError(error.response.data.error)
        setTimeout(() => {setError('')}, 2000)
      })

  }
  
  const deletePerson = (id) => {
    const result = window.confirm(`Are you sure to delete ${persons.find(person => person.id === id).name}?`);
    if (!result){
      return 
    }

    personServices
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        setError(`${persons.find(person => person.id === id).name} has been already deleted`)
        setTimeout(() => {setError('')}, 2000)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.includes(nameFilter))

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notification} color='green'/>
        <Notification message={error} color='red'/>
        <NameFilter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        addNewRecord={addNewRecord}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
