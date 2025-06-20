import orderSlice, {
  getOrderByNumber,
  getOrders,
  initialState
} from './ordersSlice';

describe('Тестирование orderSlice reducer', () => {
  describe('Тестирование экшенов getOrders', () => {
    const mockActions = {
      pending: {
        type: getOrders.pending.type,
        payload: null
      },
      rejected: {
        type: getOrders.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: getOrders.fulfilled.type,
        payload: [
          {
            success: true,
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
              }
            ],
            total: 81700,
            totalToday: 184
          }
        ]
      }
    };

    test('Тест экшена getOrders.pending', () => {
      const state = orderSlice(initialState, mockActions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Тест экшена getOrders.rejected', () => {
      const state = orderSlice(initialState, mockActions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('error');
    });

    test('Тест экшена getOrders.fulfilled', () => {
      const state = orderSlice(initialState, mockActions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockActions.fulfilled.payload);
      expect(state.error).toBeNull();
    });
  });

  describe('Тестирование экшенов getOrderByNumber', () => {
    const mockActions = {
      pending: {
        type: getOrderByNumber.pending.type,
        payload: null
      },
      rejected: {
        type: getOrderByNumber.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: getOrderByNumber.fulfilled.type,
        payload: {
          success: true,
          orders: [
            {
              _id: '68554a6d943eac001cc3aca9',
              ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa0940',
                '643d69a5c3f7b9001cfa093f',
                '643d69a5c3f7b9001cfa093d'
              ],
              owner: '684c458ac2f30c001cb2c54d',
              status: 'done',
              name: 'Метеоритный флюоресцентный люминесцентный бессмертный бургер',
              createdAt: '2025-06-20T11:47:57.706Z',
              updatedAt: '2025-06-20T11:47:58.501Z',
              number: 82061,
              __v: 0
            }
          ]
        }
      }
    };

    test('Тест экшена getOrderByNumber.pending', () => {
      const state = orderSlice(initialState, mockActions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Тест экшена getOrderByNumber.rejected', () => {
      const state = orderSlice(initialState, mockActions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('error');
    });

    test('Тест экшена getOrderByNumber.fulfilled', () => {
      const state = orderSlice(initialState, mockActions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.orderByNumber).toEqual(
        mockActions.fulfilled.payload.orders[0]
      );
      expect(state.error).toBeNull();
    });
  });
});
