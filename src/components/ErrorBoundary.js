import React, { Component } from 'react';
import { notify } from '../lib/Zendesk';

/**
 * The error boundary will catch errors that happen in the app.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Handle the error by updating the state and sending a Zendesk notification.
   *
   * @param error
   * @param errorInfo
   */
  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    notify(
        `Error in Sync Toolbox app: ${error.message}`,
        'error',
        true,
    );
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