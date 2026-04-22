module.exports = (db) => {
    const Inventory = db.define('inventory', {
        InvenId : {
            type : Number,
            require : true
        },
        nameI : {
            type : String,
            require : true
        },
        stock : {
            type : Number,
            require : true
        },
        statusI : {
            type : String,
            require : true
        },
    });
    return Inventory;
};