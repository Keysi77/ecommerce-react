import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// typ storagu kde chceme ukladat data zo storu - LOCAL STORAGE
import storageLocal from 'redux-persist/lib/storage';
// REDUCERS
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './direcotory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// config pre localstorage persist
const persistConfig = {
	key: 'root',
	storage: storageLocal,
	whitelist: [
		// vsetky reducere ktore chcem ulozit do localstorage
		// vacsinou tie ktore sa neukladaju do DB
		'cart'
	]
};

const rootReducer = combineReducers({
	// ! Vsetky reducere sa tu budu spajat
	user: userReducer,
	cart: cartReducer,
	directory: directoryReducer,
	shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
