import constructorReducer, {
  addItem,
  removeItem,
  moveItemUp
} from './constructorSlice';
import { describe, test, expect } from '@jest/globals';

const initialState = {
  loading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0
};

describe('Тестирование constructorSlice reducer', () => {
  test('Добавление ингредиентов', () => {
    const updated = constructorReducer(initialState, addItem(mockIngredient));
    expect(updated.constructorItems.ingredients).toHaveLength(1);
    expect(updated.constructorItems.ingredients[0]).toMatchObject(
      mockIngredient
    );
  });

  test('Удаление ингредиентов', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [{ ...mockIngredient, id: 'to-remove' }]
      }
    };

    const updated = constructorReducer(
      stateWithIngredient,
      removeItem('to-remove')
    );
    expect(updated.constructorItems.ingredients).toEqual([]);
  });

  test('Изменение порядка ингредиентов', () => {
    const ingredientA = { ...mockIngredient, id: 'a' };
    const ingredientB = { ...mockIngredient, id: 'b', name: 'Другой соус' };

    const state = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredientA, ingredientB]
      }
    };

    const updated = constructorReducer(state, moveItemUp(1));
    expect(updated.constructorItems.ingredients).toEqual([
      ingredientB,
      ingredientA
    ]);
  });
});
