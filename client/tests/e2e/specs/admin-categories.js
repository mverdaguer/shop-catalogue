describe('Admin categories page', () => {
  const navigateToCreateCategory = () => {
    cy.get('div.el-row button.el-button--primary')
      .click();
    cy.get('h1')
      .contains('Create Category');
  };

  const checkTableRow = (index, value, parentCategory) => {
    cy.get('table tr.el-table__row')
      .eq(index)
      .contains(value);
    
    if (parentCategory) {
      cy.get('table tr.el-table__row')
        .eq(index)
        .contains(parentCategory);
    }
  };

  it('List Categories', () => {
    cy.visit('/admin_categories');

    cy.get('table tr.el-table__row')
      .should('have.length', 6);

    checkTableRow(0, 'carbohydrates');
    checkTableRow(1, 'vegetables');
    checkTableRow(2, 'fruit');
    checkTableRow(3, 'grains', 'carbohydrates');
    checkTableRow(4, 'legumes', 'carbohydrates');
    checkTableRow(5, 'beans', 'carbohydrates - legumes');
  });
  
  it('Create Category', () => {
    cy.visit('/admin_categories');

    navigateToCreateCategory();
    cy.get('form button.el-button--default')
      .click();
    cy.get('h1')
      .contains('Categories');

      navigateToCreateCategory();
    cy.get('form button.el-button--primary')
      .should('be.disabled');

    cy.get('form input')
      .eq(0)
      .type('new-category');
    cy.get('form button.el-button--primary')
      .should('be.enabled');

    cy.get('form button.el-button--primary')
      .click();
    cy.get('h1')
      .contains('Categories');
  });

  it('Edit Category', () => {
    cy.visit('/admin_categories');

    cy.get('table tr.el-table__row')
      .eq(3)
      .find('button.el-button--default')
      .click();

    cy.get('h1')
      .contains('Update Category');
    cy.get('form input')
      .eq(0)
      .should('have.value', 'grains');
    cy.get('form input')
      .eq(1)
      .should('have.value', 'carbohydrates');

    cy.get('form input')
      .eq(0)
      .type('grains edit');
    cy.get('form button.el-button--primary')
      .should('be.enabled');

    cy.get('form button.el-button--primary')
      .click();
    cy.get('h1')
      .contains('Categories');
  });

  it('Remove Category', () => {
    cy.visit('/admin_categories');

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
      .should('have.length', 5);

    checkTableRow(0, 'vegetables');
    checkTableRow(1, 'fruit');
    checkTableRow(2, 'grains', 'carbohydrates');
    checkTableRow(3, 'legumes', 'carbohydrates');
    checkTableRow(4, 'beans', 'carbohydrates - legumes');
  });
});
