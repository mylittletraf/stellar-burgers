import feedReducer, { getIngredients, initialState } from './ingredientsSlice';

describe('Тестирование ingredientsSlice reducer', () => {
  describe('Тестирование экшенов ingredientsSlice', () => {
    const mockActions = {
      pending: {
        type: getIngredients.pending.type,
        payload: null
      },
      rejected: {
        type: getIngredients.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: getIngredients.fulfilled.type,
        payload: [
          {
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png',
            __v: 0
          }
        ]
      }
    };

    test('Тест экшена getIngredients.pending', () => {
      const state = feedReducer(initialState, mockActions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Тест экшена getIngredients.rejected', () => {
      const state = feedReducer(initialState, mockActions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('error');
    });

    test('Тест экшена getIngredients.fulfilled', () => {
      const state = feedReducer(initialState, mockActions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.ingredients).toEqual(mockActions.fulfilled.payload);
    });
  });
});
