import Car from '../models/car.js';
import mongoose from 'mongoose';

/**
 * get all car in database
 * @param {*} req 
 * @param {*} res 
 */
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        console.log('all cars', cars);
        res.status(200).json(cars);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const getCar = async (req, res) => { 
    const { id } = req.params;

    try {
        const car = await Car.findById(id);
        
        res.status(200).json(car);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/**
 * create a new Car
 * @param {*} req 
 * @param {*} res 
 */
export const createCar = async (req, res) =>  {
    const car = req.body;
    const newCar = new Car(car);
    try {
        await newCar.save();
        res.status(200).json(newCar);
    } catch (error) {
        res.status(405).json(error.message);
    }
}

/**
 * Update existing Car
 * @param {*} res 
 * @param {*} res 
 * @returns updatedcar if exists
 */
export const updateCar = async (req, res) => {
    const { id: _id} = req.params;
    const car = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('car not found');

    const updatedCar = await Car.findByIdAndUpdate(_id, { ...car, _id}, { new: true});

    res.json(updatedCar);
}

export const deleteCar = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Can not found id: ${id}`);

    await Car.findByIdAndRemove(id);

    res.json({ message: "Car deleted." });
}

export const likeCar = async (req, res) => {
    const { id } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Car not found with id: ${id}`);
    
    const car = await Car.findById(id);

    const updatedCar = await Car.findByIdAndUpdate(id, { likes: car.likes + 1 }, { new: true });
    
    res.json(updatedCar);
}