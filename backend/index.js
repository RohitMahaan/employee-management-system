process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ .NET API URL (Swagger running on 7002)
const DOTNET_API = "https://localhost:7002/api/auth/login";

app.post("/login", async (req, res) => {
  try {
    const response = await axios.post(DOTNET_API, {
      email: req.body.email,
      password: req.body.password,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error from .NET:", error.message);

    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Server Error" });
    }
  }
});

app.listen(4000, () => {
  console.log("Node running on http://localhost:4000");
});
