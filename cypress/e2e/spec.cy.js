import { containsClick, fillOut, includeUrl, statusCode } from '../helper/goit'
let dataSet;
describe('GOIT - zadanie testowe', () => {
  beforeEach(() => {
    cy.fixture('goitData.json').then((data) => {
      dataSet = data
    });
    cy.viewport(1280, 1024)
  })
  it('Logs in', () => {
    cy.intercept('POST', dataSet.api.postHomework).as('postHomework')
    cy.intercept('GET', dataSet.api.resendBtn).as('homeworkProcess')
    cy.visit('/');
    cy.get('form').within(() => {
      fillOut('input[name="email"]', dataSet.credentials.login)
      fillOut('input[name="password"]', dataSet.credentials.password)
      cy.get('button[type="submit"]').should('be.visible').click();
    });
    includeUrl('homepage')
    containsClick('button', dataSet.text.button)
    includeUrl('textbook')
    containsClick('a[data-tour-step="homework"]', dataSet.text.tab)
    includeUrl('homework')
    statusCode('@homeworkProcess', 200)
    cy.get('[data-tour-step="homework-form"]').within(() => {
      // containsClick('button[type="submit"]', dataSet.text.sendAgain)
      cy.get('button[type="submit"]').contains(dataSet.text.sendAgain).should('not.be.disabled').click()
    })
    statusCode('@postHomework', 200)
  });
});
