const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const articleRouter = require("./routes/articleRouter");
const commentRouter = require("./routes/commentRouter");
const categoryRouter = require("./routes/categoryRouter");
const categoriesOnArticlesRouter = require("./routes/categoriesOnArticlesRouter");
const main = require("./seed");

const PORT = process.env.PORT || 3000;
const hostman = process.env.HOSTMAN || "127.0.0.1";

const app = express();

app.use(bodyParser.json());

// Routes
// User routes
app.use("/api/v1", userRouter);

// Article routes
app.use("/api/v1", articleRouter);

//Comment routes
app.use("/api/v1", commentRouter);

//Category routes
app.use("/api/v1", categoryRouter);

//Categories on Articles routes
app.use("/api/v1", categoriesOnArticlesRouter);

//Seed data to database
//main();

//Server
app.listen(PORT, () => {
  console.log(`Server is running on port http://${hostman}:${PORT}`);
});
