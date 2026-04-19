const inventory_controller = require('./inventory_controller');
const express = require('express');

module.exports = (inventory_controller) => {
    const router = express.Router();

    router.post('/', inventoryController.createInventory);
    router.get('/', inventoryController.findAllInventory);
    router.get('/:id', inventoryController.findOne);
    router.put('/:id', inventoryController.updateInventory);
    router.delete('/:id', inventoryController.removeInventory);

    return router;
};