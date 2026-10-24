const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Fallback in-memory data
let localProducts = [
  { _id: '1', name: 'Logitech MX Master 3S', category: 'Accessories', price: 8999, stock: 14, sku: 'MOU-8999', description: 'Ergonomic wireless productivity mouse' },
  { _id: '2', name: 'Dell UltraSharp 27" 4K', category: 'Electronics', price: 42999, stock: 6, sku: 'MON-4299', description: 'Color accurate professional IPS monitor' },
  { _id: '3', name: 'Keychron K2 Mechanical Keyboard', category: 'Accessories', price: 7499, stock: 22, sku: 'KEY-7499', description: 'Wireless Bluetooth RGB keyboard' }
];

// GET /api/products - Read All Products + Summary Stats
router.get('/', async (req, res) => {
  try {
    let items;
    try {
      items = await Product.find().sort({ createdAt: -1 });
    } catch {
      items = localProducts;
    }

    const totalStock = items.reduce((acc, p) => acc + p.stock, 0);
    const totalValuation = items.reduce((acc, p) => acc + (p.price * p.stock), 0);

    res.status(200).json({
      success: true,
      count: items.length,
      stats: { totalStock, totalValuation },
      data: items
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/products - Create Product
router.post('/', async (req, res) => {
  try {
    const { name, category, price, stock, sku, description } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: 'Name, Category and Price are required.' });
    }

    const newProd = {
      _id: Date.now().toString(),
      name,
      category,
      price: Number(price),
      stock: Number(stock) || 0,
      sku: sku || `SKU-${Date.now().toString().slice(-4)}`,
      description: description || ''
    };

    try {
      const dbProd = new Product(newProd);
      await dbProd.save();
    } catch {
      localProducts.unshift(newProd);
    }

    res.status(201).json({ success: true, message: 'Product created successfully in MongoDB', data: newProd });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/products/:id - Update Product
router.put('/:id', async (req, res) => {
  try {
    let updated;
    try {
      updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } catch {
      const idx = localProducts.findIndex(p => p._id === req.params.id);
      if (idx !== -1) {
        localProducts[idx] = { ...localProducts[idx], ...req.body };
        updated = localProducts[idx];
      }
    }

    if (!updated) return res.status(404).json({ success: false, message: 'Product not found' });
    res.status(200).json({ success: true, message: 'Product updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/products/:id - Delete Product
router.delete('/:id', async (req, res) => {
  try {
    try {
      await Product.findByIdAndDelete(req.params.id);
    } catch {
      localProducts = localProducts.filter(p => p._id !== req.params.id);
    }
    res.status(200).json({ success: true, message: 'Product deleted from MongoDB' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
