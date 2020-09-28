import express from 'express';
import controller from '../controllers/Productcontroller.js';
const routes = express.Router;

routes.post('/Product/', controller.create);
routes.get('/Product/', controller.findAll);
routes.get('/Product/:id', controller.findOne);
routes.put('/Product/:id', controller.update);
routes.delete('/Product/:id', controller.remove);
routes.delete('/Product/', controller.removeAll);

export { routes };
