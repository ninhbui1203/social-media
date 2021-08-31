const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const postRouter = require("./postRouter");
const commentRouter = require("./commentRouter");

const appRouter = (app) => {
  app.use("/api", authRouter); // For register/login/logout
  app.use("/api", userRouter);
  app.use("/api", postRouter);
  app.use("/api", commentRouter);
};

module.exports = appRouter;
