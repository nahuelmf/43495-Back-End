require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const router = require("./routes");
const init = require("./services/mongoDBservice")

process.env.SELECTED_DB === "mongo" && init()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use("/api", router);


app.get("/", (req, res) => {
	res.sendFile("index.html", { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT} ✅`);
});
