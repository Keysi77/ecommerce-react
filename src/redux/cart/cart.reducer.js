import { CART_ACTION_TYPES } from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

// cart component bude hidnuty a az ked sa klikne na shopping car tak vyskoci dropdown menu
const INIT_STATE = {
	hidden: true,
	cartItems: []
};

const cartReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case CART_ACTION_TYPES.TOGGLE_CART_HIDDEN:
			return {
				...state,
				hidden: !state.hidden
			};
		// INSERT
		case CART_ACTION_TYPES.ADD_ITEM:
			return {
				...state,
				// vsetky pridane stare + vzdy novy item - naplna pole klikami
				// cartItems: [...state.cartItems, action.payload]
				cartItems: addItemToCart(state.cartItems, action.payload)
			};
		// DELETE
		case CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART:
			return {
				...state,
                // vyfiltruje / zmaze ten item na ktory klikneme
                // keep item ktore sa nerovnaju ID ktore nemazem
				cartItems: state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id)
			};
		// DELETE ITEM
		case CART_ACTION_TYPES.REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, action.payload)
			};
		default:
			return state;
	}
};

export default cartReducer;
