import React from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="container text-center pt-32">
        <h1>Welcome to College Marketplace</h1>
        <p className="mt-3">
          College Marketplace is an online platform designed for students to
          buy, sell, and showcase products and services. Whether you're a
          student entrepreneur or looking for unique products from your peers,
          College Marketplace connects you with the college community.
        </p>

        <div className="mt-4">
          <h3>Our Purpose</h3>
          <p>
            Our mission is to empower students by creating a space where they
            can share, sell, and support each other's work. We believe in the
            strength of the college community and aim to provide a supportive
            platform for students.
          </p>
        </div>

        {isAuth ? (
          <div className="mt-5">
            <div className="d-flex justify-content-center gap-3 mt-3">
              {/* <Link href="/about" className="btn btn-outline-primary">About Us</Link> */}
              <NavLink to="/browse" className="btn btn-primary mr-3">
                Browse
              </NavLink>
              <NavLink to="/upload" className="btn btn-primary">
                Upload
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <div className="d-flex justify-content-center gap-3 mt-3">
              {/* <Link href="/about" className="btn btn-outline-primary">About Us</Link> */}
              <NavLink to="/register" className="btn btn-primary mr-3">
                Sign Up
              </NavLink>
              <NavLink to="/login" className="btn btn-primary">
                Log in
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
