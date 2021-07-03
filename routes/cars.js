import express from 'express';

import { getCars, getCar, createCar, updateCar, deleteCar, likeCar } from '../controllers/cars.js';

const router = express.Router();
import auth from "../middleware/auth.js";


router.get('/', getCars);
router.get('/:id', getCar);

router.post('/', auth, createCar);
router.patch('/:id', auth, updateCar);
router.delete('/:id', auth, deleteCar);
router.patch('/:id/likeCar', auth, likeCar);
 
export default router; 