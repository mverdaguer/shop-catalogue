describe('Items page', () => {
  const checkItems = items => {
    cy.get('div.item-list__item')
      .should('have.length', items.length);

    items.forEach((item, index) => {
      cy.get('div.item-list__item')
        .eq(index)
        .contains(item);

      cy.get('div.item-list__item')
        .eq(index)
        .get('div.item-list__item__image')
        .should('have.css', 'background-image');
    });
  }

  it('Vegetables', () => {
    cy.visit('/products/vegetables');

    const vegetables = [
      'carrot',
      'broccoli',
      'asparagus'
    ];
    checkItems(vegetables);
  });

  it('Fruit', () => {
    cy.visit('/products/fruit');

    const fruit = [
      'grapefruit',
      'strawberry',
      'watermelon',
      'papaya'
    ];
    checkItems(fruit);
  });

  it('Carbohydrates', () => {
    cy.visit('/products/carbohydrates');
  
    const carbohydrates = [
      'brown rice',
      'freekeh',
      'lentils',
      'chickpeas',
      'peas',
      'peanuts',
      'kidney beans',
      'black beans',
      'soybeans',
      'pinto beans',
      'navy beans'
    ];
    checkItems(carbohydrates);

    cy.get('h2')
      .eq(0)
      .contains('grains');

    cy.get('h2')
      .eq(1)
      .contains('legumes');

    cy.get('h3')
      .contains('beans');
  });

  it('Grains', () => {
    cy.visit('/products/grains');
  
    const grains = [
      'brown rice',
      'freekeh'
    ];
    checkItems(grains);
  });
  
  it('Legumes', () => {
    cy.visit('/products/legumes');
  
    const legumes = [
      'lentils',
      'chickpeas',
      'peas',
      'peanuts',
      'kidney beans',
      'black beans',
      'soybeans',
      'pinto beans',
      'navy beans'
    ];
    checkItems(legumes);

    cy.get('h2')
      .contains('beans');
  });

  it('Beans', () => {
    cy.visit('/products/beans');
  
    const beans = [
      'kidney beans',
      'black beans',
      'soybeans',
      'pinto beans',
      'navy beans'
    ];
    checkItems(beans);
  });
});


