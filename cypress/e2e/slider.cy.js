describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });
});

describe('Swiper Gallery Test', function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
});

describe('3.1 next and previous test', function () {
  it('Checks if the navigation buttons work', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-slide-active').should('contain', 'Rome');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'London');
    cy.get('.swiper-button-prev').click();
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Rome');
  });
});

describe('3.2 next and previous test', function () {
  it('Checks if the navigation buttons work', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-slide-active').should('contain', 'Rome').should('be.visible');
    cy.get('.swiper-slide-active').should('contain', 'Italy').should('be.visible');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'London').should('be.visible');
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom').should('be.visible');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris').should('be.visible');
    cy.get('.swiper-slide-active').should('contain', 'France').should('be.visible');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Rome').should('be.visible');
    cy.get('.swiper-slide-active').should('contain', 'Italy').should('be.visible');
  });
});



describe('3.3 Test gallery responsivness', () => {
  const viewports = [
      'macbook-15',
      'ipad-2',
      'iphone-x'
  ];

  const galleryWidths = [];

  beforeEach(() => {
      cy.visit('http://localhost:3000');
  });

  viewports.forEach((viewport) => {
      context(`Testing viewport: ${viewport}`, () => {
          beforeEach(() => {
              cy.viewport(viewport);
          });

          it('Gallery should be visible', () => {
              cy.get('.swiper-wrapper').should('be.visible');
              cy.get('.swiper-slide').should('have.length.at.least', 1);
              
              cy.get('.swiper-wrapper').then(($gallery) => {
                galleryWidths.push($gallery.width());
            });
          });

          it('Navigation button visible', () => {
              cy.get('.swiper-button-next').should('be.visible');
              cy.get('.swiper-button-prev').should('be.visible');
          });       
      });
  });
  it('Gallery size should adapt to the viewport', () => {
    cy.wrap(null).then(() => {
        for (let i = 1; i < galleryWidths.length; i++) {
            expect(galleryWidths[i]).to.not.equal(galleryWidths[i - 1]);
        }
    });
});

});


describe('3.4 Test if the gallery is displayed correctly', () => {
  it('Gallery should be displayed correctly', () => {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-wrapper').should('be.visible');
    cy.get('.swiper-slide').should('have.length', 3);
    cy.get('.swiper-slide-active').should('have.length', 1).should('contain', 'Rome').should('contain','Italy').should('be.visible');
    
    cy.get('.swiper-button-next').should('be.visible').click();
    cy.wait(2000);
    
    cy.get('.swiper-slide-active').should('have.length', 1).should('contain', 'London').should('contain','United Kingdom').should('be.visible');
    
    cy.get('.swiper-button-next').should('be.visible').click();
    cy.wait(2000);
    
    cy.get('.swiper-slide-active').should('have.length', 1).should('contain', 'Paris').should('contain','France').should('be.visible');
    
    cy.get('.swiper-button-prev').click();
    cy.wait(2000);

    cy.get('.swiper-slide-active').should('have.length', 1).should('contain', 'London').should('contain','United Kingdom').should('be.visible');
  });
});