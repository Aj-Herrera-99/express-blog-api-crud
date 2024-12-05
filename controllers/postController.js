const posts = require("../data/post.json"); // automatic parsing
const utils = require("../utils/utils");

// index
function index(req, res) {
    const dataFiltered = utils.getDataByQuery(req, posts);
    const response = utils.getResponse(dataFiltered);
    console.log(response);
    response.status == 404
        ? res.status(404).json(response)
        : res.json(response);
}

// show
function show(req, res) {
    const postTarget = utils.getDataById(req.params.id, posts);
    const response = utils.getResponse(postTarget);
    console.log(response);
    response.status == 404
        ? res.status(404).json(response)
        : res.json(response);
}

// store
function store(req, res) {
    console.log(req.body);
    
    // const max = [1, 5, 10, 3, 2, 4, 8].reduce((prev, next) => {
    //     return prev < next ? next : prev;
    // });

    // console.log(max);
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
        // utils.overrideDB("data/post.json", posts, null, 4);
    }
    response.status == 404
        ? res.status(404).json(response)
        : res.sendStatus(204);
}

module.exports = { index, show, store, update, modify, destroy };
