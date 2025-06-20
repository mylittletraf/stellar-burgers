import Cypress from 'cypress';

const API_URL = 'https://norma.nomoreparties.space/api';

const SELECTORS = {
  ingredient: (id: string) => `[data-cy=${id}]`,
  overlay: '[data-cy=overlay]',
  orderButton: '[data-cy=order-button]',
  constructor: '[data-cy=burger-constructor]'
};

const IDS = {
  stuffing: '643d69a5c3f7b9001cfa0949',
  bun: '643d69a5c3f7b9001cfa093c'
};

const ORDER_NUMBER = '82061';

const addIngredient = (id: string) => {
  cy.get(SELECTORS.ingredient(id)).children('button').click();
};

beforeEach(() => {
  cy.intercept('GET', `${API_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });

  cy.intercept('POST', `${API_URL}/auth/login`, {
    fixture: 'user.json'
  });

  cy.intercept('GET', `${API_URL}/auth/user`, {
    fixture: 'user.json'
  });

  cy.intercept('POST', `${API_URL}/orders`, {
    fixture: 'order.json'
  });

  cy.visit('http://localhost:4000/');
  cy.viewport(1920, 1080);
  cy.get('#modals').as('modal');
});

describe('Конструктор бургера', () => {
  it('добавляет булку и начинку в конструктор', () => {
    cy.get(SELECTORS.constructor)
      .find('.constructor-element')
      .should('not.exist');
    addIngredient(IDS.bun);
    addIngredient(IDS.stuffing);
    cy.get(SELECTORS.constructor)
      .find('.constructor-element')
      .should('have.length', 3);
  });
});

describe('Модальные окна ингредиентов', () => {
  it('открывает модалку при клике по ингредиенту', () => {
    cy.get('@modal').should('be.empty');
    cy.get(SELECTORS.ingredient(IDS.stuffing)).children('a').click();
    cy.get('@modal')
      .should('not.be.empty')
      .and('contain.text', 'Мини-салат Экзо-Плантаго');
  });

  it('закрывает модалку по кнопке закрытия', () => {
    cy.get(SELECTORS.ingredient(IDS.stuffing)).children('a').click();
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
  });

  it('закрывает модалку по клику на оверлей', () => {
    cy.get(SELECTORS.ingredient(IDS.stuffing)).children('a').click();
    cy.get(SELECTORS.overlay)
      .invoke('css', 'position', 'absolute')
      .click(1000, 20);
    cy.get('@modal').should('be.empty');
  });
});

describe('Оформление заказа', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'refresh-token');
    cy.setCookie('accessToken', 'access-token');
  });

  it('создаёт заказ и отображает номер', () => {
    addIngredient(IDS.bun);
    addIngredient(IDS.stuffing);
    cy.get(SELECTORS.orderButton).click();
    cy.get('@modal').find('h2').should('contain', ORDER_NUMBER);
    cy.get(SELECTORS.overlay)
      .invoke('css', 'position', 'absolute')
      .click(1000, 20);
    cy.get('@modal').should('be.empty');
    cy.get(SELECTORS.constructor)
      .find('.constructor-element')
      .should('have.length', 0);
  });
});
