/*

Factory Endpoints

https://3na66-factory-prod.azurewebsites.net

Production Endpoints

https://3na66-production-prod.azurewebsites.net

Visualization Factory Endpoint

https://sgrai-visualization.azurewebsites.net

Visualization Production Endpoint

https://3na66-visualization-production.azurewebsites.net

Order Management Endpoints

https://ge.diog.co

*/

export const FACTORY_API = 'https://3na66-factory-prod.azurewebsites.net/api/v1';

export const PRODUCTION_API = 'https://3na66-production-prod.azurewebsites.net/api';

export const FACTORY_VISUALIZATION = 'https://sgrai-visualization.azurewebsites.net';

export const PRODUCTION_VISUALIZATION = 'https://3na66-visualization-production.azurewebsites.net';

export const ORDER_MANAGEMENT =
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://ge.diog.co';
