// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchProtectedInfo, onLogout } from "../api/auth";
// import Layout from "../components/Layout";
// import { unauthenticateUser } from "../redux/slices/authSlice";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const [protectedData, setProtectedData] = useState(null);

//   const logout = async () => {
//     try {
//       await onLogout();

//       dispatch(unauthenticateUser());
//       localStorage.removeItem("isAuth");
//     } catch (error) {
//       console.log(error.response);
//     }
//   };

//   const protectedInfo = async () => {
//     try {
//       const { data } = await fetchProtectedInfo();

//       // set profile data from api response
//       setProtectedData(data.profile);

//       setLoading(false);
//     } catch (error) {
//       logout();
//     }
//   };

//   useEffect(() => {
//     protectedInfo();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return loading ? (
//     <Layout>
//       <h1>Loading...</h1>
//     </Layout>
//   ) : (
//     <div>
//       <Layout>
//         <h1>Dashboard</h1>
//         {protectedData && (
//           <div>
//             <h2>
//               Welcome, {protectedData.first_name} {protectedData.last_name}
//             </h2>
//             <p>Email: {protectedData.email}</p>
//             <p>Interests: {protectedData.interests}</p>
//           </div>
//         )}

//         <button onClick={() => logout()} className="btn btn-primary">
//           Logout
//         </button>
//       </Layout>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import Layout from "../components/Layout";
import { unauthenticateUser } from "../redux/slices/authSlice";
import "../stylesheets/Dashboard.css";
import Profile from "../assets/default_profile.jpg";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();
      setProtectedData(data.profile);
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard-container">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-photo">
            <img src={protectedData.profilePhoto || Profile} alt="Profile" />
          </div>
          <div className="profile-details">
            <h2>
              {protectedData.first_name} {protectedData.last_name}
            </h2>
            <p>Studies at {protectedData.university || "Unknown University"}</p>
            <p>From {protectedData.location || "Unknown Location"}</p>
          </div>
        </div>
        <div className="intro-section">
          <h3>Intro</h3>
          <p>{protectedData.bio || "Add bio"}</p>
        </div>
        <div className="posts-section">
          <h3>Posts</h3>
          <p>No posts available</p>
        </div>
        <button onClick={logout} className="btn btn-primary">
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default Dashboard;
