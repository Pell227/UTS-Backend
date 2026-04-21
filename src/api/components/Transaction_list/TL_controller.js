const TLservice = require('./TL_service')

const createList = async (req, res) => {
    try {
        const list = await TLservice.createlist(req.body);
        res.status(201).json(list);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllList = async (req, res) => {
    try {
        const lists = await TLservice.getAllList(req.query);
        res.status(200).json(lists);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getListById = async (req, res) => {
    try {
        const list = await TLservice.getListById(req.params.id);
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateList = async (req, res) => {
    try {
        const updatedList = await TLservice.updateList(req.params.id, req.body);
        res.status(200).json(updatedList);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteList = async (req, res) => {
    try {
        await TLservice.deleteList(req.params.id);
        res.status(200).json({ message: "Transaction list deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createList,
    getAllList,
    getListById,
    updateList,
    deleteList
};