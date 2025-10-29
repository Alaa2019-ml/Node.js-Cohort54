import express from "express";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`hello from backend to frontend!`);
});

app.post("/weather", (req, res) => {
  const { cityName } = req.body;
  if (!cityName) {
    return res.status(400).json({ msg: "City name is required." });
  }
  res.send(cityName);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
