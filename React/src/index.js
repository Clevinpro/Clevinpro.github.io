import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App';
import HotelCards from './components/HotelCards';
import NotesApp from './components/NotesApp';
import Calculator from './components/Calculator';
import configureStore from './store/configureStore';

injectTapEventPlugin();

const store = configureStore();

const Apps = withRouter(App);
 
render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={Apps}>
                    <IndexRoute component={HotelCards} />
                    <Route path="/HotelCards" component={HotelCards} />
                    <Route path="/NotesApp" component={NotesApp} />
                    <Route path="/Calculator" component={Calculator} />
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>,
  document.getElementById('root')
);