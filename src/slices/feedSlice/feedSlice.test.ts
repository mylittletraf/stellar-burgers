import feedReducer, { getFeedOrders, initialState } from './feedSlice';

describe('Тестирование feedSlice reducer', () => {
  describe('Тестирование экшенов getFeedOrders', () => {
    const mockActions = {
      pending: {
        type: getFeedOrders.pending.type,
        payload: null
      },
      rejected: {
        type: getFeedOrders.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: getFeedOrders.fulfilled.type,
        payload: {
          orders: [
            {
              _id: '684c4b19c2f30c001cb2c55d',
              ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa093d'
              ],
              status: 'done',
              name: 'Флюоресцентный люминесцентный бургер',
              createdAt: '2025-06-13T16:00:25.874Z',
              updatedAt: '2025-06-13T16:00:26.618Z',
              number: 81321
            },
            {
              _id: '684c531ac2f30c001cb2c58a',
              ingredients: [
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa093c'
              ],
              status: 'done',
              name: 'Краторный spicy био-марсианский бургер',
              createdAt: '2025-06-13T16:34:34.333Z',
              updatedAt: '2025-06-13T16:34:35.050Z',
              number: 81326
            },
            {
              _id: '684c6612c2f30c001cb2c5ee',
              ingredients: [
                '643d69a5c3f7b9001cfa093c',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa0940',
                '643d69a5c3f7b9001cfa093c'
              ],
              status: 'done',
              name: 'Краторный био-марсианский люминесцентный метеоритный бургер',
              createdAt: '2025-06-13T17:55:30.199Z',
              updatedAt: '2025-06-13T17:55:30.943Z',
              number: 81330
            }
          ],
          total: 3
        }
      }
    };

    test('Тест экшена getFeedOrders.pending', () => {
      const state = feedReducer(initialState, mockActions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.feedData).toEqual(initialState.feedData);
    });

    test('Тест экшена getFeedOrders.rejected', () => {
      const state = feedReducer(initialState, mockActions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('error');
      expect(state.feedData).toEqual(initialState.feedData);
    });

    test('Тест экшена getFeedOrders.fulfilled', () => {
      const state = feedReducer(initialState, mockActions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.feedData.orders.length).toBe(3);
      expect(state.feedData.total).toBe(3);
    });
  });
});
