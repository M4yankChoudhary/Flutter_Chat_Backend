// Setup connection with MongoDB
import mongoose from 'mongoose';

// change according to your databse PATH/URL
const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://mayank:EhdZQ6AmBk2NYP5A@forgo.pthnexi.mongodb.net/flutter-chat2",
            // "mongodb://localhost:27017/api",
             {
                useUnifiedTopology: true,
            }
        ).then(() => {
            console.log("database connection successfully!");
        }).catch(e => {
            console.log("Database Error: "+ e);
        });
    } catch(e) {
        console.log("Database Error: "+ e);
    }
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

export default connectDB;