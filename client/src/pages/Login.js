import React, { useState } from "react";
import Layout from "../components/Layout";
import { onLogin } from "../api/auth";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(values);
      dispatch(authenticateUser());
      localStorage.setItem("isAuth", "true");
    } catch (error) {
      console.error(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <Layout>
      <form
        onSubmit={onSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg pt-32"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
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

        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              onChange={onChange}
              type={showPassword ? "text" : "password"}
              value={values.password}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              id="password"
              name="password"
              placeholder="password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm mt-2 mb-4">{error}</div>
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

export default Login;
