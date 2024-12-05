const { writeFile } = require("fs");
/* 
TODO: separare in sottocartelle le funzioni in base alla logica
TODO: esempio: getters, setters, filesystem, utils
*/ 
function getDataIndexById(idTarget, data) {
    return data?.findIndex((obj) => obj.id == idTarget);
}

function getDataById(idTarget, data) {
    return data?.find((obj) => obj.id == idTarget);
}

function getResponse(data) {
    let response = {
        status: 404,
    };
    if (!data) return response;
    if (!Object.keys(data).length) return response;
    const status = 200;
    const myData = [].concat(data);
    const totalCount = myData.length;
    response = {
        status: status,
        totalCount: totalCount,
        data: myData,
    };
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

function getDataByQuery(req, list) {
    const query = req.query;
    const keyTarget = Object.keys(query)[0];
    // lista non definita oppure lista vuota
    if (!list || !list.length) {
        return null;
    }
    // query string vuota
    if (!Object.keys(query).length) {
        return list;
    }
    // param query string non valida
    if (!Object.keys(list[0]).includes(keyTarget)) {
        return null;
    }
    // key param query string = id
    if (keyTarget === "id") {
        const objTarget = getDataById(query[keyTarget], list);
        return objTarget;
    }
    // da qui in poi -> key param query string != id MA valida
    // array ordinato dei valori del primo param di query string
    let queryValuesArr = convertToSortedArr(query[keyTarget]);
    // elementi array convertiti in stringhe lowercase
    queryValuesArr = convertElementsToStrLCase(queryValuesArr);
    // inizializzazione dati filtrati (default zero)
    let arrFiltered = [];
    // filtraggio "pesante"
    if (query["filter"] === "strict") {
        arrFiltered = filterStrict(keyTarget, queryValuesArr, list);
    }
    // filtraggio "leggero"
    else {
        arrFiltered = filterLight(keyTarget, queryValuesArr, list);
    }
    // se la ricerca ha prodotto zero risultati ritorna null
    return arrFiltered.length ? arrFiltered : null;
}

function getCurrMaxId(data){
    const objsId = data.map(obj => obj.id)
    return objsId.reduce((prev, next) => {
        return prev < next ? next : prev;
    })
}  

function filterStrict(key, queryValues, data) {
    const arrFiltered = data?.filter((obj) => {
        // per ogni obj dell array di dati, crea un array ordinato dei values della key target
        let dataTargetArr = convertToSortedArr(obj[key]);
        // elementi array convertiti in stringhe lowercase
        dataTargetArr = convertElementsToStrLCase(dataTargetArr);
        // se OGNI valore di un elemmnto dell'array è inclusa tra i valori della query
        // ritorna true e l'obj viene pushato nell'array filtrato
        let isIncludedAll = dataTargetArr.every((val) => {
            return queryValues.includes(val);
        });
        return isIncludedAll;
    });
    return arrFiltered;
}

function filterLight(key, queryValues, data) {
    const arrFiltered = data?.filter((obj) => {
        let dataTargetArr = convertToSortedArr(obj[key]);
        dataTargetArr = convertElementsToStrLCase(dataTargetArr);
        // se anche SOLO UN valore della query è incluso tra i valori di un elemento dell'array
        // ritorna true e l'obj viene pushato nell'array filtrato
        let isIncludedSome = queryValues.some((val) => {
            return dataTargetArr.includes(val);
        });
        return isIncludedSome;
    });
    return arrFiltered;
}

function convertElementsToStrLCase(arr) {
    return arr?.map((el) => el.toString().toLowerCase());
}

function convertToSortedArr(element) {
    // converto in un array ordinato il parametro passato
    // NB: che sia primitivo o un array, il ritorno è cmq un array piatto ordinato
    return [].concat(element).sort();
}

module.exports = {
    getDataIndexById,
    getDataById,
    getResponse,
    overrideDB,
    getDataByQuery,
    getCurrMaxId
};
