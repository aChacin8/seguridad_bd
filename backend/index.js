require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const auctionSocket = require('./services/auctionSocket'); // Asegúrate de la ruta correcta

const userRoutes = require('./routes/userRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const adminRoutes = require('./routes/adminRotes');
const bidsRoutes = require('./routes/bidsRoutes');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'");
  next();
});

app.use('/api', userRoutes);
app.use('/api', auctionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auctions', bidsRoutes);

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});
auctionSocket(io); 
server.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
