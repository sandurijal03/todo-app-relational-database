const express = require('express');
const app = express();
const cors = require('cors');

const todoRoutes = require('./routes/routes');

app.use(express.json());
app.use(cors());

app.use('/api', todoRoutes);

app.listen(process.env.PORT, () =>
  console.log('server has started in port 3001'),
);
