import { SHOP_ACTION_TYPES } from './shop.types';

const INIT_STATE = {
    collections: null
}

const shopReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SHOP_ACTION_TYPES.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload 
            }
        default:
            return state;
    }
}


export default shopReducer;