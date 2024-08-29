import productService from '../services/product.service.js';

const ProductController = {
  createProduct: async (req, res) => {
    try {
      const product = await productService.createProduct(req.body);

      res.status(201).json({ success: true, data: product });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(500).json({ success: false, message: 'Product already exists' });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await productService.getAllProducts();

      res.status(201).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

export default ProductController;
