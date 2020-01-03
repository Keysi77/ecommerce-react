import { SHOP_ACTION_TYPES } from './shop.types';

export const updateCollections = (collectionsMap) => ({
	type: SHOP_ACTION_TYPES.UPDATE_COLLECTIONS,
	payload: collectionsMap
});
