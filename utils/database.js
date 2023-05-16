import mongoose from "mongoose";

let isCOnnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isCOnnected) {
    console.log("MongoDB DataBase already Connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Share_Prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isCOnnected = true;
      console.log("MongoDB connected!");
      
  } catch (error) {
    console.log(error);
  }
};
