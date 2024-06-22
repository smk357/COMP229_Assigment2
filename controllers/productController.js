const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  console.log('getAllProducts controller function called');
  try {
    const products = await Product.find();
    console.log('Products retrieved:', products);
    res.json(products);
  } catch (err) {
    console.error('Error retrieving products:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  console.log('getProductById controller function called with ID:', req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error retrieving product:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  console.log('createProduct controller function called with data:', req.body);
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category
  });
  try {
    const newProduct = await product.save();
    console.log('Product created:', newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(400).json({ message: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  console.log('updateProduct controller function called with ID:', req.params.id, 'and data:', req.body);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product updated:', updatedProduct);
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(400).json({ message: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  console.log('deleteProduct controller function called with ID:', req.params.id);
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product deleted');
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// Delete all products
exports.deleteAllProducts = async (req, res) => {
    try {
      await Product.deleteMany({});
      res.status(200).json({ message: 'All products deleted successfully' });
    } catch (err) {
      console.error('Error deleting all products:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Search products by name containing keyword
exports.searchProductsByName = async (req, res) => {
    try {
      const keyword = req.params.keyword;
      const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
      res.status(200).json(products);
    } catch (err) {
      console.error('Error searching products by name:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };