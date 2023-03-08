import { useState } from 'react'

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

const People = ({toShow}) => {
  return (
    <>
      {toShow.map(person =>
        <Person key={person.name} person={person} />
      )}
    </>
  )
}

const Person = ({ person }) => {
  return (
    <>
      {person.name} {person.number}<br />
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const toShow = persons.filter(person => person.name.toLowerCase().includes(newFilter))

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
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>Add a new</h2>
      <Form addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <People toShow={toShow} />
    </>
  )
}

export default App