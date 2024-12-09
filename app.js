// third-party packages
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
const multer = require("multer");
// full control on storing uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

// imports
const postsRouter = require("./routers/posts");
const usersRouter = require("./routers/users");
const { notFoundHandler } = require("./middlewares/notFoundHandler");
const { errorHandler } = require("./middlewares/errorHandler");

// express middlewares
app.use(express.static("public")); // cartella public accessibile
app.use(express.json()); // body parser in json

// API routes
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// API per l'upload di un file -> per semplicità gestisco solo file singoli
// Per semplicità non cè controllo sul tipo di file, si presume type image
app.post("/api", upload.single("file"), (req, res) => {
    if(!req.body) return;
    if(!req.file) return;
    let filePath = req.file.path.replaceAll(`\\`, "/");
    filePath = filePath.replace("public", "");
    console.log(filePath);
    res.json({ path: filePath });
})

// fallback
app.use(notFoundHandler);
app.use(errorHandler);

// server opening
app.listen(PORT, () => {
    console.log(`Server aperto sulla porta ${PORT}
        ${HOST}`);
});
