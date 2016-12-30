//Vendor
import angular from 'angular';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import ngRedux  from 'ng-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {combineReducers} from 'redux';

//Custom 
import reducers from './reducers';
import actions from './actions';
import middleware from './services';
import components  from './components';

const logger = createLogger();

export default angular.module('AngularTestApp',[
    'ui.router',
    'ui.bootstrap',
      ngRedux,
      components,
      actions,
      middleware
])
.config([
  '$ngReduxProvider',
  $ngReduxProvider => {
    const rootReducer = combineReducers(
      reducers
    );

    $ngReduxProvider.createStoreWith(rootReducer, [
      logger,
      thunkMiddleware
    ]);
  }
])
.name;