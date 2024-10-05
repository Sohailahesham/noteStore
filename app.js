const express = require("express");
const app = express();
const { connectToDb, getDb } = require("./db");
const noteRoutes = require("./routes/noteRoutes");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let db;
//app.use(express.json());

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    });
    db = getDb();
  }
});

app.get("/", (req, res) => {
  res.redirect("/notes");
});

app.use("/notes", noteRoutes);

app.use((req, res) => {
  res.render("404", { title: "Error" });
});
