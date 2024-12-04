const posts = require("../data/posts.json"); // automatic parsing
const utils = require("../utils/utils");
// index
function index(req, res) {
    const dataFiltered = utils.filterData(req, posts);
    console.log(dataFiltered);
    const response = utils.getResponse(dataFiltered);
    console.log(response);
    response.status == 404 ? res.sendStatus(404) : res.json(response);
}

// show
function show(req, res) {
    const postTarget = utils.getDataById(req.params.id, posts);
    console.log(postTarget);
    const response = utils.getResponse(postTarget);
    console.log(response);
    response.status == 404 ? res.sendStatus(404) : res.json(response);
}

// store
function store(req, res) {
    res.send("store operation");
}

// update
function update(req, res) {
    res.send("update operation -> id selected: " + req.params.id);
}

// modify
function modify(req, res) {
    res.send("partial modify operation -> id selected: " + req.params.id);
}

// destroy
function destroy(req, res) {
    const indexTarget = utils.getDataIndexById(req.params.id, posts);
    const response = utils.getResponse(posts[indexTarget]);
    if (indexTarget !== -1) {
        posts.splice(indexTarget, 1);
        console.log(posts);
        //! decommentare solo per vedere che il db di posts si cancella effettivamente
        // utils.overrideDB("data/posts.json", posts, null, 4);
    }
    response.status == 404 ? res.sendStatus(404) : res.sendStatus(204);
}

module.exports = { index, show, store, update, modify, destroy };
