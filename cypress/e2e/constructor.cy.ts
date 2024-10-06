const buns = '[data-cy=buns]';
const mains = '[data-cy=mains]';
const sauces = '[data-cy=sauces]';
const modal = '[data-cy=modal]';
const overlay = '[data-cy=overlay]';

describe('Тест конструктора', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.visit('/');
  });

  it('добавление булки в конструктор', function () {
    cy.get(buns).contains('Добавить').click();
    cy.get('.constructor-element_pos_top').contains('Краторная булка N-200i');
    cy.get('.constructor-element_pos_bottom').contains(
      'Краторная булка N-200i'
    );
  });

  it('добавление начинки в конструктор', function () {
    cy.get(mains).contains('Добавить').click();
    cy.get('.constructor-element').contains(
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('добавление соуса в конструктор', function () {
    cy.get(sauces).contains('Добавить').click();
    cy.get('.constructor-element').contains('Соус Spicy-X');
  });
});

describe('Тест модальных окон', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.visit('/');
  });

  it('открытие модалки', function () {
    cy.contains('Мини-салат Экзо-Плантаго').click();
    cy.get(modal).should('exist');
    cy.get(modal).contains('Мини-салат Экзо-Плантаго');
  });

  it('закрытие модалки по клику на крестик', function () {
    cy.contains('Мини-салат Экзо-Плантаго').click();
    cy.get(modal).find('button').click();
    cy.get(modal).should('not.exist');
  });

  it('закрытие модалки нажатием на Esc', function () {
    cy.contains('Мини-салат Экзо-Плантаго').click();
    cy.get('body').type('{esc}');
    cy.get(modal).should('not.exist');
  });

  it('закрытие модалки по клику на оверлей', function () {
    cy.contains('Мини-салат Экзо-Плантаго').click();
    cy.get(overlay).click({ force: true });
    cy.get(modal).should('not.exist');
  });
});

describe('Тест создания заказа', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
    cy.visit('/');
    cy.setCookie('accessToken', 'test-accessToken');
    window.localStorage.setItem('refreshToken', 'test-refreshToken');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('создание заказа', function () {
    cy.get(buns).contains('Добавить').click();
    cy.get(mains).contains('Добавить').click();
    cy.get(sauces).contains('Добавить').click();

    cy.contains('Оформить заказ').click();
    cy.get(modal).should('exist');
    cy.get(modal).contains('46277');
    cy.get(overlay).click({ force: true });
    cy.get(modal).should('not.exist');

    cy.get('.text_type_main-default').contains('Выберите булки');
    cy.get('.text_type_main-default').contains('Выберите начинку');
  });
});
