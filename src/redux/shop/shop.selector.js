import { createSelector } from 'reselect'

const selectShop = state => state.shop

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

// na zaklade :categoryId vyrenderuje na pagu dane data
export const selectCollections = collectionUrlParam => 
    createSelector(
        [selectShopCollections],
        // najde kolekciu podla ID a tu pomocou routra vyrenderuje
        collections => collections ? collections[collectionUrlParam] : null
    )

// selector konvert objektu do pola
export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    // zoberie svetky keys z objektu a transformuje ich na array
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)