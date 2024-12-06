const users = require("../data/user.json"); // automatic parsing
const get = require("../utils/getters");

function index(req, res) {
    const dataFiltered = get.dataByQuery(req.query, users);
    const response = get.response(dataFiltered);
    console.log(response);
    response.status == 404
        ? res.status(404).json(response)
        : res.json(response);
}

function show(req, res) {
    console.log(req.params);
    let usersTarget = get.usersByName(req.params.name, users);
    usersTarget = usersTarget.map((user) => {
        const { firstName, lastName } = user;
        return {
            firstName,
            lastName,
        };
    });
    const response = get.response(usersTarget);
    console.log(response);
    response.status == 404
        ? res.status(404).json(response)
        : res.json(response);
}

function store(req, res) {}

function update(req, res) {}

function modify(req, res) {}

function destroy(req, res) {}

module.exports = { index, show, store, update, modify, destroy };
