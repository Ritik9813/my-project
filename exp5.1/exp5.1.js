require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // for JSON requests only

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/exp5_db';

// --- Schema & Model ---
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// --- Helper: validate ObjectId ---
const isValidId = (id) => mongoose.isValidObjectId(id);

// --- API Routes (JSON) ---

// Create product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const product = await Product.create({ name, price, category });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// Get single product by ID
app.get('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  if (!isValidId(id)) return res.status(400).json({ error: 'Invalid ID' });
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Update product by ID
app.put('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  if (!isValidId(id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete product by ID
app.delete('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  if (!isValidId(id)) return res.status(400).json({ error: 'Invalid ID' });
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Product deleted', product: deleted });
});

// --- Connect to MongoDB and start server ---
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

start();
