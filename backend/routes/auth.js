const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin } = require("../controller/auth");

//routes
router.get("/signout", signout);
router.post(
  "/signup",
  [
    check("username")
      .isLength({ min: 3 })
      .withMessage("Enter proper name with length more than 3"),
      check("password")
      .isLength({ min: 5 })
      .withMessage("Enter proper name with length more than 5"),
    
  ],
  signup
);

router.post(
  "/signin",
  [
    check("username").isLength({ min: 3 }).withMessage("Enter proper Username"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Enter password with length greater than 5"),
  ],
  signin
);


module.exports = router;
