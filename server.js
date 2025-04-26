const express = require('express');
const db = require('./models');
const { swaggerUi, swaggerSpec } = require('./swagger');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
require('dotenv').config();


const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`📘 Swagger docs at http://localhost:${PORT}/api-docs`);
  });
});
