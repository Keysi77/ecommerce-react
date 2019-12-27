import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSign, inverted, ...otherProps }) => {
	// children - nazov v buttonu
	// otherProps - props type, name, value....
	return (
		<button
			className={`
                ${inverted ? 'inverted' : ''} 
                ${isGoogleSign ? 'google-sign-in' : ''} custom-button`}
                {...otherProps}
		    >
			{children}
		</button>
	);
};

export default CustomButton;
