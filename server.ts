import express from "express";
import morgan from "morgan";
import "dotenv/config";
import Joi from "joi";

import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./controllers/planets.ts";

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));

app.use(express.json());

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

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

app.get("/", (req, res) => {
  res.send("CIAO");
});

app.get("/api/planets", getAll);
app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

app.listen(port, () => {
  console.log(`Server partito sulla porta ${port}`);
});
