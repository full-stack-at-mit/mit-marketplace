import React from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { isAuth } = useSelector((state) => state.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <header className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="mt-4 md:hidden">
              <NavLink to="/register" className="btn btn-primary mr-3">
                <button className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  Sign Up
                </button>
              </NavLink>
              <NavLink to="/login" className="btn btn-primary">
                <button className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition-colors mt-2">
                  Log In
                </button>
              </NavLink>
            </nav>
          )}
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to College Marketplace
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              College Marketplace is an online platform designed for students to
              buy, sell, and showcase products and services.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                Our Purpose
              </h3>
              <p className="text-gray-600 mb-6">
                Our mission is to empower students by creating a space where
                they can share, sell, and support each other's work. We believe
                in the strength of the college community and aim to provide a
                supportive platform for students.
              </p>
              <nav className="hidden md:flex space-x-1">
                <NavLink to={isAuth ? "/browse" : "/login"}>
                  <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors">
                    {isAuth ? "Browse" : "Log In"}
                  </button>
                </NavLink>

                <NavLink to={isAuth ? "/upload" : "/register"}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ml-4">
                    {isAuth ? "Upload" : "Sign Up"}
                  </button>
                </NavLink>
              </nav>
            </div>
            <div className="bg-blue-200 h-64 rounded-lg flex items-center justify-center">
              <img
                src="https://alum.mit.edu/sites/default/files/images/Slice_23.09.22_Rankings.jpg"
                alt="Community"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          </section>

          <section className="text-center">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">
              Get Started
            </h3>
            <p className="text-gray-600 mb-8">
              Use the browse page to see available products and services
            </p>
          </section>
        </main>

        <footer className="bg-gray-100 py-6 mt-16">
          <div className="container mx-auto px-4 text-center text-gray-600">
            &copy; 2023 College Marketplace. All rights reserved.
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Home;
