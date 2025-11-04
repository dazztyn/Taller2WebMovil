import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hola esta es la dazztynApi');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
//node index.js para correr el servidor
