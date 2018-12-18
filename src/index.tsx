import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Register icons and pull the fonts from the default SharePoint CDN:
initializeIcons();

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
