// https://docs.cypress.io/api/introduction/api.html

describe('Main route navigation and dynamic menu', () => {
  const checkMenu = (selectedElementsCount, text) => {
    cy.get('div.desktop-header')
      .find('div.desktop-header__item')
      .should('have.length', 6);

    cy.get('div.desktop-header')
      .find('div.desktop-header__item--current')
      .should('have.length', selectedElementsCount);

    if (text) {
      cy.get('div.desktop-header__item--current')
        .contains(text);
    }
  };

  it('Visits the home page', () => {
    cy.visit('/');
    cy.get('.main-page h1')
      .should('exist');

    checkMenu(0);
  });

  it('Visits the contact page', () => {
    cy.visit('/contact');
    cy.get('.contact-page h1')
      .should('exist');

    checkMenu(1), 'Contact';
  });

  it('Visits the admin (item) page', () => {
    cy.visit('/admin');
    cy.get('.main__page h1')
      .contains('Products');

    checkMenu(1), 'Admin';
  });

  it('Visits the admin (category) page', () => {
    cy.visit('/admin_categories');
    cy.get('.main__page h1')
      .contains('Categories');

    checkMenu(1), 'Admin';
  });

  it('Visits the admin (suppliers) page', () => {
    cy.visit('/admin_suppliers');
    cy.get('.main__page h1')
      .contains('Providers');

    checkMenu(1), 'Admin';
  });

  it('Visits the admin (Home images) page', () => {
    cy.visit('/admin_home_images');
    cy.get('.main__page h1')
      .contains('Home images');

    checkMenu(1), 'Admin';
  });

  describe('Product pages navigation', () => {
    it('Vegetables page', () => {
      cy.visit('/products/vegetables');
      cy.get('.items-list-page h1')
        .contains('vegetables');

      checkMenu(1), 'vegetables';
    });

    it('Fruit page', () => {
      cy.visit('/products/fruit');
      cy.get('.items-list-page h1')
        .contains('fruit');

      checkMenu(1), 'fruit';
    });

    it('Carbohydrates page', () => {
      cy.visit('/products/carbohydrates');
      cy.get('.items-list-page h1')
        .contains('carbohydrates');

      checkMenu(1), 'carbohydrates';
    });

    it('Grains page', () => {
      cy.visit('/products/grains');
      cy.get('.items-list-page h1')
        .contains('grains');

      checkMenu(1), 'carbohydrates';
    });

    it('Legumes page', () => {
      cy.visit('/products/legumes');
      cy.get('.items-list-page h1')
        .contains('legumes');

      checkMenu(1), 'carbohydrates';
    });

    it('Beans page', () => {
      cy.visit('/products/beans');
      cy.get('.items-list-page h1')
        .contains('beans');

      checkMenu(1), 'carbohydrates';
    });
  });
});
