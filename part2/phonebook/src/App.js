import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const Filter = ({ newFilter, setNewFilter }) => {

  return (
    <>
      filter shown with <input value={newFilter} onChange={(event) => setNewFilter(event.target.value)} />
    </>
  )
}

const Form = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => {

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        number: <input type="tel" value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person, remove }) => {
  return (
    <>
      {person.name} {person.number} <button onClick={remove}>delete</button><br />
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const toShow = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const showNotification = (message, type) => {
    setMessageType(type)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const personToFind = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (persons.find(({ name }) => name.toLowerCase() === newName.toLowerCase())) {
      if (newNumber === '') {
        return alert(`${newName} is already added to phonebook`)
      }
      if (
        window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
      ) {
        personService
          .update(personToFind.id, nameObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== personToFind.id ? person : updatedPerson))
            showNotification(`Updated ${newName}`, 'success')
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== personToFind.id))
            showNotification(`Unable to update ${newName}. User no longer exists`, 'error')
          })
      }
    } else {
      personService
        .create(nameObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          showNotification(`Added ${newName}`, 'success')
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== personToFind.id))
          showNotification(`Unable to add ${newName}. Unknown error occured`, 'error')
        })
    }
    setNewName('')
    setNewNumber('')
  }
  const removePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .catch(error => {
          console.log('User already deleted')
        })
      setPersons(persons.filter(n => n.id !== person.id))
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>Add a new</h2>
      <Form addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      {toShow.map(person =>
        <Person
          key={person.name}
          person={person}
          remove={() => removePerson(person)} />
      )}
    </>
  )
}

export default App