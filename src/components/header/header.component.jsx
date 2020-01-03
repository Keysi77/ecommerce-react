import React from 'react';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

// import './header.styles.scss'
import { HeaderContainer, OptionDiv, OptionLink, LogoContainer, OptionsContainer } from './header.styles';

const Header = ({ currentUser, hidden }) => {
	return (
		<HeaderContainer>
			<LogoContainer to="/">
				<Logo />
			</LogoContainer>
			<OptionsContainer>
				<OptionLink to="/shop">SHOP</OptionLink>
				<OptionLink to="/contact">CONTACT</OptionLink>
				{currentUser ? (
					<OptionDiv onClick={() => auth.signOut()}> SIGN OUT</OptionDiv>
				) : (
					<OptionLink to="/signin">SIGN IN</OptionLink>
				)}
				<CartIcon />
			</OptionsContainer>
			{hidden ? null : <CartDropdown />}
		</HeaderContainer>
	);
};

// ! Stary sposob bez SELECTOR-a
// state = rootReducer
// const mapStateToProps = ({ user: { currentUser }, cart: {hidden} }) => ({
//     // ! state.user (rootReducer) .currentUser (userReducer)
//     currentUser,
//     hidden
// });

// ! Novy sposob so SELECTOR-om
// * bez createStructuredSelector
// const mapStateToProps = (state) => ({
//     currentUser: selectCurrentUser(state),
//     hidden: selectCartHidden(state)
// });

// * s createStructuredSelector
// createStructuredSelector automaticky posle state - vyhodne ked sa pouziva viac selectorov
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
