import express from "express";
import morgan from "morgan";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("CIAO");
});

app.listen(port, () => {
  console.log(`Server partito sulla porta ${port}`);
});
