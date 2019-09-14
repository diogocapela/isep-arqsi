import { combineReducers } from 'redux';

import auth from './redux-auth';
import machineTypes from './redux-machine-types';
import machines from './redux-machines';
import manufacturingPlans from './redux-manufacturing-plans';
import operations from './redux-operations';
import orders from './redux-orders';
import permissions from './redux-permissions';
import productionLines from './redux-production-lines';
import products from './redux-products';
import tools from './redux-tools';
import users from './redux-users';

export default combineReducers({
  auth,
  machineTypes,
  machines,
  manufacturingPlans,
  operations,
  orders,
  permissions,
  productionLines,
  products,
  tools,
  users,
});
