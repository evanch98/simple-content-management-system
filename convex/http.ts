import { httpRouter } from 'convex/server';
import { auth } from './auth';
import { publicGet } from './project';

const http = httpRouter();

http.route({
  path: '/project',
  method: 'GET',
  handler: publicGet,
});

auth.addHttpRoutes(http);

export default http;
