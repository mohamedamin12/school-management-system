const authRoute = require('./authRote');
const classRoute = require("./classRoute");
const studentRoute = require("./studentRoute");
const teacherRoute = require("./teacherRoute");
const subjectRoute = require("./subjectRoute");

const mountRoutes = (app)=> {
  app.use('/api/v1/auth', authRoute);
  app.use("/api/v1/classes", classRoute);
  app.use("/api/v1/students", studentRoute);
  app.use("/api/v1/teachers", teacherRoute);
  app.use("/api/v1/subjects", subjectRoute);

}

module.exports = mountRoutes;