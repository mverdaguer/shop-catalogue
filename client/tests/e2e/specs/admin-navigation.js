describe('Navigation within admin zone', () => {
  const createItCaseLinkNavigation = (itCase, index) => {
    it(itCase.title, () => {
      cy.get('div.main__page')
        .find('a.admin-link')
        .eq(index)
        .click();

      cy.get(`.main__page h1`)
        .contains(itCase.h1Title);
    });
  };  

  const checkHas3Links = () => {
    it('Has 3 links', () => {
      cy.get('div.main__page')
        .find('a.admin-link')
        .should('have.length', 3);
    });
  };

  describe('Items page links', () => {
    beforeEach(() => {
      cy.visit('/admin');
    });
    
    checkHas3Links();

    const links = [
      {title: 'Navigates to categories', h1Title: 'Categories'},
      {title: 'Navigates to suppliers', h1Title: 'Providers'},
      {title: 'Navigates to home images', h1Title: 'Home images'}
    ];

    links.forEach((itCase, index) => {
      createItCaseLinkNavigation(itCase, index);
    });
  });

  describe('Categories page links', () => {
    beforeEach(() => {
      cy.visit('/admin_categories');
    });
    
    checkHas3Links();

    const links = [
      {title: 'Navigates to items', h1Title: 'Products'},
      {title: 'Navigates to suppliers', h1Title: 'Providers'},
      {title: 'Navigates to home images', h1Title: 'Home images'}
    ];

    links.forEach((itCase, index) => {
      createItCaseLinkNavigation(itCase, index);
    });
  });

  describe('Suppliers page links', () => {
    beforeEach(() => {
      cy.visit('/admin_suppliers');
    });
    
    checkHas3Links();

    const links = [
      {title: 'Navigates to items', h1Title: 'Products'},
      {title: 'Navigates to categories', h1Title: 'Categories'},
      {title: 'Navigates to home images', h1Title: 'Home images'}
    ];

    links.forEach((itCase, index) => {
      createItCaseLinkNavigation(itCase, index);
    });
  });

  describe('Home images page links', () => {
    beforeEach(() => {
      cy.visit('/admin_home_images');
    });
    
    checkHas3Links();

    const links = [
      {title: 'Navigates to items', h1Title: 'Products'},
      {title: 'Navigates to suppliers', h1Title: 'Providers'},
      {title: 'Navigates to categories', h1Title: 'Categories'}
    ];

    links.forEach((itCase, index) => {
      createItCaseLinkNavigation(itCase, index);
    });
  });
});


