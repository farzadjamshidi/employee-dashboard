import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) =>
{
    console.log('server is running');
    next();
});

export default router;