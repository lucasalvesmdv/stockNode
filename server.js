import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//import { routes } from './src/routes/routes.js';
//import { db } from './src/models/Product.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: 'http://localhost:3000',
  })
);

app.use(routes);

/*app.get('/', (req, res) => {
  res.send('API em execucao');
});*/

app.listen(process.env.PORT || 8081, () => {
  console.log('API em execução');
});
