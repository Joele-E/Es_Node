import express from "express";
import morgan from "morgan";
import "dotenv/config";
import Joi from "joi";
const app = express();
const port = process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
let planets = [
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
app.get("/api/planets", (req, res) => {
    res.status(200).json(planets);
});
app.get("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    res.status(200).json(planet);
});
app.post("/api/planets", (req, res) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    const validatedNewPlanet = planetSchema.validate(newPlanet);
    if (validatedNewPlanet.error) {
        return res.status(400).json({ msg: "There was an error" });
    }
    else {
        planets = [...planets, newPlanet];
        res.status(201).json({ msg: "The planet was added succescfully" });
    }
});
app.put("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map((p) => (p.id === Number(id) ? Object.assign(Object.assign({}, p), { name }) : p));
    console.log(planets);
    res
        .status(200)
        .json({ msg: `The planet with id ${id} was modified succescfully` });
});
app.listen(port, () => {
    console.log(`Server partito sulla porta ${port}`);
});
