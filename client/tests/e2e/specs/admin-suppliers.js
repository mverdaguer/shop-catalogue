describe('Admin supliers page', () => {
  const navigateToCreateSupplier = () => {
    cy.get('div.el-row button.el-button--primary')
      .click();
    cy.get('h1')
      .contains('Create Provider');
  };

  it('List Suppliers', () => {
    cy.visit('/admin_suppliers');

    cy.get('table tr.el-table__row')
      .should('have.length', 3);

    cy.get('table tr.el-table__row')
      .eq(0)
      .contains('supplier 1');
      
    cy.get('table tr.el-table__row')
      .eq(1)
      .contains('supplier 2');
    
    cy.get('table tr.el-table__row')
      .eq(2)
      .contains('supplier 3');
  });
  
  it('Create Supplier', () => {
    cy.visit('/admin_suppliers');

    navigateToCreateSupplier();
    cy.get('form button.el-button--default')
      .click();
    cy.get('h1')
      .contains('Providers');

    navigateToCreateSupplier();
    cy.get('form button.el-button--primary')
      .should('be.disabled');

    cy.get('form input')
      .type('new-supplier');
    cy.get('form button.el-button--primary')
      .should('be.enabled');

    cy.get('form button.el-button--primary')
      .click();
    cy.get('h1')
      .contains('Providers');
  });

  it('Edit Supplier', () => {
    cy.visit('/admin_suppliers');

    cy.get('table tr.el-table__row')
      .eq(0)
      .find('button.el-button--default')
      .click();

    cy.get('h1')
      .contains('Update Provider');
    cy.get('form input')
      .should('have.value', 'supplier 1');

    cy.get('form input')
      .type('supplier 1 edit');
    cy.get('form button.el-button--primary')
      .should('be.enabled');

    cy.get('form button.el-button--primary')
      .click();
    cy.get('h1')
      .contains('Providers');
  });

  it('remove Supplier', () => {
    cy.visit('/admin_suppliers');

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
      .click();

    cy.get('div.el-dialog__wrapper')
      .should('not.be.visible');

    cy.get('table tr.el-table__row')
      .should('have.length', 2);
      
    cy.get('table tr.el-table__row')
      .eq(0)
      .contains('supplier 2');
    
    cy.get('table tr.el-table__row')
      .eq(1)
      .contains('supplier 3');
  });
});


