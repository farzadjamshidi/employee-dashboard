import bodyParser from "body-parser";
import express from "express";
import appRouter from "./routes/app.route";

const app = express();

app.use(bodyParser.json());

app.use(appRouter);

app.listen(8000);