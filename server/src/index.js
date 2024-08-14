import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import { SERVER_PORT } from './constants/constants.js';
import dbConnect from './utils/db-connection.js';

const app = express();
const PORT = SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Health check endpoint
app.get('/', (req, res) => {
  res.send("Hello, I'm ok!");
});

// Start the server
const startServer = async () => {
  try {
    const dbConnection = await dbConnect();
    if (dbConnection === true) {
      try {
        app.listen(PORT, () => {
          console.log(`🚀 Server is running on port ${PORT}`);
        });
      } catch (error) {
        console.log('❌ Cannot start the server: ', error);
      }
    }
  } catch (error) {
    console.log('❌ Cannot start the server: ', error);
  }
};

startServer();
