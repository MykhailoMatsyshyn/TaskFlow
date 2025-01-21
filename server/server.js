// import jsonServer from "json-server";
// import auth from "json-server-auth";
// import cors from "cors";

// const server = jsonServer.create();
// const router = jsonServer.router("server/db.json");
// const middlewares = jsonServer.defaults();

// // Налаштування middleware
// server.use(cors());
// server.use(middlewares);

// // json-server-auth
// server.db = router.db;
// server.use(auth);

// server.use((req, res, next) => {
//   console.log("User from token:", req.user);
//   next();
// });

// server.use((req, res, next) => {
//   if (!req.headers.authorization) {
//     res.status(401).json({ error: "Authorization header is missing" });
//   } else {
//     try {
//       console.log(req);
//       const token = req.headers.authorization.split(" ")[1];
//       console.log(token);
//       const decoded = require("jsonwebtoken").decode(token); // Використовуйте секретний ключ для розшифровки
//       console.log(decoded);
//       req.user = decoded; // Додайте користувача в об'єкт req
//       next();
//     } catch (error) {
//       res.status(401).json({ error: "Invalid token" });
//     }
//   }
// });

// // Кастомна логіка доступу
// server.use((req, res, next) => {
//   if (req.method === "GET" && req.url.startsWith("/projects")) {
//     const user = req.user; // json-server-auth додає користувача

//     console.log("user:", user);

//     // Додати перевірку на існування користувача
//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized: No user found" });
//     }

//     const projects = router.db.get("projects").value();

//     const filteredProjects = projects.filter((project) => {
//       if (user.role === "Admin" || user.role === "Project Manager") {
//         return project.userId === user.id;
//       } else if (user.role === "Team Member") {
//         return project.assignedMembers.includes(user.id);
//       }
//       return false;
//     });

//     res.json(filteredProjects);
//   } else {
//     next();
//   }
// });

// // Підключення роутера
// server.use(router);

// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`JSON Server is running on http://localhost:${PORT}`);
// });
