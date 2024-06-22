const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection string
const dbURI = 'mongodb+srv://smk357:fsh0EOgYPNHyFkz4@cluster0.i0zmxc1.mongodb.net/Marketplace?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err.message));

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello, welcome to the Marketplace API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
