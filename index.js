require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  console.log('Middleware: body', req.body);  // Verifica si llega algo
  next();
});

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
