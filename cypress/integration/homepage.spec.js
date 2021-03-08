/// <reference types="cypress" />
import { title, base, themeConfig } from '../../src/.vuepress/config';

describe('Homepage', () => {
    it('renders at root level', () => {
        cy.visit(base);
        cy.location('pathname').should('eq', base);
    });

    it('has the logo and title', () => {
        cy.get('.navbar-brand').as('logo');
        cy.get('@logo').should('have.attr', 'href', base);
        cy.get('@logo').find('img').should('have.attr', 'src', themeConfig.logo);
        cy.get('@logo').contains(title);
    });

    it('has the primary navigation items', () => {
        cy.get('ul.navbar-nav[role="menu"] > li').as('menu');
        cy.get('@menu').should('have.length', themeConfig.nav.length);
        cy.get('@menu').each((item, index) => {
            cy.get(item).contains(themeConfig.nav[index].text);
        });
    });

    it('has the search box', () => {
        cy.get('.search-box').should('exist');
    });

    it('has header carousel images', () => {
        themeConfig.carouselImages.forEach((image) => {
            cy.get(`.Header__Carousel__Item[data-image="${image}"]`)
                .should('have.css', 'background-image')
                .and('match', new RegExp(image));
        });
    });

    xit('has number of configured posts', () => {
        cy.get('article').should('have.length', themeConfig.globalPagination.lengthPerPage);
    });

    xit('has pagination for posts', () => {
        cy.get('.pagination').find('a').contains('Next').click({ force: true });
        cy.location('pathname').should('eq', `${base}page/2/`);
        cy.get('.pagination').find('a').contains('Prev').click({ force: true });
        cy.location('pathname').should('eq', base);
    });

    it('has footer links', () => {
        themeConfig.footer.copyright.forEach((item) => {
            cy.get(`.Footer__Nav__Item a:contains("${item.text}")`).should('have.attr', 'href', item.link);
        });

        themeConfig.footer.links.forEach((item) => {
            cy.get(`.Footer__Nav__Item a[title="${item.text}"]`).should('have.attr', 'href', item.link);
        });
    });
});
