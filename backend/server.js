const express = require("express");
const dotenv = require("dotenv").config({ path: "./.env" });
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const asyncHandler = require("./middlewares/asyncHandler");
const errorHandler = require("./middlewares/ErrorHandler");

const PORT = process.env.PORT;
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

const usersRoute = require("./routes/userRoute");
const ticketsRoute = require("./routes/ticketRoute");

app.use("/api/users", usersRoute);
app.use("/api/tickets", ticketsRoute);

app.use(asyncHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
