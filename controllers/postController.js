const posts = require("../data/post.json"); // automatic parsing
const get = require("../utils/getters");

// index
function index(req, res) {
    const dataFiltered = get.dataByQuery(req, posts);
    const response = get.response(dataFiltered);
    console.log(response);
    response.status == 404
        ? res.status(404).json(response)
        : res.json(response);
}

// show
function show(req, res) {
    const postTarget = get.dataById(req.params.id, posts);
    const response = get.response(postTarget);
    console.log(response);
    response.status == 404
        ? res.status(404).json(response)
        : res.json(response);
}

// store
function store(req, res) {
    // se per qualche motivo la body req è vuota oppure
    // l'oggetto non ha tutte le proprieta di un oggetto post (escluso id)
    // manda non accettabile
    if (Object.keys(req.body).length != Object.keys(posts[0]).length - 1) {
        res.status(406).json({ message: "Not Acceptable" });
        return;
    }
    // prendo il max id corrente dei post e aumento di uno
    const indexNewPost = get.currMaxId(posts) + 1;
    // assegno ad un nuovo oggetto l'index aumentato
    let newPost = {
        id: indexNewPost,
    };
    // spalmo le proprieta gia presenti e le proprieta della body request
    newPost = { ...newPost, ...req.body };
    // preparo la risposta da mandare
    const response = get.response(newPost);
    // non dovrebbe succedere ma non si sa mai
    if (response.status != 404) {
        posts.push(newPost);
        console.log(posts);
        response.status = 201;
        res.status(201).json(response);
        return;
    }
    res.status(404).json(response);
}

// update
function update(req, res) {
    const postTarget = get.dataById(req.params.id, posts);
    // se non è stato trovato il post con l'id dinamico manda 404
    if (!postTarget) {
        const response = get.response(null);
        res.status(404).json(response);
        return;
    }
    // aggiorno i valori delle proprietà con i valori della body request
    for (let key in req.body) {
        postTarget[key] = req.body[key];
    }
    const response = get.response(postTarget);
    console.log(posts);
    res.json(response);
}

// modify
function modify(req, res) {
    res.send("partial modify operation -> id selected: " + req.params.id);
}

// destroy
function destroy(req, res) {
    const indexTarget = get.dataIndexById(req.params.id, posts);
    const response = get.response(posts[indexTarget]);
    if (indexTarget !== -1) {
        posts.splice(indexTarget, 1);
        console.log(posts);
        //! decommentare solo per vedere che il db di posts si cancella effettivamente
        // utils.overrideDB("data/post.json", posts, null, 4);
    }
    response.status == 404
        ? res.status(404).json(response)
        : res.sendStatus(204);
}

module.exports = { index, show, store, update, modify, destroy };
