export const fillOut = (locator, inputTxt) => {
    cy.get(locator).should('be.empty')
    cy.get(locator).focus().type(inputTxt)
}

export const includeUrl = (subpage) => {
    cy.url().should('include', subpage)
}

export const containsClick = (locator, contents) => {
    cy.get(locator).contains(contents).should('be.visible').click();
}

export const statusCode = (alias, code) => {
    cy.wait(alias).its('response.statusCode').should('eq', code)
}
