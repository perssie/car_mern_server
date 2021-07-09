import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import carRoutes from './routes/cars.js';
import userRouter from './routes/user.js';

// initialize express

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/cars', carRoutes);
app.use("/user", userRouter);


// init connection to database
// local config
// const CONNECTION_URL = 'mongodb://localhost/carDB';
const CONNECTION_URL = "mongodb+srv://persie:rakotoson963@cluster0.wvss5.mongodb.net/carDB?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))})
    .catch((error) => console.error(error));

mongoose.set('useFindAndModify', false);    
