import React from 'react';
import { SpinnerContainer, SpinnerOverlay} from './with-spiner.styles'

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        // ak sa nacitava vrati tento SPINNER
        <SpinnerContainer>
            <SpinnerOverlay />
        </SpinnerContainer>
    ) : (
        // Ak sa nenacitava tak vrati komponent ktory je v nom wrappnuty + jeho propsy
        <WrappedComponent {...otherProps} />
    )
}

export default WithSpinner;
