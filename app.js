require('dotenv').config();
const express = require('express');
const port = process.env.PORT;
const app = express();
const ApiError = require('./utils/apiError');
const errorMiddleware = require('./middlewares/errorMiddleware');
const mountRoutes = require("./routes/main");


//* Middlewares
app.use(express.json());

//* Routes
// Mount Routes
mountRoutes(app);


//* 404 error if not found page
app.all('*', (req,res,next) => {
  next(new ApiError("can't find this page",404));
});

//* Global error middleware
app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled rejection : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`App shut down...`);
    process.exit(1);
  });
});