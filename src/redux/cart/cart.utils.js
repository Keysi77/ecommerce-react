// carItems = state.cartItems = stare itemy
// cartItemToAdd = action.payload = novu jeden pridany
export const addItemToCart = (cartItems, cartItemToAdd) => {
    // najde tie co sa rovnaju aby ich n-krat nepridalo do pola ale len raz s tym ze sa zvysi quantity
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToAdd.id);

    // ak takyto najde tak sa ho premapuje a zvysi sa mu quantita o 1 pri kazdom kliknuti na ADD button
    if (existingCartItem) {
        return cartItems.map(
            (cartItem) =>
            cartItem.id === cartItemToAdd.id ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
            } : cartItem
        );
    }

    return [...cartItems, {
        ...cartItemToAdd,
        quantity: 1
    }];
};

// znizi quantity pri sipke dolava a ak je 1 item uz tak ho zmaze
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    // ak ma najdeny item qunatity 1 tak zmaze item
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    // znizi quantitu o - 1
    return cartItems.map(cartItem => 
        cartItem.id === cartItemToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
}