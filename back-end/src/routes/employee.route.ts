import { Router } from 'express';
import { Employee } from '../models/employee.model';

const router = Router();

const employees: Employee[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'jd@jd.com',
        hourlyRate: 10,
        overtimeHourlyRate: 15
    },
    {
        id: 2,
        name: 'Siddhant Sinha',
        email: 'ss@ss.com',
        hourlyRate: 12,
        overtimeHourlyRate: 17
    },
    {
        id: 3,
        name: 'Lee Russell',
        email: 'lr@lr.com',
        hourlyRate: 14,
        overtimeHourlyRate: 19
    },
    {
        id: 4,
        name: 'Nigel Worton',
        email: 'nw@nw.com',
        hourlyRate: 16,
        overtimeHourlyRate: 21
    },
    {
        id: 5,
        name: 'Dave Tak',
        email: 'dt@dt.com',
        hourlyRate: 18,
        overtimeHourlyRate: 23
    },
    {
        id: 6,
        name: 'Sharon Visscher',
        email: 'sv@sv.com',
        hourlyRate: 20,
        overtimeHourlyRate: 25
    },
    {
        id: 7,
        name: 'Louis Hebbs',
        email: 'lh@lh.com',
        hourlyRate: 22,
        overtimeHourlyRate: 27
    },
    {
        id: 8,
        name: 'Alex Jury',
        email: 'aj@aj.com',
        hourlyRate: 24,
        overtimeHourlyRate: 29
    },
    {
        id: 9,
        name: 'Ellie Forster',
        email: 'ef@ef.com',
        hourlyRate: 26,
        overtimeHourlyRate: 31
    },
    {
        id: 10,
        name: 'Barbara Poveda',
        email: 'bp@bp.com',
        hourlyRate: 28,
        overtimeHourlyRate: 33
    }
];

router.get('/employees', (req, res, next) =>
{
    res.status(200).json(employees);
});

export default router;