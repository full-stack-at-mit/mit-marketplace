import axios from "axios";
// sends cookies back to server
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  return await axios.post(
    "http://localhost:8000/api/register",
    registrationData
  );
}

export async function onLogin(loginData) {
  return await axios.post("http://localhost:8000/api/login", loginData);
}

export async function onLogout() {
  return await axios.post("http://localhost:8000/api/logout");
}

export async function fetchProtectedInfo() {
  return await axios.get("http://localhost:8000/api/protected");
}

export async function updateProtectedInfo(formData) {
  return await axios.put("http://localhost:8000/api/profile", formData);
}