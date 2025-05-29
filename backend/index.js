const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const analyzeRoute = require("./routes/analyze");
const hubspotRoute = require("./routes/hubspot");

const app = express();
const PORT = 3032;

app.use(cors());
app.use(bodyParser.json());

app.use("/analyze", analyzeRoute);
app.use("/create-hubspot-fields", hubspotRoute);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
