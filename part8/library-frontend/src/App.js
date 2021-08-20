import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import RecomendedBooks from './components/RecomendedBooks'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  useEffect( () => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

   const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert('New book added')
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token ?
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommendations')}>recommend</button>
              <button onClick={handleLogout}>logout</button>
            </>
          :
            <button onClick={() => setPage('login')}>login</button>
         }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <RecomendedBooks
        show={page === 'recommendations'}
      />

      <LoginForm 
        show={page === 'login'}
        setToken={setToken} setPage={setPage} 
        setError={(e) => console.log(e)} 
      />


    </div>
  )
}

export default App
