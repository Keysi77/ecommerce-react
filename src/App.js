import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// COMPONENTS
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component';
import Checkout from './pages/checkout/checkout.component';
// REDUX
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
// FIREBASE
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// CSS
import './App.css';

class App extends Component {
	// Netreba init state lebo je nastaveny v mapDispatchToProps - REDUX
	// state = {
	// 	currentUser: null
	// };
	unsubsribeFromAuth = null;

	componentDidMount() {
		// autentifikacia pouzivatela pomocou firebase auth
		// ! Observer Pattern - next(), error(), complete() v onAuthStateChanged(...)
		this.unsubsribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			// ? next() funkcia v observables
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);
				// * onSnapshot nieco podobne ako subscribe v angulari
				userRef.onSnapshot((snapShot) => {
					// pomocou snapshotu mozeme zavolat data(), ktore nam getnu data z DB
					// bez data by sme nedostali displayName, createdAt, email
					// id neexistuje v data() ale v snapShote samotnom
					// * Stary spoosb bez REDUX
					// this.setState(
					// 	{
					// 		currentUser: {
					// 			id: snapShot.id, // id
					// 			...snapShot.data() // displayName, email a createdAt
					// 		}
					// 	}
					// );
					// * Novy sposob s REDUX
					this.props.setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					});
				});
			} else {
				// this.setState({ currentUser: userAuth });
				this.props.setCurrentUser(userAuth);
				// * programaticky prida data zo suboru do databazy firestore - STACI LEN RAZ ZAVOLAT
				// addCollectionAndDocuments(
				// 	'collections',
				// 	// aby pridalo do firestoru len title a items - ostatne vygeneruje samo
				// 	this.props.collectionsArray.map(({ title, items }) => ({ title, items }))
				// );
			}
		},
		// ? error() - neni povinne
		error => console.log(error),
		// ? complete() neni povinna lebo mame unsubscrible v componentWillUnmount() - cize nikdy neskonci tento stream
		console.log('COMPLETED')
		);
	}

	componentWillUnmount() {
		// pri unmounte treba unsubscribnut lognuteho pouzivatela
		// aby nevznikali memory leaky
		this.unsubsribeFromAuth();
	}

	render() {
		return (
			<div>
				{/* uz netreba nastaovat currentUser prop, lebo je brany z reduxu */}
				{/* <Header currentUser={this.state.currentUser} /> */}
				<Header />
				<Switch>
					{/* ak najde zhodu na route nehlada uz dalej a vyrenderuje len komponent ktory patri danej route */}
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route exact path="/checkout" component={Checkout} />
					{/* ak som prihlaseny presmeruj na '/' inak vyrenderuj SignInSignUp komponent */}
					<Route
						exact
						path="/signin"
						render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInSignUp />)}
					/>
				</Switch>
			</div>
		);
	}
}

// zoberie prihlaseneho pouzivatela zo storu
// spristupni sa -> this.props.currentUser
const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state)
	// collectionsArray: selectCollectionsForPreview(state)
});

// Nastavi current Usera ktory sa prihlasi
// spristupni sa -> this.props.setCurrentUser
const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
