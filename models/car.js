import mongoose from 'mongoose';

const carSchema = mongoose.Schema({
    name: String,
    type: String,
    description: String,
    addBy: String,
    selectedFile: String,
    createAt: {
        type: Date,
        default: new Date(),
    },
    likes: {
        type: Number,
        default : 0
    },
    comments: [{
        author: String,
        comment: String
    }]
 
});

const Car = mongoose.model('Car', carSchema);

export default Car;