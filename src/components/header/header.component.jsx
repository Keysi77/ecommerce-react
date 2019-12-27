import React from 'react';
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { createStructuredSelector } from 'reselect'

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux'

import './header.styles.scss'

const Header = ({ currentUser, hidden }) => {
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo"/>
            </Link>
            <div className="options">
                <Link className="option" to="/shop">SHOP</Link>
                <Link className="option" to="/contact">CONTACT</Link>
                {
                    currentUser ? (
                        <div className="option" onClick={() => auth.signOut()}> SIGN OUT</div>
                    ) : (
                        <Link className="option" to="/signin">SIGN IN</Link>
                    )
                }
                <CartIcon />
            </div>
            {hidden ? null : (
                <CartDropdown />
            )}
        </div>
    );
}

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
