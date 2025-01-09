import express from "express";
import ViteExpress from "vite-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.get("/files", async (req, res) => {
  const arr = [];
  const requiredFolder = `${__dirname}/files/${req.query.folder}`;
  fs.readdirSync(requiredFolder).forEach((fileName) => {
    const data = fs.readFileSync(`${requiredFolder}/${fileName}`, "utf8");
    arr.push({ name: fileName, data: JSON.parse(data) });
  });
  console.log("arr", arr);
  res.send(arr);
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
