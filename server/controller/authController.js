const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide username and password",
      });
    }
    const user = new User({ username, password, role });

    await user.save();

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "mysecret",
      { expiresIn: "1h" }
    );

    // 4️⃣ Return token + user
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.cookies && req.cookies.jwt) token = req.cookies.jwt;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return "You are not logged in to get access";
    }
    //verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //check user exist
    const currentUser = await userModel.findById(decoded.id);
    if (!currentUser) {
      return "The user belonging to token no longer exist";
    }
    console.log(decoded.iat);
    //check user changed password after token issue
    if (currentUser.changePassword(decoded.iat)) {
      return "User recently changed password.Please login again";
    }
    //making user available for next middleware..important
    req.user = currentUser;
  } catch (error) {
    next(error);
  }
  next();
};
