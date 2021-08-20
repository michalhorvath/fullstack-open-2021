import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  author {
    name
    born
  }
  id
  genres
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    id
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
mutation createBook( $title: String!, $published: Int!, $author: String!, $genres: [String!]!) { 
      addBook(
        title: $title, 
        published: $published, 
        author: $author, 
        genres: $genres) {
        title
        published
        author {
          name
        }
        id
        genres
      }
    }
`

export const SET_BIRTHYEAR = gql`
mutation setBirthyear( $name: String!, $setBornTo: Int!) { 
        editAuthor(
        name: $name, 
        setBornTo: $setBornTo) {
        name
        id
        born
        bookCount
      }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const BOOKS_BY_GENRE = gql`
query booksByGenre($genre: String!){
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
