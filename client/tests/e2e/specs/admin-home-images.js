describe('Admin home images page', () => {
  const checkImage = (index, name) => {
    cy.get('table tr.el-table__row')
      .eq(index)
      .find('img')
      .should('have.attr', 'src')
      .should('include', name);
  };

  it('List home images', () => {
    cy.visit('/admin_home_images');

    cy.get('table tr.el-table__row')
      .should('have.length', 4);

    checkImage(0, 'lemon');
    checkImage(1, 'coffee');
    checkImage(2, 'sushi');
    checkImage(3, 'vegetables');
  });
  
  it('Add home image', () => {
    cy.visit('/admin_home_images');

    // Click button - check that dialog appears.
    cy.get('div.el-dialog__wrapper')
      .should('not.be.visible');
    cy.get('div.el-row button.el-button--primary')
      .click();
    cy.get('div.el-dialog__wrapper')
      .should('be.visible');

    // Cancel, the dialog is hidden.
    cy.get('div.el-dialog__wrapper')
      .find('button.el-button--default')
      .eq(1)
      .click();
    cy.get('div.el-dialog__wrapper')
      .should('not.be.visible');

    // Click button and accept - a new row is added.
    cy.get('div.el-row button.el-button--primary')
      .click();
    cy.get('div.el-dialog__wrapper')
      .find('button.el-button--primary')
      .eq(1)
      .click();
    cy.get('div.el-dialog__wrapper')
      .should('not.be.visible');

      cy.get('table tr.el-table__row')
      .should('have.length', 5);
  });

  
  it('Remove image', () => {
    cy.visit('/admin_home_images');

    cy.get('div.el-dialog__wrapper')
      .should('not.be.visible');

    cy.get('table tr.el-table__row')
      .eq(0)
      .find('button.el-button--danger')
      .click();

    cy.get('div.el-dialog__wrapper')
      .should('be.visible');

    cy.get('div.el-dialog__wrapper')
      .find('button.el-button--primary')
      .eq(0)
      .click();

    cy.get('div.el-dialog__wrapper')
      .should('not.be.visible');
      
    cy.get('table tr.el-table__row')
      .should('have.length', 3);
      
    checkImage(0, 'coffee');
    checkImage(1, 'sushi');
    checkImage(2, 'vegetables');
  });
});


