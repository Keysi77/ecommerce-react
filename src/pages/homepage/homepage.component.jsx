import React from 'react';
import Directory from '../../components/directory/directory.component';

// ! styly sa pouzivaju uz z JSX suborov pomocou styled component libky
// import './homepage.styles.scss';
import { HomePageContainer } from './homepage.styles';

const HomePage = () => {
	return (
		// * Novy sposob cez styly v JSX
		<HomePageContainer>
			<Directory />
		</HomePageContainer>

		// * Stary sposob cez kalsicke styly
		// <div className='homapage'>
		//    <Directory />
		// </div>
	);
};

export default HomePage;
