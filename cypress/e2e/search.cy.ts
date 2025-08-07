describe('Book Search E2E Test', () => {

  beforeEach(() => {
    // 1. Відвідуємо головну сторінку перед кожним тестом.
    // Припускаємо, що ContainerComponent знаходиться на кореневому маршруті '/'.
    cy.visit('/');
  });

  it('should filter the book list based on a search term', () => {
    const searchTerm = 'Gatsby';

    // 2. Знаходимо поле пошуку, вводимо текст.
    cy.get('[data-cy="search-input"]').type(searchTerm);

    // 3. Натискаємо кнопку пошуку.
    cy.get('[data-cy="search-button"]').click();

    // 4. Перевіряємо, що URL-адреса оновилася з параметром пошуку.
    cy.url().should('include', `search=${searchTerm}`);

    // 5. Перевіряємо результат у DOM:
    //    - Має бути лише одна книга.
    //    - Ця книга має містити назву "The Great Gatsby".
    cy.get('app-book-list').find('app-book').should('have.length', 1);
    cy.get('app-book-list').find('app-book').should('contain.text', 'The Great Gatsby');
  });

  it('should show no books for a term that does not match any title', () => {
    const searchTerm = 'NonExistentBook123';

    cy.get('[data-cy="search-input"]').type(searchTerm);
    cy.get('[data-cy="search-button"]').click();

    // Перевіряємо, що URL оновився.
    cy.url().should('include', `search=${searchTerm}`);

    // Перевіряємо, що жодного компонента <app-book> не відображено.
    cy.get('app-book-list').find('app-book').should('not.exist');
  });

  it('should show all books when the search term is cleared', () => {
    // Спочатку фільтруємо, щоб переконатися, що список неповний.
    cy.get('[data-cy="search-input"]').type('Gatsby');
    cy.get('[data-cy="search-button"]').click();
    cy.get('app-book-list').find('app-book').should('have.length', 1);

    // Тепер очищуємо поле пошуку і знову натискаємо кнопку.
    cy.get('[data-cy="search-input"]').clear();
    cy.get('[data-cy="search-button"]').click();

    // Перевіряємо, що параметр 'search' зник з URL.
    cy.url().should('not.include', 'search');

    // Перевіряємо, що відображаються всі 20 книг.
    cy.get('app-book-list').find('app-book').should('have.length', 20);
  });
});
