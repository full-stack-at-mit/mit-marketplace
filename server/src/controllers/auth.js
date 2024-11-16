const db = require("../db");
// used to encrypt passwords
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query("select user_id, email from users");
    console.log("working!");
    console.log(rows);
    return res.status(200).json({ success: true, users: rows });
  } catch (error) {
    console.log(error.message);
  }
};

// controller to get user profile info
exports.protected = async (req, res) => {
  try {
    // retrieve the user's profile from req.user (set by passport)
    const profile = {
      user_id: req.user.id,
      email: req.user.email,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      interests: req.user.interests,
    };

    // return the profile information
    return res.status(200).json({
      success: true,
      profile: profile,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  const { first_name, last_name, interests } = req.body;
  const userId = req.user.id;

  try {
    // update the user's profile information in the database
    const result = await db.query(
      "UPDATE users SET first_name = $1, last_name = $2, interests = $3 WHERE user_id = $4 RETURNING user_id, email, first_name, last_name, interests",
      [first_name, last_name, interests, userId]
    );

    // if no rows are returned, the user was not found
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // send the updated profile information back as the response
    return res.status(200).json({
      success: true,
      profile: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);

    // query postgresql database
    await db.query("insert into users(email, password) values ($1, $2)", [
      email,
      hashedPassword,
    ]);

    return res.status(201).json({
      success: true,
      message: "Registration was successful!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  let user = req.user;
  payload = {
    id: user.user_id,
    email: user.email,
  };

  try {
    // create jwt token
    const token = await sign(payload, SECRET);
    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    // delete the token stored in the client
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};
