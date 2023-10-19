import express from "express";
import morgan from "morgan";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.get("/", (req, res) => {
  res.send("CIAO");
});

app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});
app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
});

app.listen(port, () => {
  console.log(`Server partito sulla porta ${port}`);
});
