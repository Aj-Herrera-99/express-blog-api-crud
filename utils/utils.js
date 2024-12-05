const { writeFile } = require("fs");
/* 
TODO: separare in sottocartelle le funzioni in base alla logica
TODO: esempio: getters, setters, filesystem, utils
*/

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
    compareStrings,
    overrideDB,
    filterStrict,
    filterLight,
    convertElementsToStrLCase,
    convertToSortedArr,
};
