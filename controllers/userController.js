const users = require("../data/user.json"); // automatic parsing
const utils = require("../utils/utils");

function index(req, res) {
    const dataFiltered = utils.getDataByQuery(req, users);
    const response = utils.getResponse(dataFiltered);
    console.log(response);
    response.status == 404
        ? res.status(404).json(response)
        : res.json(response);
}

function show(req, res) {
    console.log(req.params);
    let usersTarget = getUsersByName(req.params.name, users);
    usersTarget = usersTarget.map((user) => {
        const { firstName, lastName } = user;
        return {
            firstName,
            lastName,
        };
    });
    const response = utils.getResponse(usersTarget);
    console.log(response);
    response.status == 404
        ? res.status(404).json(response)
        : res.json(response);
}
// TODO: spostare funzioni in utils
function getUsersByFirstName(firstName, users) {
    const usersFirstName = users.filter((user) => {
        return user.firstName.toLowerCase().startsWith(firstName.toLowerCase());
    });
    console.log(usersFirstName);
    const usersFirstNameSorted = usersFirstName.sort((a, b) => {
        return compareStrings(a.firstName, b.firstName);
    });
    return usersFirstNameSorted;
}
function getUsersByLastName(lastName, users) {
    const usersLastName = users.filter((user) => {
        return user.lastName.toLowerCase().startsWith(lastName.toLowerCase());
    });
    console.log(usersLastName);
    const usersLastNameSorted = usersLastName.sort((a, b) => {
        return compareStrings(a.lastName, b.lastName);
    });
    return usersLastNameSorted;
}
function getUsersByName(name, users) {
    const usersName = users.filter((user) => {
        return (
            user.firstName.toLowerCase().startsWith(name.toLowerCase()) ||
            user.lastName.toLowerCase().startsWith(name.toLowerCase())
        );
    });
    const usersNameSorted = usersName.sort((a, b) => {
        return compareStrings(a.firstName, b.firstName);
    });
    return usersNameSorted;
}

function compareStrings(str1, str2) {
    let x = str1.toLowerCase();
    let y = str2.toLowerCase();
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
}

function store(req, res) {}

function update(req, res) {}

function modify(req, res) {}

function destroy(req, res) {}

module.exports = { index, show, store, update, modify, destroy };
