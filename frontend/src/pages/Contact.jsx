import React, { useState } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";

const ContactForm = () => {
  const [data, setData] = useState({
    fullname: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/form", data);
      console.log(response.data);
      alert("Message sent successfully!");
      setData({ fullname: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <PageHeader />
      <section id="contact-us">
        <h1 className="heading">Contact Us</h1>
        <div className="form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="contactLabel" htmlFor="fullname">
              Full name:
            </label>
            <input
              type="text"
              value={data.fullname}
              onChange={(e) => setData({ ...data, fullname: e.target.value })}
              name="fullname"
              required
            />
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              name="phone"
              required
            />
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              name="email"
              required
            />
            <label htmlFor="message">Message:</label>
            <textarea
              value={data.message}
              onChange={(e) => setData({ ...data, message: e.target.value })}
              name="message"
              required
            ></textarea>
            <div className="btns">
              <input type="submit" value="Submit" />
              <input
                type="reset"
                value="Reset"
                onClick={() =>
                  setData({ fullname: "", phone: "", email: "", message: "" })
                }
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
