// middleware to check if user is loggedin

const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next(); // agar no user loggedin simple call next
    }

    try {
      const userPayload = validateToken(tokenCookieValue); // check if the token is validated
      req.user = userPayload; // if it is verified then give the details to user. Payload contains the detail. see authentication.js
    } catch (error) {}
    return next();
  };
}

module.exports = { checkForAuthenticationCookie };
