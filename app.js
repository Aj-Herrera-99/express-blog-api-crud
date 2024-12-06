// inizialization
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; 
const HOST = `http://localhost:${PORT}`; 

// routers
const postsRouter = require("./routers/posts");
const usersRouter = require("./routers/users");

// express middlewares
app.use(express.static("public")); // cartella public accessibile
app.use(express.json()); // body parser in json

// API routes
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// fallback
app.all("*", (req, res) => {
    res.send(`<h1>404 Not Found</h1>`);
});

// server opening
app.listen(PORT, () => {
    console.log(`Server aperto sulla porta ${PORT}
        ${HOST}`);
});
