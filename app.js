// inizialization
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; 
const HOST = `http://localhost:${PORT}`; 

// imports
const postsRouter = require("./routers/posts");
const usersRouter = require("./routers/users");
const {notFoundHandler} = require("./middlewares/notFoundHandler");
const { errorHandler } = require("./middlewares/errorHandler");

// express middlewares
app.use(express.static("public")); // cartella public accessibile
app.use(express.json()); // body parser in json

// API routes
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// fallback
app.use(notFoundHandler);
app.use(errorHandler)

// server opening
app.listen(PORT, () => {
    console.log(`Server aperto sulla porta ${PORT}
        ${HOST}`);
});
