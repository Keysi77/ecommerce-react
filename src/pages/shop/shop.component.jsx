import React from 'react';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class Shop extends React.Component {
	state = {
		loading: true
	}
	// tu sa getnu data z firestore a nastavia do reduxu
	unsubscribe = null;

	componentDidMount() {
		const { updateCollections } = this.props
		// GET: tabulka 'collections'
		const collectionRef = firestore.collection('collections');
		collectionRef.onSnapshot(async snapshot => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
			updateCollections(collectionsMap)
			this.setState({ loading: false })
		})
	}
	

	render() {
		const { loading } = this.state
		const { match } = this.props
		return (
			<div className="shop-page">
				<Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />
				<Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />

				{/* <Route exact path={`${match.path}`} component={CollectionOverview} />
				<Route exact path={`${match.path}/:collectionId`} component={CollectionPage} /> */}
			</div>
		);
	}
};

const mapDispatchToProps = (dispatch) => ({
	updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(Shop);
