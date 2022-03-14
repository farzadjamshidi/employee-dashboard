import bodyParser from "body-parser";
import express from "express";
import employeeRouter from "./routes/employee.route";
import shiftRouter from "./routes/shift.route";

const app = express();

app.use(bodyParser.json());

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