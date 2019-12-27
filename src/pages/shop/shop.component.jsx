import React from 'react';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';

const Shop = ({ match }) => {
	return (
		<div className="shop-page">
			<Route exact path={`${match.path}`} component={CollectionOverview} />
			<Route exact path={`${match.path}/:collectionId`} component={CollectionPage} />
		</div>
	);
};

export default Shop;
