import mongoose from 'mongoose';
const connection = {};

const dbConnect = async () => {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.DB_CONNECTION);

  connection.isConnected = db.connections[0].readyState;
};

export default dbConnect;
