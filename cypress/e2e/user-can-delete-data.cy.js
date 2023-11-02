describe('User Can Delete Data', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')

    //reset database
    cy.exec(
      "cd ../demo-app-cypress-automation &&  php artisan migrate:fresh --seed"
    )

    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('password');
    cy.get('.btn').click();
    cy.visit('http://localhost:8000/user-management/user');
  });

  it('user can delete data ', () => {
    //cara 1
    // cy.get(".table td").contains("user").next().next().next().contains("Delete").click();
    //cara 2
    // cy.get(".table td").contains("user").nextAll().contains("Delete").click();
    // cara 3
    // cy.get(".table td").contains("user").parent().contains("Delete").click();
    // cara 4 
    cy.get(".table td").contains("user").parent().find("button").contains("Delete").click();
    cy.get(".swal-button-container").find("button").contains("OK").click();
    // cy.get(':nth-child(3) > .text-right > .d-flex > .ml-2 > .btn').click();
    // cy.get(':nth-child(2) > .swal-button').click();
    // cy.get(':nth-child(2) > .col-12').click();
    // cy.get('p').should('be.visible');
    cy.get(".alert")
      .should("be.visible")
      .and("have.class", "alert-success")
      .contains("User Deleted Successfully");
    cy.get(".table").should("not.contain","user");
  });

  it('user can cancel delete data ', () => {
    cy.get(".table td").contains("user").parent().find("button").contains("Delete").click();
    cy.get(".swal-button-container").find("button").contains("Cancel").click();
    cy.get(".table td").contains("user").should("be.visible");
    /* ==== End Cypress Studio ==== */
  })
})