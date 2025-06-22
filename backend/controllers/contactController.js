// import asyncHandler from "express-async-handler";
// import Contact from "../models/contactModel.js";

// const contactForm = async (req, res) => {
//   try {
//     const response = req.body;
//     await Contact.create(response);
//     return res.status(200).json({ message: "sent successfully" });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// export { contactForm };

import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

const contactForm = asyncHandler(async (req, res) => {
  const { fullname, email, phone, message } = req.body;

  // Validate input
  if (!fullname || !email || !phone || !message) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const contact = new Contact({
    fullname,
    email,
    phone,
    message,
  });

  await contact.save();
  res.status(200).json({ message: "Sent successfully" });
});

export { contactForm };
