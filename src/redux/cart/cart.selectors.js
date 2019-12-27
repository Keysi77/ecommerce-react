import { createSelector } from 'reselect'

// SELECTORY - input a output selector
// https://daveceddia.com/redux-selectors/

// input seletor - zoberie cely state a vypluje len nejaku cast
// tu posle state
const selectCart = state => state.cart

// MEMOIZE selector
// nasledne skoci do selectCart ↑↑↑↑
export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
)

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

// skoci do selectCartItems ↑↑↑↑
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
        0
    )
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity * cartItem.price,
        0
    )
)