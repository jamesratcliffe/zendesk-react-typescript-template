import * as React from 'react';

interface ErrorBoundaryState {
    hasError: boolean,
}


/**
 * The error boundary will catch errors that happen in the app.
 */
class ErrorBoundary extends React.Component {
    state: ErrorBoundaryState = {
        hasError: false,
    }

    /**
     * Handle the error by updating the state and sending a Zendesk notification.
     */
    componentDidCatch() {
        this.setState({hasError: true});
    }

    render() {
        // This is what to render when there was an error
        if (this.state.hasError) {
            return <p>Couldn't load app.</p>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;