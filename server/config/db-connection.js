
import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb+srv://user:Passw0rd@mongodb.p3dgcod.mongodb.net/stocks?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to Database :: MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};