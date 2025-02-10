// app.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./database/database');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Management API',
      version: '1.0.0',
      description: 'API documentation for the Library Management System',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api/docs`);
});
