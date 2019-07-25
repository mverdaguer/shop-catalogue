describe('Contact page', () => {
  it('Send a message', () => {
    cy.visit('/contact');

    const buttonIsDisabled = () => {
      cy.get('form')
      .find('button')
      .should('be.disabled');
    };

    buttonIsDisabled();

    cy.get('form input')
      .eq(0)
      .type('name');
    buttonIsDisabled();

    cy.get('form input')
      .eq(1)
      .type('phone');
    buttonIsDisabled();

    cy.get('form input')
      .eq(2)
      .type('mail');
    buttonIsDisabled();

    cy.get('form textarea')
      .type('content');
    
    cy.get('form')
      .find('button')
      .should('be.enabled');

    // Dialog.
    cy.get('div.el-message-box__wrapper')
      .should('not.be.visible');

    cy.get('form')
      .find('button')
      .click();

    cy.get('div.el-message-box__wrapper')
      .should('be.visible');

    cy.get('div.el-message-box__wrapper')
      .find('button.el-button--primary')
      .click();

    cy.get('div.el-message-box__wrapper')
      .should('not.be.visible');
  });
});


