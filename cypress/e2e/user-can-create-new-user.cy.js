describe('template spec', () => {
  before(() => {
    cy.log("runs once before all tests in the block");
  });

  after(() => {
    cy.log("runs once after all tests in the block");
  });

  afterEach(() => {
    cy.log("runs once after each tests in the block");
  });
  
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
    cy.get('.card-header-action > .btn-icon').click();
  });
  
  //positif test case
  it('user can create new user', () => {
    cy.get('#name').type('baru');
    cy.get('#email').type('baru@gmail.com');
    cy.get('#password').type('1234567890');
    cy.get('.btn-primary').click();
    cy.get('p').click();

    //assert
    cy.get('p').should('be.visible');
    cy.get('p').should('have.text', 'Data Berhasil Ditambahkan');
    cy.get('.navbar-right > :nth-child(2) > .nav-link').click();
    cy.get('.text-danger').click();
    /* ==== End Cypress Studio ==== */
  })

  //negatif test case
  it('user cannot create new user because invalid email', () => {
    cy.get('#name').type('baru2');
    cy.get('#email').click();
    cy.get('#email').type('baru2');
    cy.get('#password').type('baru2');
    cy.get('.btn-primary').click();
    cy.get('.card-body').click();
    cy.get('.invalid-feedback').should('have.text', '\n                                    The email must be a valid email address.\n                                ');
    cy.get('.card-body').click();
    cy.get('.invalid-feedback').should('be.visible');
    cy.get('.navbar-right > :nth-child(2) > .nav-link').click();
    cy.get('.text-danger').click();
  }) 
})