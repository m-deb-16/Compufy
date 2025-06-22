import React from "react";
import PageHeader from "../components/PageHeader";
// import Footer from "../components/Footer";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <>
      <PageHeader />
      <section className="about">
        <div className="main">
          <img src="https://svgshare.com/i/109x.svg" alt="" />

          <div className="about-text">
            <h1>About Us</h1>
            <h5>
              Developer<span> & Designer </span>
            </h5>
            <p>
              The team is comprised of four novice web developers, each
              contributing their skills to the collaborative effort.The team's
              dynamic is characterized by a collective approach, where diverse
              talents come together to create and refine web projects. Each
              member, though not specializing in specific roles, brings unique
              perspectives and skills to the table. Together, they navigate the
              challenges of web development, in pursuit of collective growth and
              proficiency.
            </p>
            Team members include:
            <ul>
              <li className="aboutLi">Mainak Deb</li>
              <li className="aboutLi">Rishabh Banerjee</li>
              <li className="aboutLi">Sayandeep Roy</li>
              <li className="aboutLi">Jiku Paul</li>
              <li className="aboutLi">Rohan Sharma</li>
            </ul>
            <Link to="/contact" className="rgb_btn btnAbout">
              Let's talk
            </Link>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default About;
