const userRouter = require("./authRouter");

const appRouter = (app) => {
  app.use("/api", userRouter);
};

module.exports = appRouter;
