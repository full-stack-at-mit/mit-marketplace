const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { SECRET } = require("../constants");
const db = require("../db");

const cookieExtractor = function (req) {
  let token = null;
  // if there is a cookie called token, return that
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

// options
const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
};

// create protected route
passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      // fetch user details, including profile information
      const { rows } = await db.query(
        "SELECT user_id, email, first_name, last_name, interests FROM users WHERE user_id = $1",
        [id]
      );

      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      // attach full profile to req.user
      let user = {
        id: rows[0].user_id,
        email: rows[0].email,
        first_name: rows[0].first_name,
        last_name: rows[0].last_name,
        interests: rows[0].interests,
      };

      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);
