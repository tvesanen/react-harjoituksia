import React, { useState, useEffect } from 'react'
import Details from './components/detail'
import Filter from './components/filter'
import axios from 'axios'

axios
.get('http://localhost:3001/persons')
.then(response => {
  console.log(response)
})


const App = () => {
  const [ persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '050-5559478' }
  ])

  const [ newName, setNewName ] = useState('uusi nimi...')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  // Return true if the person already exist
  const match = (element) => {
    return element.name === newName
  }

  // Add new person to persons-array
  const addPerson = (event) => {
    event.preventDefault()                  // prevent default operation of submit
    console.log('Lisätään henkilö ', newName)
    if (persons.some(match)) {              // check if the person with given name already exists in persons-table
      window.alert (`${newName} on jo luettelossa` )
    }
    else {                                  // new name -> add to the table
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(nameObject))
      setNewName('')                        // empty the input field for new name
      setNewNumber('')                      // empty the input field for new number
   }
}

    const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)         // copy the input field value to newName
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)         // copy the input field value to newNumber
  }

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setNewFilter(event.target.value)         // copy the input field value to newFilter
  }


  const personstoShow = persons.filter(person => person.name.includes(newFilter))

  const rows = () => personstoShow.map(person =>
      <Details
        key={person.id}
        name={person.name}
        number={person.number}
      />
    )

// fetch data from server using useEffect
    const hook = () => {
      console.log('effect')
      axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
    }

    useEffect(hook,[])      // empty array in second parameter means that hook effect is executed only once

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <form onSubmit={addPerson}>
        <div>
          nimi:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          numero:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
        <ul>
          {rows()}
        </ul>
    </div>
  )

}

export default App
