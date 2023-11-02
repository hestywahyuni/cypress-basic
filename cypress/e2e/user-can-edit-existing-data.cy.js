describe('User Can Edit Existing Data', () => {
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


  it('User Can Edit Existing Data', () => {
    cy.get(".table td").contains("user").parent().find("a").contains("Edit").click();
    cy.get('#name').clear('user ');
    cy.get('#name').type('user Edited ');
    cy.get('.btn-primary').contains("Submit").click();
    cy.get(".table td").contains("user").should("have.text","user Edited");
    cy.get(".alert")
      .should("be.visible")
      .and("have.class", "alert-success")
      .contains("User Berhasil Diupdate");
  });
})