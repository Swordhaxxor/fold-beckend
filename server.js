const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10kb" }));

const whitelistPath = path.join(__dirname, "whitelist.json");

function getWhitelist() {
try {
const data = JSON.parse(fs.readFileSync(whitelistPath, "utf8"));
return Array.isArray(data.users) ? data.users : [];
} catch {
return [];
}
}

app.get("/", (req, res) => {
res.json({
name: "FOLD Backend",
status: "online"
});
});

app.get("/health", (req, res) => {
res.json({ status: "ok" });
});

app.get("/whitelist", (req, res) => {
res.json({
users: getWhitelist().map(user => ({
username: user.username,
role: user.role
}))
});
});

app.post("/whitelist/check", (req, res) => {
const { username } = req.body || {};

if (typeof username !== "string" || username.length < 3 || username.length > 20) {
return res.status(400).json({
allowed: false,
message: "Invalid username."
});
}

const user = getWhitelist().find(
entry => entry.username.toLowerCase() === username.toLowerCase()
);

res.json({
allowed: Boolean(user),
role: user ? user.role : null
});
});

app.listen(PORT, "0.0.0.0", () => {
console.log("FOLD Backend running on port ${PORT}");
});
