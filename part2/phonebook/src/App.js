import { useEffect, useState } from 'react'
import personService from './services/persons'

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
  const toShow = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(({ name }) => name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    personService
      .create(nameObject)
      .then(returnPerson => {
        setPersons(persons.concat(returnPerson))
        setNewName('')
        setNewNumber('')
      })
  }
  const removePerson = id => {
    const person = persons.find(n => n.id === id)
    const confirmation = window.confirm(`Delete ${person.name}?`)
    if (confirmation) {
      personService
        .removePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>Add a new</h2>
      <Form addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      {toShow.map(person =>
        <Person
          key={person.name}
          person={person}
          remove={() => removePerson(person.id)} />
      )}
    </>
  )
}

export default App