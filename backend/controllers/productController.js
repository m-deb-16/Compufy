import asyncHandler from "express-async-handler";
import productModel from "../models/productModel.js";

// router = GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find({});
  res.json(products);
});

// router = GET /api/products/:id
const getProductByID = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);

  if (product) {
    return res.json(product);
  }

  res.status(404).json({ message: "Product not found" });
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);

  if (product) {
    await productModel.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductByID, createProduct, deleteProduct };
