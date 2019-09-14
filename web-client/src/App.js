import React from 'react';
import { Provider } from 'react-redux';
import { Global } from '@emotion/core';
import { BrowserRouter, Route } from 'react-router-dom';

import configureStore from 'redux/configureStore';
import globalStyles from 'theme/styles';

import './App.css';

// General
import Home from 'pages/home';
import Profile from 'pages/profile';
import Settings from 'pages/settings';
import Users from 'pages/users';
import Permissions from 'pages/permissions';
import Privacy from 'pages/privacy';
// Auth
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
// Orders
import ListOrders from 'pages/orders/list-orders';
import EditOrder from 'pages/orders/edit-order';
// Factory
import ListMachineTypes from 'pages/factory/machine-types/list-machine-types';
import EditMachineType from 'pages/factory/machine-types/edit-machine-type';
import ListMachines from 'pages/factory/machines/list-machines';
import EditMachine from 'pages/factory/machines/edit-machine';
import ListOperations from 'pages/factory/operations/list-operations';
import EditOperation from 'pages/factory/operations/edit-operation';
import ListProductionLines from 'pages/factory/production-lines/list-production-lines';
import EditProductionLine from 'pages/factory/production-lines/edit-production-line';
import ListTools from 'pages/factory/tools/list-tools';
import EditTool from 'pages/factory/tools/edit-tool';
// Production
import ListManufacturingPlans from 'pages/production/manufacturing-plans/list-manufacturing-plans';
import EditManufacturingPlan from 'pages/production/manufacturing-plans/edit-manufacturing-plan';
import ListProducts from 'pages/production/products/list-products';
import EditProduct from 'pages/production/products/edit-product';
// Visualization
import FactoryVisualization from 'pages/visualization/factory-visualization';
import ProductionVisualization from 'pages/visualization/production-visualization';
// Production Planning
import ProductionPlanning from 'pages/production-planning';
// Helpers
import GlobalHelper from 'helpers/GlobalHelper';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Global styles={globalStyles} />
        {/* General */}
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/permissions" component={Permissions} />
        <Route exact path="/privacy" component={Privacy} />
        {/* Auth */}
        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/auth/login" component={Login} />
        {/* Orders */}
        <Route exact path="/orders" component={ListOrders} />
        <Route exact path="/orders/add" component={EditOrder} />
        <Route exact path="/orders/edit/:id" component={EditOrder} />
        {/* Factory - Machine Types */}
        <Route exact path="/factory/machine-types" component={ListMachineTypes} />
        <Route exact path="/factory/add/machine-type" component={EditMachineType} />
        <Route exact path="/factory/edit/machine-type/:id" component={EditMachineType} />
        {/* Factory - Machines */}
        <Route exact path="/factory/machines" component={ListMachines} />
        <Route exact path="/factory/add/machine" component={EditMachine} />
        <Route exact path="/factory/edit/machine/:id" component={EditMachine} />
        {/* Factory - Operations */}
        <Route exact path="/factory/operations" component={ListOperations} />
        <Route exact path="/factory/add/operation" component={EditOperation} />
        <Route exact path="/factory/edit/operation/:id" component={EditOperation} />
        {/* Factory - Production Lines */}
        <Route exact path="/factory/production-lines" component={ListProductionLines} />
        <Route exact path="/factory/add/production-line" component={EditProductionLine} />
        <Route exact path="/factory/edit/production-line/:id" component={EditProductionLine} />
        {/* Factory - Tools */}
        <Route exact path="/factory/tools" component={ListTools} />
        <Route exact path="/factory/add/tool" component={EditTool} />
        <Route exact path="/factory/edit/tool/:id" component={EditTool} />
        {/* Production - Manufacturing Plans */}
        <Route exact path="/production/manufacturing-plans" component={ListManufacturingPlans} />
        <Route exact path="/production/add/manufacturing-plan" component={EditManufacturingPlan} />
        <Route exact path="/production/edit/manufacturing-plan/:id" component={EditManufacturingPlan} />
        {/* Production - Products */}
        <Route exact path="/production/products" component={ListProducts} />
        <Route exact path="/production/add/product" component={EditProduct} />
        <Route exact path="/production/edit/product/:id" component={EditProduct} />
        {/* Visualization */}
        <Route exact path="/visualization/factory" component={FactoryVisualization} />
        <Route exact path="/visualization/production" component={ProductionVisualization} />
        {/* Production Planning */}
        <Route exact path="/production-planning" component={ProductionPlanning} />
        <GlobalHelper />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
