const express = require("express");
const {
    index,
    show,
    store,
    update,
    modify,
    destroy,
} = require("../controllers/userController");
const router = express.Router();

// index
router.get("/", index);

// show
router.get("/:name", show);

// store
router.post("/", store);

// update
router.put("/:id", update);

// modify
router.patch("/:id", modify);

// destroy
router.delete("/:id", destroy);

module.exports = router;
