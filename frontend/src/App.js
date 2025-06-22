import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ToastContainer />
      {/* <Header /> */}
      <main className="footerFix">
        {/* <Container> */}
        <Outlet />
        {/* </Container> */}
      </main>
      <Footer />
    </>
  );
}

export default App;
