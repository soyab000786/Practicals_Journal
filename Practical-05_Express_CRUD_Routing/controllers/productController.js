const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'products.json');

// Helper to read products
const readProducts = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper to save products
const saveProducts = (products) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
};

/**
 * @desc   Get all products (with optional filtering & search)
 * @route  GET /api/products
 */
const getAllProducts = (req, res) => {
  let products = readProducts();
  const { category, search, minPrice, maxPrice } = req.query;

  // Filter by category
  if (category) {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Search by name
  if (search) {
    products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  // Filter by price range
  if (minPrice) {
    products = products.filter(p => p.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    products = products.filter(p => p.price <= parseFloat(maxPrice));
  }

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
};

/**
 * @desc   Get single product by ID
 * @route  GET /api/products/:id
 */
const getProductById = (req, res) => {
  const products = readProducts();
  const productId = parseInt(req.params.id);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${req.params.id} was not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
};

/**
 * @desc   Create new product
 * @route  POST /api/products
 */
const createProduct = (req, res) => {
  const { name, category, price, stock } = req.body;

  // Validation
  if (!name || !category || price === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: "name", "category", and "price" are required fields.'
    });
  }

  if (isNaN(price) || price < 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: "price" must be a positive number.'
    });
  }

  const products = readProducts();

  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name: name.trim(),
    category: category.trim(),
    price: parseFloat(price),
    stock: stock !== undefined ? parseInt(stock) : 0,
    inStock: stock !== undefined ? parseInt(stock) > 0 : true,
    createdAt: new Date().toISOString()
  };

  products.push(newProduct);
  saveProducts(products);

  res.status(201).json({
    success: true,
    message: 'Product created successfully.',
    data: newProduct
  });
};

/**
 * @desc   Update product completely (PUT)
 * @route  PUT /api/products/:id
 */
const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, category, price, stock, inStock } = req.body;

  const products = readProducts();
  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${req.params.id} does not exist.`
    });
  }

  // Full update
  products[index] = {
    ...products[index],
    name: name !== undefined ? name.trim() : products[index].name,
    category: category !== undefined ? category.trim() : products[index].category,
    price: price !== undefined ? parseFloat(price) : products[index].price,
    stock: stock !== undefined ? parseInt(stock) : products[index].stock,
    inStock: inStock !== undefined ? inStock : (stock !== undefined ? parseInt(stock) > 0 : products[index].inStock),
    updatedAt: new Date().toISOString()
  };

  saveProducts(products);

  res.status(200).json({
    success: true,
    message: 'Product updated successfully.',
    data: products[index]
  });
};

/**
 * @desc   Delete product by ID
 * @route  DELETE /api/products/:id
 */
const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const products = readProducts();
  const productToDelete = products.find(p => p.id === productId);

  if (!productToDelete) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${req.params.id} not found.`
    });
  }

  const updatedProducts = products.filter(p => p.id !== productId);
  saveProducts(updatedProducts);

  res.status(200).json({
    success: true,
    message: `Product "${productToDelete.name}" (ID: ${productId}) has been deleted.`,
    data: productToDelete
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
