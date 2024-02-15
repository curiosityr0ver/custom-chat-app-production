const jwt = require("jsonwebtoken");
require("dotenv").config();


const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (id, name) => {
    return jwt.sign({ id, name }, SECRET_KEY, {
        expiresIn: "12h",
    });
};

const decodeToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};
module.exports = { generateToken, decodeToken };
