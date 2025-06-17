process.loadEnvFile() // Carga las varibles de entorno del archivo .env

const userRoutes = require('./routes/userRoutes')
const auctionRoutes = require('./routes/auctionRoutes')
const adminRoutes = require('./routes/adminRotes')

const express = require('express')
const cors = require('cors')
const http = require ('http')

const app = express()
const server = http.createServer(app) // 
const port = process.env.PORT || 3000

app.use(cors()) // Permite el acceso a la API desde cualquier origen
app.use(express.json()) //Maneja el body de las peticiones en formato JSON
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'");
  next();
});
app.use('/api', userRoutes) //Rutas de la API usuarios
app.use('/auctions', auctionRoutes )
app.use('/api/admin', adminRoutes)


server.listen(port, () => {
  console.log(`Server is running on port ${port}`) //Se imprime el puerto en el que corre el servidor
  console.log(`http://localhost:${port}`) 
})