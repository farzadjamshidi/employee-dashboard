import bodyParser from "body-parser";
import express from "express";
import employeeRouter from "./routes/employee.route";
import shiftRouter from "./routes/shift.route";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) =>
{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use((req, res, next) =>
{
    setTimeout(() =>
    {
        next();
    }, 500);
});

app.use(employeeRouter);
app.use(shiftRouter);

app.listen(8000);