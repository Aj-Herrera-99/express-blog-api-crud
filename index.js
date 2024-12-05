/**
    - Usando l'array dei post con le relative immagini, creare un file di routing (routers/posts.js) che conterrà le rotte necessarie per l'entità post.
    -All'interno creare le rotte per le operazioni CRUD (Index, Show, Create, Update e Delete
    - Tutte le risposte saranno dei testi che confermeranno l’operazione che il server deve eseguire, secondo le convenzioni REST. 
    Ad esempio:
    Se viene chiamata /posts col verbo GET ci aspettiamo “Lista dei post”;
    Se viene chiamato /posts/1 col verbo DELETE ci aspettiamo “Cancellazione del post 1”
    e via dicendo… 
    - Registrare il router dentro app.js con il prefisso /posts.
 */

// inizialization
const express = require("express");
const app = express();
const PORT = 3000 //process.env.PORT;
const HOST = `http://localhost:${PORT}` //process.env.HOST;

// routers
const postsRouter = require("./routers/posts");
const usersRouter = require("./routers/users");

// express middlewares
app.use(express.static("public"));  // cartella public accessibile
app.use(express.json());    // body parser in json

// API routes
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// fallback
app.all("*", (req,res) => {
    res.send(`<h1>404 Not Found</h1>`)
})

// server opening
app.listen(PORT, () => {
    console.log(`Server aperto sulla porta ${PORT}
        ${HOST}`);
});
