import { writeFile } from "node:fs";

writeFile("message.txt", "CIAO", "utf8", (err) => console.error(err));
