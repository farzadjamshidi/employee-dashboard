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
    const employeeId = Number(req.query.employeeId);
    const startDate = req.query.startDate as string;

    const filteredShifts = shifts.filter(shift =>
    {
        if (employeeId && shift.employeeId !== employeeId)
        {
            return false;
        }

        if (startDate && !isInEqualDays(shift.clockIn, startDate))
        {
            return false;
        }

        return true;
    });

    res.status(200).json(filteredShifts);
});

router.put('/shifts', (req, res, next) =>
{
    const updatedShifts = req.body.shifts as Shift[];

    updatedShifts.forEach(updatedShift =>
    {
        const shiftsIndex = shifts.findIndex(shift => shift.id === updatedShift.id);
        shifts[shiftsIndex] = updatedShift;
    });

    res.status(200).json({ message: 'Shifts updated.' });
});

const isInEqualDays = (clockIn: string, startDate: string) =>
{
    const clockInDate = new Date(clockIn);
    const startDateDate = new Date(startDate);
    if (
        clockInDate.getDate() === startDateDate.getDate() &&
        clockInDate.getMonth() === startDateDate.getMonth() &&
        clockInDate.getFullYear() === startDateDate.getFullYear()
    )
    {
        return true;
    }
    return false;
};

export default router;