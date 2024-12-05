import * as dom from "../config/domElements.js";
import * as glob from "../config/globals.js";

export function buildNoteFrom({ id, titolo, immagine }) {
    return `<figure class="note d-flex flex-wrap" id="${id}" albumid="${id}">
                    <div class="pin"><img src="./assets/img/pin.svg" alt="pin"></div>
                    <img class="note-image" src="${immagine}" alt="img" loading="lazy">
                    <figcaption class="d-flex items-center text-capitalize">${titolo}</figcaption>
                </figure>   `;
}

export function addNewNote(newData) {
    axios
        .post(glob._URL + glob._RESOURCE, newData)
        .then((res) => {
            return res.data.data;
        })
        .then((data) => {
            data.forEach((data) => glob.dataSaved.push(data));
            console.log(glob.dataSaved);
            let template = data.map((data) => buildNoteFrom({ ...data }));
            dom.$notesWrapper.insertAdjacentHTML(
                "beforeend",
                template.join("")
            );
            if (dom.$notesWrapper.childElementCount) {
                dom.$notesWrapper.lastElementChild.scrollIntoView();
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

export function focusNote(target) {
    document.body.classList.toggle(dom.layover);
    target.classList.toggle(dom.modal);
    target.classList.toggle(dom.hideParent);
    target.querySelector(dom.pinClass).classList.toggle(dom.dNone);
    target.querySelector(dom.figcaptionTag).classList.toggle(dom.dNone);
}

export function removeNote(target) {
    const indexElRemove = glob.dataSaved.findIndex((el) => el.id == target.id);
    if (indexElRemove !== -1) {
        axios
            .delete(glob._URL + glob._RESOURCE + `/${target.id}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
        glob.dataSaved.splice(indexElRemove, 1);

    }
    console.log(glob.dataSaved);
    target.remove();
}
