import React from 'react';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => {
	return (
		<div className="cart-dropdown">
			<div className="cart-items">
                {
                    cartItems.length ? (
                    cartItems.map(carItem => 
                    <CartItem 
                        key={carItem.id}
                        item={carItem}
                    />)): (
                        <span className="empty-message">Your cart is empty</span>
                    )
                }
			</div>
			<CustomButton
                onClick={() => {
                    history.push('/checkout');
                    // hidne dropdown menu ked ideme na checkout
                    dispatch(toggleCartHidden())
                }}>
                GO TO CHECKOUT
                </CustomButton>
		</div>
	);
};

// ! stary sposob bez selectora
// const mapStateToProps = ({ cart: {cartItems} }) => ({
// 	cartItems
// });

// ! novy sposob so selectorom
const mapStateToProps = createStructuredSelector({
    // nebude tento mapStateToProps re-renderovany vzdy aj ked neni treba
    cartItems: selectCartItems
});

// ak neni mapDispatchToProps druhy parameter tak connect automaticky
// poskytne do propsov dispatch
// dispatch(nazovAkcie())
export default withRouter(connect(mapStateToProps)(CartDropdown));
