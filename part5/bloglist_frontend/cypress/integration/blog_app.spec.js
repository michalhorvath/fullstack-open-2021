describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Brambo',
      username: 'john',
      password: 'iluvkitties123'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('john')
      cy.get('#password').type('iluvkitties123')
      cy.get('#login').click()

      cy.contains('John Brambo logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('john')
      cy.get('#password').type('wrongpass')
      cy.get('#login').click()

      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'john', password: 'iluvkitties123' })
    })

    it('A blog can be created', function() {
      cy.contains('add new blog').click()
      cy.get('#title').type('Point in polygon')
      cy.get('#author').type('unknown')
      cy.get('#url').type('https://en.wikipedia.org/wiki/Point_in_polygon')
      cy.contains('submit').click()
      cy.contains('new blog Point in polygon by unknown added')
      cy.get('.blog').should('have.length', 1)
    })

    describe('When conaining one blog', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Grrr', author: 'Janko', url:'abc' })
      })

      it('User can like blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
        cy.contains('like').click()
        cy.contains('likes 2')
      })

      it('User can delete own blog', function() {
        cy.contains('view').click()
        cy.get('.blog').should('have.length', 1)
        cy.contains('remove').click()
        cy.get('.blog').should('have.length', 0)
      })

      it('User can not delete other blog', function() {
        cy.contains('log out').click()

        const user = {
          name: 'Eugen Wurtendrauss',
          username: 'flyman',
          password: 'halfflyhalfman'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)

        cy.login({ username: 'flyman', password: 'halfflyhalfman' })
        cy.contains('view').click()

        cy.get('.blog').should('have.length', 1)
        cy.contains('remove').should('have.length', 0)
      })

    })

    describe('When conaining multiple blog', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'First', author: 'Carl', url:'example.com/first' })
        cy.createBlog({ title: 'Second', author: 'Betty', url:'example.com/second' })
        cy.createBlog({ title: 'Third', author: 'Leo', url:'example.com/third' })
      })

      it('Blogs are ordered by likes', function() {
        cy.contains('First').contains('view').click()
        cy.contains('First').contains('like').click()
        cy.contains('First').contains('likes 1')

        cy.contains('Second').contains('view').click()
        cy.contains('Second').contains('like').click()
        cy.contains('Second').contains('likes 1')
        cy.contains('Second').contains('like').click()
        cy.contains('Second').contains('likes 2')
        cy.contains('Second').contains('like').click()
        cy.contains('Second').contains('likes 3')

        cy.contains('Third').contains('view').click()
        cy.contains('Third').contains('like').click()
        cy.contains('Third').contains('likes 1')
        cy.contains('Third').contains('like').click()
        cy.contains('Third').contains('likes 2')

        cy.get('.likes').then(function(likes) {
          likes.each(function(i) {
            if (i > 0){
              expect(Number(likes[1].innerText.split(' ')[1]))
                .to.be
                .most(Number(likes[i-1].innerText.split(' ')[1]))
            }
          })
        })
      })


    })
  })
})
