describe('Admin items page', () => {
  const navigateToCreateItem = () => {
    cy.get('div.el-row button.el-button--primary')
      .click();
    cy.get('h1')
      .contains('Create Product');
  };

  const checkTableRow = (index, value, category) => {
    cy.get('table tr.el-table__row')
      .eq(index)
      .contains(value);
    
    cy.get('table tr.el-table__row')
      .eq(index)
      .contains(category);
  };

  const filterByName = (name) => {
    cy.get('div.el-row input')
      .eq(0)
      .clear()
      .type(name);
  }

  const selectSupplier = (index) => {
    cy.get('div.el-row input')
      .eq(1)
      .click();

    cy.get('div.el-select-dropdown div.el-scrollbar')
      .eq(1)
      .find('li')
      .eq(index)
      .click();
  }

  const selectCategory = (index) => {
    cy.get('div.el-row input')
      .eq(2)
      .click();

    cy.get('div.el-select-dropdown div.el-scrollbar')
      .eq(1)
      .find('li')
      .eq(index)
      .click();
  }

  it('List all Items', () => {
    cy.visit('/admin');

    selectSupplier(0);
    selectCategory(0);

    cy.get('table tr.el-table__row')
      .should('have.length', 18);
   
  });

  it('Filter items by name', () => {
    cy.visit('/admin');

    selectSupplier(0);
    selectCategory(0);

    cy.get('table tr.el-table__row')
      .should('have.length', 18);
   
    filterByName('lentils');
    cy.get('table tr.el-table__row')
      .should('have.length', 1);
    
    checkTableRow(0, 'lentils', 'legumes');

    filterByName('as');
    cy.get('table tr.el-table__row')
      .should('have.length', 3);
    
    checkTableRow(0, 'chickpeas', 'legumes');
    checkTableRow(1, 'peas', 'legumes');
    checkTableRow(2, 'asparagus', 'vegetables');
  });

  it('Filter items by category', () => {
    cy.visit('/admin');

    selectSupplier(0);
    selectCategory(0);

    cy.get('table tr.el-table__row')
      .should('have.length', 18);

    selectCategory(3);
    cy.get('table tr.el-table__row')
      .should('have.length', 4);
    
    checkTableRow(0, 'grapefruit', 'fruit');
    checkTableRow(1, 'strawberry', 'fruit');
    checkTableRow(2, 'watermelon', 'fruit');
    checkTableRow(3, 'papaya', 'fruit');

    selectCategory(6);
    cy.get('table tr.el-table__row')
      .should('have.length', 5);
    
    checkTableRow(0, 'kidney beans', 'beans');
    checkTableRow(1, 'black beans', 'beans');
    checkTableRow(2, 'soybeans', 'beans');
    checkTableRow(3, 'pinto beans', 'beans');
    checkTableRow(4, 'navy beans', 'beans');
  });
  
  it('Create Item', () => {
    cy.visit('/admin');

    navigateToCreateItem();
    cy.get('form button.el-button--default')
      .click();
    cy.get('h1')
      .contains('Products');

      navigateToCreateItem();
    cy.get('form button.el-button--primary')
      .should('be.disabled');

    cy.get('form input')
      .eq(0)
      .type('new-item');
  
    const fileName = 'test.jpg';
    cy.fixture(fileName).then(fileContent => {
      cy.get('form input')
        .eq(1)
        .upload(
          { fileContent, fileName, mimeType: 'image/jpg' },
          { subjectType: 'input' }
      );
    });

    cy.get('form button.el-button--primary')
      .should('be.enabled');

    cy.get('form button.el-button--primary')
      .click();
    cy.get('h1')
      .contains('Products');
  });
  
  it('Edit Item', () => {
    cy.visit('/admin');

    cy.get('table tr.el-table__row')
      .eq(3)
      .find('button.el-button--default')
      .click();

    cy.get('h1')
      .contains('Update Product');
    cy.get('form input')
      .eq(0)
      .should('have.value', 'kidney beans');
    cy.get('form input')
      .eq(2)
      .should('have.value', 'carbohydrates - legumes - beans');
    cy.get('form')
      .find('img')
      .should('have.attr', 'src')
      .should('include', '4.jpg');

    cy.get('form input')
      .eq(0)
      .type('kidney beans edit');
    cy.get('form button.el-button--primary')
      .should('be.enabled');

    cy.get('form button.el-button--primary')
      .click();
    cy.get('h1')
      .contains('Products');
  });
  
  it('Remove Item', () => {
    cy.visit('/admin');

    selectSupplier(0);
    selectCategory(0);

    cy.get('div.el-dialog__wrapper')
      .should('not.be.visible');

    checkTableRow(0, 'lentils', 'legumes');

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
      .should('have.length', 17);
    
    checkTableRow(0, 'chickpeas', 'legumes');
  });
});
