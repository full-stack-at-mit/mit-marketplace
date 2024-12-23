import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home.js";
import SingleItemPage from "./pages/SingleItemPage.js"
import Dashboard from "./pages/Dashboard.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Browse from "./pages/Browse.js";
import Survey from "./pages/Survey.js";
import UploadForm from "./pages/UploadForm.js";
import { useSelector } from "react-redux";
import "./stylesheets/utilities.css";
import "./index.css";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  // check if user is authenticated. if so, render outlet (content for the page)
  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/item/:id" element={<SingleItemPage />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/browse" element={<Browse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
