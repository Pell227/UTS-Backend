module.exports = (inventory) => {
    const createInventory = async(data) => {
        return await inventory.createInventory(data);
    };

    const findAllInventory = async() => {
        return await inventory.findAllInventory();
    };

    const findById = async(id) => {
        return await inventory.findById(id);
    };

    const updateInventory = async(id, data) => {
        return await inventory.updateInventory(data, {
            where: { InvenId: id }
        });
    };

    const removeInventory = async(id) => {
        return await inventory.remove({
            where: { InvenId: id }
        });
    };

    return {
        createInventory,
        findAllInventory,
        findById,
        updateInventory,
        removeInventory
    };
};