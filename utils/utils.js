const { writeFile } = require("fs");

function getDataIndexById(idTarget, data) {
    return data.findIndex((obj) => obj.id == idTarget);
}

function getDataById(idTarget, data) {
    return data.find((obj) => obj.id == idTarget);
}

function getResponse(data) {
    let response = {
        status: 404,
    };
    if (data) {
        console.log("test");
        response.status = 200;
        response.data = [].concat(data);
        response.totalCount = response.data.length;
    }
    return response;
}

function overrideDB(pathDB, data, replacer, space) {
    writeFile(
        pathDB,
        JSON.stringify(data, replacer, space),
        (error, result) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log("Scrittura asincrona completata");
        }
    );
}

function filterData(req, list) {
    const query = req.query;
    const keyTarget = Object.keys(query)[0];
    // query string vuota
    if (!Object.keys(query).length) {
        return list;
    }
    // param query string non valida
    if (!Object.keys(list[0]).includes(keyTarget)) {
        return list;
    }
    // key param query string = id
    if (keyTarget === "id") {
        const objTarget = getDataById(query[keyTarget], list);
        return objTarget;
    }
    // key param query string != id MA valida
    let queryValuesArr = convertToSortedArr(query[keyTarget]);
    queryValuesArr = convertElementsToStrLCase(queryValuesArr);
    let arrFiltered = [];
    // filtraggio "pesante"
    if (query["filter"] === "strict") {
        arrFiltered = filterStrict(keyTarget, queryValuesArr, list);
    }
    // filtraggio "leggero"
    else {
        arrFiltered = filterLight(keyTarget, queryValuesArr, list);
    }
    return arrFiltered.length ? arrFiltered : null;
}

function filterStrict(key, queryValues, data) {
    const arrFiltered = data.filter((obj) => {
        let dataTargetArr = convertToSortedArr(obj[key]);
        dataTargetArr = convertElementsToStrLCase(dataTargetArr);
        let isIncludedAll = dataTargetArr.every((val) => {
            return queryValues.includes(val);
        });
        return isIncludedAll;
    });
    return arrFiltered;
}

function filterLight(key, queryValues, data) {
    const arrFiltered = data.filter((obj) => {
        let dataTargetArr = convertToSortedArr(obj[key]);
        dataTargetArr = convertElementsToStrLCase(dataTargetArr);
        let isIncludedSome = queryValues.some((val) => {
            return dataTargetArr.includes(val);
        });
        return isIncludedSome;
    });
    return arrFiltered;
}

function convertElementsToStrLCase(arr) {
    return arr.map((el) => el.toString().toLowerCase());
}

function convertToSortedArr(element) {
    // converto in un array ordinato il parametro passato
    // NB: che sia primitivo o un array, il ritorno è cmq un array ordinato
    return [].concat(element).sort();
}

module.exports = {
    getDataIndexById,
    getDataById,
    getResponse,
    overrideDB,
    filterData,
};
