import express from "express";
import ViteExpress from "vite-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.get("/files", async (req, res) => {
  const arr = [];
  const requiredFolder = `${__dirname}/files/${req.query.folder}`;
  fs.readdirSync(requiredFolder).forEach((fileName) => {
    const data = fs.readFileSync(`${requiredFolder}/${fileName}`, "utf8");
    arr.push({ fileName, data: JSON.parse(data) });
  });
  res.send(arr);
});

app.post("/save-file", function (req, res) {
  const { fileName, folder, data } = req.body;
  if (!folder || !fileName || !data) {
    throw new Error("no data retard");
  }
  const requiredFolder = `${__dirname}/files/${folder}`;
  fs.writeFileSync(`${requiredFolder}/${fileName}`, JSON.stringify(data));
  res.send(req.body);
});

const hostPort = 3000;

ViteExpress.listen(app, hostPort, () =>
  console.log(`Server is listening on http://localhost:${hostPort}`)
);
