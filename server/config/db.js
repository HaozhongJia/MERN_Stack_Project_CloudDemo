const mongoose = require("mongoose");
const uri = "mongodb+srv://dbUser:dbuser@cluster0.7bbfhcs.mongodb.net/?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}


/*
try {
  mongoose.connect("mongodb://localhost:27017/Ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
*/
