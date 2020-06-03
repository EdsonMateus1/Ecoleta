import express from "express";
import path from "path";
import routes from "./routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.get("/", (req, res) => {});
app.listen(3333, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("servidor rodando porta:http://localhost:3333");
  }
});
