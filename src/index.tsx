import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './App';
import '@zendeskgarden/css-bedrock';
import ErrorBoundary from './components/ErrorBoundary'; // Adds base Zendesk style to the compiled CSS

const mountNode = document.getElementById('app');
ReactDOM.render(<ErrorBoundary><App/></ErrorBoundary>, mountNode);
