import express from 'express';
import * as dotenv from 'dotenv';
import * as ip from 'ip';
import routerApi  from './routes/routerApi';
const app = express();

dotenv.config();
if(!process.env.PORT){
  process.exit(1);
}
const port = process.env.PORT;

function loggerMiddleware(request: express.Request, response: express.Response, next: express.NextFunction){
  console.log(`${request.method} ${request.path}`);
  next();
}
app.use(loggerMiddleware);
app.use(express.json());

app.get('/', (request: express.Request, response: express.Response) => {
  console.log("calling root");
  response.send('My root');
});

app.listen(port, () => {
  const ip_address:string = ip.address();
  console.log(`Application is listening on port: http://${ip_address}:${port}`);
});

routerApi(app);

