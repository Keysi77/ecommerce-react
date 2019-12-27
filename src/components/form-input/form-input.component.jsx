import React from 'react';
import './form-input.styles.scss';

// ! Dynamicky form pre SignIn a SignUp
const FormInput = ({ handleChange, label, ...otherProps }) => {
	return (
		<div className="group">
			{label ? (
				// prida classu shrink ak pouzivat nieco napise
				<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
			) : null}
			<input
				className="form-input"
				onChange={handleChange}
				{...otherProps} // name, type, value ... z signIn componentu
			/>
		</div>
	);
};

export default FormInput;
