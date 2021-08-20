import React, {useState, useEffect} from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, BOOKS_BY_GENRE } from '../queries.js'

const Books = (props) => {
  const meResult = useQuery(ME)
  const [getBooks, booksResult] = useLazyQuery(BOOKS_BY_GENRE)
  const [recomendedBooks, setRecommendedBooks] = useState(null)

  useEffect(() => {
    if (meResult.data){
      getBooks({variables: {genre: meResult.data.me.favoriteGenre}})
    }
  }, [meResult.data]) // eslint-disable-line 

  useEffect(() => {
    if (booksResult.data) {
      setRecommendedBooks(booksResult.data.allBooks)
    }
  }, [booksResult.data]) // eslint-disable-line 

  if (!props.show) {
    return null
  }
  if (!recomendedBooks){
    return (<div>loading...</div>)
  }


  const genre = meResult.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre {genre}</div>
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
          {recomendedBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
