const express = require('express');
const router = express.Router();

const products = [
  { id: 101, name: 'Mechanical Keyboard RGB', category: 'Hardware', price: 3499, inStock: true },
  { id: 102, name: 'Full HD Curved Monitor 27"', category: 'Display', price: 15999, inStock: true },
  { id: 103, name: 'Ergonomic Gaming Mouse', category: 'Hardware', price: 1899, inStock: false },
  { id: 104, name: 'USB-C Multiport Docking Station', category: 'Accessories', price: 4299, inStock: true }
];

// GET /api/products - Sorting & Pagination request handling
router.get('/', (req, res) => {
  let { sortBy, order = 'asc', limit = 10, page = 1 } = req.query;
  let result = [...products];

  if (sortBy && ['price', 'name'].includes(sortBy)) {
    result.sort((a, b) => {
      if (order === 'desc') return b[sortBy] > a[sortBy] ? 1 : -1;
      return a[sortBy] > b[sortBy] ? 1 : -1;
    });
  }

  const startIndex = (page - 1) * limit;
  const paginated = result.slice(startIndex, startIndex + Number(limit));

  res.status(200).json({
    success: true,
    totalItems: result.length,
    page: Number(page),
    limit: Number(limit),
    data: paginated
  });
});

module.exports = router;
