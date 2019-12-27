import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
	return (
		<div className="cart-icon" onClick={toggleCartHidden}>
			<ShoppingIcon className="shopping-icon" />
			<span className="item-count">{itemCount}</span>
		</div>
	);
};

// spristupni sa -> this.props.toggleCartHidden
const mapDispatchToProps = (dispatch) => ({
    // nema payload len ju spusti
	toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = (state) => ({
	// ! STARY SPOSOB
	// zrata hodnoty quantiy v objekte a vysledna bude pocet itemov v kosiku
	// zrata hodnoty cartItem.quantity dokopy
	// * SELECTOR - zoberie cely objekt ale vrati len nejaku cast z neho
	// z objektu cartItems vratime len sucet quantity - jedno dynamicke cislo
	// itemCount: cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
	
	// ! NOVY SPOSOB
	// v selektore sa vyselektuje vsetko nepotrebne zo statu
	itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
