import { Router } from 'express';
import { Shift } from '../models/shift.model';

const router = Router();

const shifts: Shift[] = [];

for (let i = 0; i < 1100; i++)
{

    const clockIn = new Date(
        new Date(2022, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2022, 0, 1).getTime())
    );

    const clockOut = new Date(
        clockIn.getTime() + ((Math.random() * 13) + 2) * 60 * 60 * 1000
    );

    shifts.push({
        id: i,
        employeeId: Math.floor(Math.random() * 10) + 1,
        clockIn: clockIn.toISOString().replace('Z', ''),
        clockOut: clockOut.toISOString().replace('Z', '')
    });
}

router.get('/shifts', (req, res, next) =>
{
    res.status(200).json(shifts);
});

export default router;