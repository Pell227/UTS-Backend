module.exports = (db) => {
    const Transactions = db.define("transactions", {
        order_id: {
            type: String,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        item_name: {
            type : String,
            required : true
        },
        amount: {
            type : Number,
            required : true
        },
        tax: {
            type: Number,
            required : true
        },
        status: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true___
        }
    });
    return Transactions;
}