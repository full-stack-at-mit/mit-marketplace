import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout, updateProtectedInfo } from "../api/auth";
import Layout from "../components/Layout";
import { unauthenticateUser } from "../redux/slices/authSlice";
import "../stylesheets/Dashboard.css";
import Profile from "../assets/default_profile.jpg";

const ProfileSection = ({ profile, resetProfile }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const firstRef = useRef(null),
    lastRef = useRef(null);

  const update = () => {
    if (!(firstRef && firstRef.current && lastRef && lastRef.current)) return;
    updateProtectedInfo({
      first_name: firstRef.current.value,
      last_name: lastRef.current.value,
      interests: profile.interests,
    }).then(() => setIsUpdating(false));
  };

  if (!isUpdating) {
    return (
      <div className="profile-section">
        <div className="profile-photo">
          <img src={profile.profilePhoto || Profile} alt="Profile" />
        </div>
        <div className="profile-details">
          <h3>
            {profile.first_name || "Firstname"}{" "}
            {profile.last_name || "Lastname"}
          </h3>
          <p>Email: {profile.email}</p>
        </div>
        <div className="u-flex u-width-fit u-justify-end">
          <button
            onClick={() => setIsUpdating(true)}
            className="btn btn-primary"
          >
            Update
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-section">
        <div className="profile-photo">
          <img src={profile.profilePhoto || Profile} alt="Profile" />
        </div>
        <div className="profile-details">
          <input
            type="text"
            defaultValue={profile.first_name || "Firstname"}
            ref={firstRef}
          />
          <input
            type="text"
            defaultValue={profile.last_name || "Lastname"}
            ref={lastRef}
          />
          <p>
            <b>Email:</b> {profile.email}
          </p>
        </div>
        <div className="u-flex u-width-fit u-justify-end">
          <button
            onClick={() => setIsUpdating(false)}
            className="btn btn-primary cancel-button"
          >
            Cancel
          </button>
          <button onClick={update} className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    );
  }
};
const IntroSection = ({ profile, resetProfile }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const interestsRef = useRef(null);

  const update = () => {
    if (!(interestsRef && interestsRef.current)) return;
    updateProtectedInfo({
      first_name: profile.first_name,
      last_name: profile.last_name,
      interests: interestsRef.current.value,
    }).then(() => {
      resetProfile();
      setIsUpdating(false);
    });
  };

  if (!isUpdating) {
    return (
      <div className="intro-section">
        <h3>Intro</h3>
        <p>{profile.interests || "Add bio"}</p>
        <div className="u-flex u-justify-end">
          <button
            onClick={() => setIsUpdating(true)}
            className="btn btn-primary"
          >
            Update
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="intro-section">
        <h3>Intro</h3>
        <textarea
          ref={interestsRef}
          defaultValue={profile.interests}
          className="u-block"
        ></textarea>
        <div className="u-flex u-justify-end">
          <button
            onClick={() => setIsUpdating(false)}
            className="btn btn-primary cancel-button"
          >
            Cancel
          </button>
          <button onClick={update} className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    );
  }
};

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

  const getProtectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();
      setProtectedData(data.profile);
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    getProtectedInfo();
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
        <ProfileSection
          profile={protectedData}
          resetProfile={getProtectedInfo}
        />
        <IntroSection profile={protectedData} resetProfile={getProtectedInfo} />
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
