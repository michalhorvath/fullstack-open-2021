import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries.js'

const Books = (props) => {
  const results = useQuery(ALL_BOOKS)
  const [ genre, setGenre ] = useState(null)

  useEffect(() => {
    if(results.data){
      results.refetch()
    }
  }, [genre]) // eslint-disable-line 

  if (!props.show) {
    return null
  }
  if (results.loading){
    return (<div>loading...</div>)
  }

  const books = results.data.allBooks
  const filteredBooks = books.filter(b => b.genres.includes(genre))
  const genres = books ? books
      .map(b => b.genres)
      .reduce((acc, value) => acc.concat(value), [])
      .filter((value, i, self) => self.indexOf(value) === i) : null

  return (
    <div>
      <h2>books</h2>
      <div>genre is {genre}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres ? genres.map(g => <button key={g} 
            onClick={(event) => setGenre(event.target.innerHTML)} >{g}</button>)
          : null}
      </div>
    </div>
  )
}

export default Books
