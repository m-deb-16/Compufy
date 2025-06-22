import React from "react";
import { Link, useParams } from "react-router-dom";
import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductComp from "../components/ProductComp";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Container } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";

export const Home = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const filteredProducts = products
    ? products.filter((product) => product.rating > 4.2)
    : [];

  return (
    <>
      <div className="hero-container">
        <HomeNav />

        <div className="row00 row00Height">
          <div className="col1">
            <h1 className="mb-1">Tech's finest, yours now.</h1>
            <p className="mb-1">
              Explore a digital universe of cutting-edge technology. Elevate
              your experience with our premium selection.
            </p>
            <Link to="./products" className="pc_btns ">
              Explore now
            </Link>
          </div>
          <div className="col1">
            <img src={require("../imgs/heroImg.png")} alt="" />
          </div>
        </div>
      </div>

      <div className="offers-container">
        <h1 className="offers">Offers</h1>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img className="simg" src={require("../imgs/AMD.jpg")} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="simg"
              src={require("../imgs/Intel_arc.jpg")}
              alt=""
            />
          </SwiperSlide>
          {/* <SwiperSlide>
            <img
              className="simg"
              src={require("../imgs/Nvidia_40.png")}
              alt=""
            />
          </SwiperSlide> */}
          {/* <SwiperSlide>
            <img src={require("../imgs/mobo2.jpg")} alt="" />
          </SwiperSlide> */}
        </Swiper>
      </div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Container>
          <Message variant="danger">
            {isError?.data?.message || isError.error || "An error occurred"}{" "}
            {/* make message component with danger and success thing from bootstrap */}
          </Message>
        </Container>
      ) : (
        <>
          {/* <main className="py-3"> */}
          <Container>
            <h1 className="featured">Featured Products</h1>

            <Row>
              {filteredProducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductComp product={product} />
                </Col>
              ))}
            </Row>
          </Container>
          {/* </main> */}
        </>
      )}

      {/* <Footer /> */}
    </>
  );
};
