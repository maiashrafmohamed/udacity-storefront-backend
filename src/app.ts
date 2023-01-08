import express from 'express';
import routes from './routes';
import handleErrors from './middelware/errorHandler';

const app = express();

// parse body params and attache them to req.body
app.use(express.json());

app.use('/api', routes);

app.use(handleErrors);

app.listen('3000', () => {
  console.log(`Server started on port 3000`);
});

export default app;
