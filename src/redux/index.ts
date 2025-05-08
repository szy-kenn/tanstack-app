import rootReducer from '@/reducer';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Redux Persist configuration
const persistConfig = {
  key: 'root', // the key for the persist state in storage
  storage, // the storage engine to use (localStorage in this case)
  whitelist: ['auth'],
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
const store = createStore(persistedReducer);

// Create a persistor, which will be used to persist and rehydrate the store
const persistor = persistStore(store);

export { store, persistor };
