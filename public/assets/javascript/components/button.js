import * as dom from "../config/domElements.js";

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
