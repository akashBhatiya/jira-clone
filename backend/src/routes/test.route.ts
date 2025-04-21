import express, { Router, Request, Response } from 'express';
const router: Router = express.Router();

import { test } from '../controllers/test.controller';


router.get('/', test);

export default router;
