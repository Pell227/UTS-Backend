const inventory_repository = require("./inventory_repository");

module.exports = (inventory_repository) => {
    
    const createInventory = async(data) => {
        if(!data.InvenId || !data.nameI || !data.stock || !data.statusI) {
            throw new Error("Semua field wajib diisi");
        }
        return await inventory_repository.createe(data);
    };

    const getAllInventory = async() => {
        return await inventory_repository.findAllInventory();
    };

    const getInventoryById = async(id) => {
        const data = await inventory_repository.findById(id);
        if(!data) throw new Error("Barang tidak ditemukan !");
        return data;
    };

    const updateInventory = async(id, data) => {
        await inventory_repository.update(id, data);
        return await inventory_repository.findById(id);
    };

    const deleteInventory = async(id) => {
        return await inventory_repository.removeInventory(id);
    };

    return {
        createInventory,
        getAllInventory,
        getInventoryById,
        updateInventory,
        deleteInventory
    }
}