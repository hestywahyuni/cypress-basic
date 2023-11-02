describe('User Can Open Login Page Edited', () => {
  it('user can open login page', () => {
    cy.visit('http://localhost:8000/');
    cy.get('h4').should("have.text", "Login");
  })
})
