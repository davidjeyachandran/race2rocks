describe('spec.cy.ts', () => {

  const WEB_URL = 'http://localhost:3000/race2rocks'
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit(WEB_URL)
  })

  it('should have the correct title', () => {
    cy.get('h1').should('have.text', 'Race 2 the Rocks')
  })
})
