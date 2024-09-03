import Mongoose from "mongoose";

export default function DBConnect() {
  const url = "mongodb://localhost:27017/mern_test";

  Mongoose.connect(url)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}
