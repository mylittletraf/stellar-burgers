import userSlice, {
  getUser,
  registerUser,
  updateUser,
  loginUser,
  logoutUser,
  initialState
} from './userSlice';

describe('Тестирование userSlice reducer', () => {
  describe('Тестирование экшенов getUser', () => {
    const mockActions = {
      pending: {
        type: getUser.pending.type,
        payload: null
      },
      rejected: {
        type: getUser.rejected.type,
        payload: null
      },
      fulfilled: {
        type: getUser.fulfilled.type,
        payload: { user: { name: 'aaabbbccc', email: 'aaa@bbb.ccc' } }
      }
    };

    test('Тест экшена getUser.pending', () => {
      const state = userSlice(initialState, mockActions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(mockActions.pending.payload);
    });

    test('Тест экшена getUser.rejected', () => {
      const state = userSlice(initialState, mockActions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });

    test('Тест экшена getUser.fulfilled', () => {
      const state = userSlice(initialState, mockActions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.userData).toEqual(mockActions.fulfilled.payload.user);
      expect(state.error).toBeNull();
    });
  });
  describe('Тестирование экшенов registerUser', () => {
    const mockActions = {
      pending: {
        type: registerUser.pending.type,
        payload: null
      },
      rejected: {
        type: registerUser.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: registerUser.fulfilled.type,
        payload: { user: { name: 'aaabbbccc', email: 'aaa@bbb.ccc' } }
      }
    };

    test('Тест экшена registerUser.pending', () => {
      const state = userSlice(initialState, mockActions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(mockActions.pending.payload);
    });

    test('Тест экшена registerUser.rejected', () => {
      const state = userSlice(initialState, mockActions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('error');
    });

    test('Тест экшена registerUser.fulfilled', () => {
      const state = userSlice(initialState, mockActions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.response).toEqual(mockActions.fulfilled.payload.user);
      expect(state.userData).toEqual(mockActions.fulfilled.payload.user);
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBeNull();
    });
  });
  describe('Тестирование экшенов updateUser', () => {
    const mockActions = {
      pending: {
        type: updateUser.pending.type,
        payload: null
      },
      rejected: {
        type: updateUser.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'aaabbbccc', email: 'aaa@bbb.ccc' } }
      }
    };

    test('Тест экшена updateUser.pending', () => {
      const state = userSlice(initialState, mockActions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(mockActions.pending.payload);
    });

    test('Тест экшена updateUser.rejected', () => {
      const state = userSlice(initialState, mockActions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('error');
    });

    test('Тест экшена updateUser.fulfilled', () => {
      const state = userSlice(initialState, mockActions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.response).toEqual(mockActions.fulfilled.payload.user);
      expect(state.error).toBeNull();
    });
  });
  describe('Тестирование экшенов loginUser', () => {
    const mockActions = {
      pending: {
        type: loginUser.pending.type,
        payload: null
      },
      rejected: {
        type: loginUser.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: loginUser.fulfilled.type,
        payload: { user: { name: 'aaabbbccc', email: 'aaa@bbb.ccc' } }
      }
    };

    test('Тест экшена loginUser.pending', () => {
      const state = userSlice(initialState, mockActions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(mockActions.pending.payload);
    });

    test('Тест экшена loginUser.rejected', () => {
      const state = userSlice(initialState, mockActions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('error');
    });

    test('Тест экшена loginUser.fulfilled', () => {
      const state = userSlice(initialState, mockActions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.userData).toEqual(mockActions.fulfilled.payload.user);
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBe(null);
    });
  });
  describe('Тестирование экшенов logoutUser', () => {
    const mockActions = {
      pending: {
        type: logoutUser.pending.type,
        payload: null
      },
      rejected: {
        type: logoutUser.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: logoutUser.fulfilled.type,
        payload: { user: { name: 'aaabbbccc', email: 'aaa@bbb.ccc' } }
      }
    };

    test('Тест экшена logoutUser.pending', () => {
      const state = userSlice(initialState, mockActions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(mockActions.pending.payload);
    });

    test('Тест экшена logoutUser.rejected', () => {
      const state = userSlice(initialState, mockActions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe('error');
    });

    test('Тест экшена logoutUser.fulfilled', () => {
      const state = userSlice(initialState, mockActions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.userData).toBe(null);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe(null);
    });
  });
});
