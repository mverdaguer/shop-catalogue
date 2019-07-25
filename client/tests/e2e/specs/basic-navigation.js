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

  const checkTitle = (cssSelector, title) => {
    cy.get(`${cssSelector} h1`)
        .contains(title);
  };

  const createItCase = itCase => {
    it(itCase.title, () => {
      cy.visit(itCase.route);

      checkMenu(1), itCase.menuTitle;
      checkTitle(itCase.cssClass, itCase.h1Title);
    });
  }

  it('Visits the home page', () => {
    cy.visit('/');

    checkMenu(0);
    checkTitle('.main-page', 'Shop');
  });

  const basicRoutesParams = [
    {title: 'Contact page', route: '/contact', menuTitle: 'Contact', cssClass: '.contact-page', h1Title: 'Contact'},
    {title: 'Admin (item) page', route: '/admin', menuTitle: 'Admin', cssClass: '.main__page', h1Title: 'Products'},
    {title: 'Admin (category) page', route: '/admin_categories', menuTitle: 'Admin', cssClass: '.main__page', h1Title: 'Categories'},
    {title: 'Admin (supplier) page', route: '/admin_suppliers', menuTitle: 'Admin', cssClass: '.main__page', h1Title: 'Providers'},
    {title: 'Admin (home images) page', route: '/admin_home_images', menuTitle: 'Admin', cssClass: '.main__page', h1Title: 'Home images'},
  ];

  basicRoutesParams.forEach(itCase => {
    createItCase(itCase);
  });

  describe('Product pages navigation', () => {
    const testParams = [
      {title: 'Vegetables page', route: '/products/vegetables', menuTitle: 'vegetables', cssClass: '.items-list-page', h1Title: 'vegetables'},
      {title: 'Fruit page', route: '/products/fruit', menuTitle: 'fruit', cssClass: '.items-list-page', h1Title: 'fruit'},
      {title: 'Carbohydrates page', route: '/products/carbohydrates', menuTitle: 'carbohydrates', cssClass: '.items-list-page', h1Title: 'carbohydrates'},
      {title: 'Grains page', route: '/products/grains', menuTitle: 'carbohydrates', cssClass: '.items-list-page', h1Title: 'grains'},
      {title: 'Legumes page', route: '/products/legumes', menuTitle: 'carbohydrates', cssClass: '.items-list-page', h1Title: 'legumes'},
      {title: 'Beans page', route: '/products/beans', menuTitle: 'carbohydrates', cssClass: '.items-list-page', h1Title: 'beans'},
    ];

    testParams.forEach(itCase => {
      createItCase(itCase);
    });
  });

  describe('Menu navigation', () => {
    it('Clicking the menu items you visit the selected page.', () => {
      cy.visit('/');
     
      cy.get('div.desktop-header__item')
        .eq(0) 
        .click();
      checkMenu(1), 'carbohydrates';
      checkTitle('.items-list-page', 'carbohydrates');

      // ---------------------
      // Carbohydrates subcategories.
      cy.get('div.desktop-header__item')
        .eq(0) 
        .trigger('mouseover');

      cy.get('div.desktop-header__item')
        .eq(0) 
        .get('ul > li > a')
        .eq(0)
        .click();
      checkMenu(1), 'carbohydrates';
      checkTitle('.items-list-page', 'grains');

      cy.get('div.desktop-header__item')
        .eq(0) 
        .get('ul > li > a')
        .eq(1)
        .click();
      checkMenu(1), 'carbohydrates';
      checkTitle('.items-list-page', 'legumes');

      cy.get('div.desktop-header__item')
        .eq(0) 
        .get('ul > li > a')
        .eq(2)
        .click();
      checkMenu(1), 'carbohydrates';
      checkTitle('.items-list-page', 'beans');
      // ---------------------

      cy.get('div.desktop-header__item')
        .eq(1) 
        .click();
      checkMenu(1), 'vegetables';
      checkTitle('.items-list-page', 'vegetables');
      
      cy.get('div.desktop-header__item')
        .eq(2) 
        .click();
      checkMenu(1), 'fruit';
      checkTitle('.items-list-page', 'fruit');
      
      cy.get('div.desktop-header__item')
        .eq(3) 
        .click();
      checkMenu(1), 'contact';
      checkTitle('.contact-page', 'Contact');
      
      cy.get('div.desktop-header__item')
        .eq(4) 
        .click();
      checkMenu(1), 'admin';
      checkTitle('.main__page', 'Products');
    });
  });
});
