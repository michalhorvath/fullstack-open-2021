import React, { useState } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import {ALL_AUTHORS, SET_BIRTHYEAR} from '../queries.js'

const Authors = (props) => {
  const results = useQuery(ALL_AUTHORS)

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [setBirthyear] = useMutation(SET_BIRTHYEAR)

  if (!props.show) {
    return null
  }
  if (results.loading){
    return (<div>loading...</div>)
  }

  const authors = results.data.allAuthors

  const submitBirthborn = (event) => {
    event.preventDefault()

    setBirthyear({variables: {
      name: name.value, 
      setBornTo: Number(born)
    }})
    
    setName(null)
    setBorn('')
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthborn</h3>
      <form onSubmit={submitBirthborn}>
        <Select value={name} onChange={setName} options={authors.map(a => { 
          return{
            value: a.name,
            label: a.name
          }})}/>
        <div>born: <input type='text' value={born} onChange={(event) => setBorn(event.target.value)} /></div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
