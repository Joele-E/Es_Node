import express from "express";
import morgan from "morgan";
import "dotenv/config";
import Joi from "joi";

import { logIn, signUp } from "./controllers/users";

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));

app.use(express.json());

/* const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});



app.get("/api/planets", getAll);
app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);
app.post("/api/planets/:id/image", upload.single("image"), createImage);

app.delete("/api/planets/:id", deleteById);
 */

app.get("/", (req, res) => {
  res.send("CIAO");
});

app.post("/api/users/login", (req, res) => {
  res.send("CIAO");
});
app.post("/api/users/login", logIn);
app.post("/api/users/signup", signUp);

app.listen(port, () => {
  console.log(`Server partito sulla porta ${port}`);
});
