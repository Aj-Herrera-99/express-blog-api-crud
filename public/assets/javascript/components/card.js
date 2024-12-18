import * as dom from "../config/domElements.js";
import * as glob from "../config/globals.js";
import { deleteData, postData } from "./api.js";

export function buildNoteFrom({ id, titolo, immagine }) {
    return `<figure class="note d-flex flex-wrap" id="${id}" albumid="${id}">
                    <div class="pin"><img src="./assets/img/pin.svg" alt="pin"></div>
                    <img class="note-image" src="${immagine}" alt="img" loading="lazy">
                    <figcaption class="d-flex items-center text-capitalize">${titolo}</figcaption>
                </figure>   `;
}

export function focusNote(target) {
    document.body.classList.toggle(dom.layover);
    target.classList.toggle(dom.modal);
    target.classList.toggle(dom.hideParent);
    target.querySelector(dom.pinClass).classList.toggle(dom.dNone);
    target.querySelector(dom.figcaptionTag).classList.toggle(dom.dNone);
}
// TODO: dataSaved da rimuovere, usare solo la lista originale (del server)
export async function addNewNote(newData) {
    const myData = await postData(
        newData,
        glob._URL + glob._RESOURCE,
        glob.dataSaved
    );
    let template = myData.map((data) => buildNoteFrom({ ...data }));
    dom.$notesWrapper.insertAdjacentHTML("beforeend", template.join(""));
    if (dom.$notesWrapper.childElementCount) {
        dom.$notesWrapper.lastElementChild.scrollIntoView();
    }
}

export function removeNote(target) {
    const indexElRemove = glob.dataSaved.findIndex((el) => el.id == target.id);
    if (indexElRemove !== -1) {
        deleteData(glob._URL + glob._RESOURCE, target.id);
        glob.dataSaved.splice(indexElRemove, 1);
        console.log(glob.dataSaved);
        target.remove();
    }
}
