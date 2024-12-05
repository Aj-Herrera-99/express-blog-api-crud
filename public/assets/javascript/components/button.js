import * as dom from "../config/domElements.js";
import * as card from "./card.js";
import * as api from "./api.js";
import { getRndInteger as random } from "../utilities/utilities.js";
import * as glob from "../config/globals.js";

export async function addNewNote() {
    // TODO: OBSOLETO -> Le new note non dovrebbero essere prese dal db
    // TODO: ma prese dall'esterno, caricate sul client e poi mandate al server
    let myData = await api.getData(
        glob._URL + glob._RESOURCE,
        {
            id: random(1, 5).toString(),
        },
        glob.dataSaved
    );
    // storing in db
    delete myData[0].id;
    axios
        .post(glob._URL + glob._RESOURCE, myData[0])
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.error(err);
        });

    let template = await myData.map((data) => card.buildNoteFrom({ ...data }));
    dom.$notesWrapper.insertAdjacentHTML("beforeend", template.join(""));
    if (dom.$notesWrapper.childElementCount) {
        dom.$notesWrapper.lastElementChild.scrollIntoView();
    }
}

export function remModeAnim(makeRemMode) {
    if (makeRemMode) {
        dom.$removeBtn.innerText = "Clicca sulla polaroid da rimuovere";
        dom.$main.style.marginTop = "0px";
    } else {
        dom.$removeBtn.innerText = "Rimuovi una polaroid!";
        dom.$main.style.removeProperty("margin-top");
    }
    // transizioni su remove btn
    dom.$removeBtn.disabled = makeRemMode;
    dom.$removeBtn.classList.toggle(dom.disabled);
    // transizioni su add btn
    dom.$addBtn.classList.toggle(dom.dNone);
    // transizioni su escRem btn
    dom.$escRemoveBtn.classList.toggle(dom.dNone);
    // transizioni su header e main
    dom.$header.classList.toggle(dom.dNone);
    for (let note of dom.$notesWrapper.children) {
        note.classList.toggle("constant-tilt-shake");
    }
}
