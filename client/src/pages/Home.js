import React from 'react'
import Layout from '../components/Layout'
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <Layout>
      <div className="container text-center my-5">
      <h1>Welcome to College Marketplace</h1>
      <p className="mt-3">
        College Marketplace is an online platform designed for students to buy, sell, and showcase products and services.
        Whether you're a student entrepreneur or looking for unique products from your peers, College Marketplace connects
        you with the college community.
      </p>

      <div className="mt-4">
        <h3>Our Purpose</h3>
        <p>
          Our mission is to empower students by creating a space where they can share, sell, and support each other's
          work. We believe in the strength of the college community and aim to provide a supportive platform for students.
        </p>
      </div>

      <div className="mt-5">
        <h3>Get Started</h3>
        <p>Explore the links below to learn more and get involved:</p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          {/* <Link href="/about" className="btn btn-outline-primary">About Us</Link> */}
          <NavLink to="/register" className="btn btn-primary mr-3">Sign Up</NavLink>
          <NavLink to="/login" className="btn btn-primary">Log in</NavLink>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Home