import { httpRouter } from 'convex/server';
import { auth } from './auth';
import { get } from './public';

const http = httpRouter();

http.route({
  path: '/project',
  method: 'GET',
  handler: get,
});

auth.addHttpRoutes(http);

export default http;
