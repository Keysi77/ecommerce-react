import { createStore, applyMiddleware } from 'redux';
// logger pre debugovanie middlewaru
import logger from 'redux-logger';

import rootReducer from './root-reducer';
// bude cachovat store
import { persistStore } from 'redux-persist';

const middlewares = [ logger ];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

export default { store, persistor };
