const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 8080;

const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
