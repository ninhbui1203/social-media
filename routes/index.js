const authRouter = require("./authRouter");
const userRouter = require("./userRouter");

const appRouter = (app) => {
  app.use("/api", authRouter); // For register/login/logout
  app.use("/api", userRouter);
};

module.exports = appRouter;
