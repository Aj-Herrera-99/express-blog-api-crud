import * as dom from "../config/domElements.js";
import * as glob from "../config/globals.js";
import * as api from "../components/api.js";
import * as card from "../components/card.js";
import * as btn from "../components/button.js";
import * as utils from "../utilities/utilities.js";
// import form from "../components/addForm.js";

// modalita remove, default false
let remMode = false;
// modalita finestra, default false
let modalMode = false;

// Immediately Invoked Function Expressions (IIFE) to execute async await
// Caricamento elementi starter della pagina
(async function () {
    // dati presi da una chiamata ajax
    let myData = await api.getData(
        glob._URL + glob._RESOURCE,
        glob._PARAMS,
        glob.dataSaved
    );
    let templates = await myData.map((data) => card.buildNoteFrom({ ...data }));
    dom.$notesWrapper.insertAdjacentHTML("beforeend", templates.join(""));
    // loader animation
    document.body.classList.remove(dom.layover);
    document.querySelector(dom.loaderClass).classList.remove(dom.active);
})();

// Event delegation a main riguardo il click
dom.$main.addEventListener("click", function (e) {
    // se target è la note fai questo
    if (e.target.closest(dom.noteClass)) {
        console.log("note");
        let note = e.target.closest(dom.noteClass);
        // fai focus sulla card se non e attivo remMode
        if (!remMode) {
            modalModeAnim(note);
        } else {
            // se remMode è attivo, rimuovi card
            card.removeNote(note);
        }
    }
    // se target è add btn fai questo
    if (e.target.id === dom.addBtnId) {
        console.log("add btn");
        // aggiungi note
        // btn.addNewNote();
        const addForm = document.getElementById("add-form");
        addForm.classList.remove("d-none");
        addForm.scrollIntoView();
    }
    // se target è remove btn fai questo
    if (e.target.id === dom.removeBtnId) {
        console.log("remove btn");
        // attiva remMode
        remMode = !remMode;
        btn.remModeAnim(remMode);
    }
    // se target è escRemove btn fai questo
    if (e.target.id === dom.escRemoveBtnId) {
        console.log("escRemove btn");
        // disattiva remMode
        remMode = !remMode;
        btn.remModeAnim(remMode);
    }
    return;
});

// add note form submit event
dom.$addForm.addEventListener("submit", function (e) {
    console.log("add form");
    e.preventDefault();
    uploadFiles();
    this.classList.add(dom.dNone);

    function uploadFiles() {
        const url = "http://localhost:3000/api";
        const formData = new FormData(dom.$addForm);
        const fetchOptions = {
            method: "post",
            body: formData, //automatic encoding to enctype="multipart/form-data"
        };
        // upload dell'immagine ../api come path
        fetch(url, fetchOptions)
            .then((res) => res.json())
            .then((data) => {
                // la risposta è un json contenente la path dell'immagine uploadata sul server
                const immagine = data.path;
                const titolo = document.getElementById("titolo").value;
                const contenuto = document.getElementById("contenuto").value;
                const tags = document.getElementById("tags").value;
                const newData = {
                    titolo,
                    contenuto,
                    immagine,
                    tags,
                };
                card.addNewNote(newData);
                document.getElementById("immagine").value = "";
                document.getElementById("titolo").value = "";
                document.getElementById("contenuto").value = "";
                document.getElementById("tags").value = "";
            });
    }
});

// popup modal click event
dom.$popupModalBtn.addEventListener("click", function (e) {
    console.log("popupModal btn");
    modalModeAnim(document.querySelector("." + dom.modal));
});

// window keyup event (only for ESC)
window.addEventListener("keyup", function (e) {
    if (e.key === "Escape" && modalMode) {
        console.log("Escape key");
        modalModeAnim(document.querySelector("." + dom.modal));
    }
});

function modalModeAnim(targetFocused) {
    modalMode = !modalMode;
    card.focusNote(targetFocused);
    utils.popupAnim(dom.$popupModalBtn, modalMode);
}
