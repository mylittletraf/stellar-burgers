import store, { rootReducer } from './store';

test('Тестирование инициализации rootReducer', () => {
  const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

  const storeState = store.getState();

  expect(initialState).toEqual(storeState);
});
