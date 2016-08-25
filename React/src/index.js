import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/App';
import configureStore from './store/configureStore'

import injectTapEventPlugin from 'react-tap-event-plugin';



injectTapEventPlugin();
const store = configureStore();
const Body = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);
 
render(
  <Provider store={store}>
    
      <Body />
    
  </Provider>,
  document.getElementById('root')
)