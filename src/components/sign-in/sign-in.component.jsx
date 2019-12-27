import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signWithGoogle, auth } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

export default class SignIn extends Component {
	state = {
		email: '',
		password: ''
	};
	handleSubmit = async (e) => {
        const { email, password } = this.state
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({
                email: '',
                password: ''
            });
        } catch (error) {
            console.log(error)
        }
	};

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({
			// dynamicka hodnota [name] moze prist aj password aj email atd...
			[name]: value
		});
	};
	render() {
		return (
			<div className="sign-in">
				<h1>Already have an account</h1>
				<span>sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						label="email"
						name="email"
						type="email"
						value={this.state.email}
						required
						handleChange={this.handleChange}
					/>
					<FormInput
						label="password"
						name="password"
						type="password"
						value={this.state.password}
						required
						handleChange={this.handleChange}
					/>
					<div className="buttons">
						<CustomButton type="submit">Sign In</CustomButton>
						{/* instancia signWithGoogle je v firebase.utils */}
						{/* isGoogleSign prop true tak pouzije iny css styl na button */}
						<CustomButton onClick={signWithGoogle} isGoogleSign>
							Sign In with Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}
