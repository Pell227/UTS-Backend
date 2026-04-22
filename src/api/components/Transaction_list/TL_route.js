const express = require('express');

const TLcontroller = require('./TL_controller');

const router = express.Router();

module.exports = (app) => {
    app.use("/transaction-lists", router);

    router.get("/", TLcontroller.getAllList);
    router.get("/:id", TLcontroller.getListById);
    router.post("/", TLcontroller.createList);
    router.put("/:id", TLcontroller.updateList);
    router.delete("/:id", TLcontroller.deleteList);
};