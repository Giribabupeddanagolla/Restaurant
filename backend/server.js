const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { initSocket } = require('./socket/socket');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Giri Restaurant MERN Backend running on port ${PORT}`);
  console.log(`🌐 Health Check: http://localhost:${PORT}/api/health`);
});
