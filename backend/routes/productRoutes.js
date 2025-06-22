import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductByID,
  createProduct,
  deleteProduct,
} from "../controllers/productController.js";
// import products from "../data/products.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductByID).delete(protect, admin, deleteProduct);

export default router;
