const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
res.json({
name: "FOLD Backend",
status: "online",
message: "Backend API is running."
});
});

app.get("/health", (req, res) => {
res.json({ status: "ok" });
});

app.listen(PORT, "0.0.0.0", () => {
console.log("FOLD Backend running on port ${PORT}");
});
