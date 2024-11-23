import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout, updateProtectedInfo } from "../api/auth";
import Layout from "../components/Layout";
import { unauthenticateUser } from "../redux/slices/authSlice";
import Profile from "../assets/default_profile.jpg";

const ProfileSection = ({ profile, resetProfile }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const firstRef = useRef(null),
    lastRef = useRef(null);

  const update = async () => {
    if (!(firstRef && firstRef.current && lastRef && lastRef.current)) return;

    try {
      await updateProtectedInfo({
        first_name: firstRef.current.value,
        last_name: lastRef.current.value,
        interests: profile.interests,
      });
      resetProfile();
      setIsUpdating(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!isUpdating) {
    return (
      <div className="profile-section bg-white shadow rounded-lg p-6 pt-36">
        <div className="flex items-center space-x-4">
          <img
            src={profile.profilePhoto || Profile}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">
              {profile.first_name || "Firstname"}{" "}
              {profile.last_name || "Lastname"}
            </h3>
            <p className="text-sm text-gray-600">Email: {profile.email}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsUpdating(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-section bg-white shadow rounded-lg p-6 pt-36">
        <div className="flex items-center space-x-4">
          <img
            src={profile.profilePhoto || Profile}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="space-y-2">
            <input
              type="text"
              defaultValue={profile.first_name || "Firstname"}
              ref={firstRef}
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              defaultValue={profile.last_name || "Lastname"}
              ref={lastRef}
              className="border rounded p-2 w-full"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => setIsUpdating(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={update}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
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

  const update = async () => {
    if (!(interestsRef && interestsRef.current)) return;

    try {
      await updateProtectedInfo({
        first_name: profile.first_name,
        last_name: profile.last_name,
        interests: interestsRef.current.value,
      });
      resetProfile();
      setIsUpdating(false);
    } catch (error) {
      console.error("Failed to update intro:", error);
    }
  };

  if (!isUpdating) {
    return (
      <div className="intro-section bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Intro</h3>
        <p className="text-gray-700">{profile.interests || "Add bio"}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsUpdating(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="intro-section bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Intro</h3>
        <textarea
          ref={interestsRef}
          defaultValue={profile.interests}
          className="border rounded p-2 w-full"
        ></textarea>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => setIsUpdating(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={update}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
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
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="h-screen flex justify-center items-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard-container max-w-5xl mx-auto space-y-6">
        <ProfileSection
          profile={protectedData}
          resetProfile={getProtectedInfo}
        />
        <IntroSection profile={protectedData} resetProfile={getProtectedInfo} />
        <div className="posts-section bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Posts</h3>
          <p className="text-gray-700">No posts available</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
