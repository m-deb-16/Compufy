import express from "express";
const contactRoute = express.Router();
import { contactForm } from "../controllers/contactController.js";

// Define the route correctly
contactRoute.route("/").post(contactForm);

export default contactRoute;
