const utils = require("./utils");

function response(data) {
    let response = {
        status: 404,
    };
    if (!data) return response;
    data = [].concat(data);
    if (!data.length) return response;
    const status = 200;
    const myData = [...data];
    const totalCount = myData.length;
    response = {
        status: status,
        totalCount: totalCount,
        data: myData,
    };
    return response;
}

function dataIndexById(idTarget, data) {
    return data?.findIndex((obj) => obj.id == idTarget);
}

function dataById(idTarget, data) {
    return data?.find((obj) => obj.id == idTarget);
}

function usersByFirstName(firstName, users) {
    const usersFirstName = users.filter((user) => {
        return user.firstName.toLowerCase().startsWith(firstName.toLowerCase());
    });
    console.log(usersFirstName);
    const usersFirstNameSorted = usersFirstName.sort((a, b) => {
        return utils.compareStrings(a.firstName, b.firstName);
    });
    return usersFirstNameSorted;
}

function usersByLastName(lastName, users) {
    const usersLastName = users.filter((user) => {
        return user.lastName.toLowerCase().startsWith(lastName.toLowerCase());
    });
    console.log(usersLastName);
    const usersLastNameSorted = usersLastName.sort((a, b) => {
        return utils.compareStrings(a.lastName, b.lastName);
    });
    return usersLastNameSorted;
}

function usersByName(name, users) {
    const usersName = users.filter((user) => {
        return (
            user.firstName.toLowerCase().startsWith(name.toLowerCase()) ||
            user.lastName.toLowerCase().startsWith(name.toLowerCase())
        );
    });
    const usersNameSorted = usersName.sort((a, b) => {
        return utils.compareStrings(a.firstName, b.firstName);
    });
    return usersNameSorted;
}

function dataByQuery(queryObj, list) {
    const keyTarget = Object.keys(queryObj)[0];
    // lista non definita oppure lista vuota
    if (!list || !list.length) {
        return null;
    }
    // query string vuota
    if (!Object.keys(queryObj).length) {
        return list;
    }
    // param query string non valida
    if (!Object.keys(list[0]).includes(keyTarget)) {
        return null;
    }
    // key param query string = id
    if (keyTarget === "id") {
        const objTarget = dataById(queryObj[keyTarget], list);
        return objTarget;
    }
    // da qui in poi -> key param query string != id MA valida
    // array ordinato dei valori del primo param di query string
    let queryValuesArr = utils.convertToSortedArr(queryObj[keyTarget]);
    // elementi array convertiti in stringhe lowercase
    queryValuesArr = utils.convertElementsToStrLCase(queryValuesArr);
    // inizializzazione dati filtrati (default zero)
    let arrFiltered = [];
    // filtraggio "pesante"
    if (queryObj["filter"] === "strict") {
        arrFiltered = utils.filterStrict(keyTarget, queryValuesArr, list);
    }
    // filtraggio "leggero"
    else {
        arrFiltered = utils.filterLight(keyTarget, queryValuesArr, list);
    }
    // se la ricerca ha prodotto zero risultati ritorna null
    return arrFiltered.length ? arrFiltered : null;
}

function currMaxId(data) {
    const objsId = data?.map((obj) => obj.id);
    if(!objsId || !objsId.length) return;
    return objsId?.reduce((prev, next) => {
        return prev < next ? next : prev;
    });
}

module.exports = {
    currMaxId,
    dataByQuery,
    usersByName,
    usersByLastName,
    usersByFirstName,
    dataById,
    dataIndexById,
    response,
};
