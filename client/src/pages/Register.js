import React, { useState } from "react";
import Layout from "../components/Layout";
import { onRegistration } from "../api/auth";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await onRegistration(values);
      setError("");
      setSuccess(data.message);
      setValues({ email: "", password: "" });
    } catch (error) {
      console.error(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
      setValues({ email: "", password: "" });
    }
  };

  return (
    <Layout>
      <form
        onSubmit={onSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg pt-32"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Sign Up
        </h1>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            onChange={onChange}
            type="email"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            id="email"
            name="email"
            value={values.email}
            placeholder="example@gmail.com"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            onChange={onChange}
            type="password"
            value={values.password}
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            id="password"
            name="password"
            placeholder="password"
            required
          />
        </div>

        {error && <div className="text-red-600 text-sm mt-2 mb-4">{error}</div>}
        {success && (
          <div className="text-green-600 text-sm mt-2 mb-4">{success}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Register;
