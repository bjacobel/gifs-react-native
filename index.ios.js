import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './src/reducers';
import Main from './src/components/Main';

const middlewares = [
  applyMiddleware(thunk)
];

if (true) {  // @TODO: Production-ize this
  middlewares.push(devTools());
}

const composedCreateStore = compose.apply(this, middlewares)(createStore);

const store = composedCreateStore(reducer);

class GifsRN extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Main />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GifsRN', () => GifsRN);
