// src/models/user.model.js
const mongoose = require("mongoose");
const crypto   = require("crypto");

const userSchema = new mongoose.Schema(
    {
        nama: {
            type:String,
            required:[true],
            trim:true,
            
        },
        username: {
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            match:[/^[a-zA-Z0-9_]+$/],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            maxlength: [100, "Email maksimal 100 karakter"],
            match: [/^\S+@\S+\.\S+$/, "Format email tidak valid"],
        },
        password: {
            type:String,
            required:[true, "Password tidak boleh kosong"],
            select:false,
        },
        status:{
            type: String,
            enum: {
                values: ["karyawan", "supervisor", "admin"],
                message:"Status harus: karyawan, supervisor, atau admin",
            },
            default:  "karyawan",
            required: true,
        },
        isActive:{ type: Boolean, default: true  },
        isApproved:{ type: Boolean, default: false },
        nip:{ type: String,  
                default: null, 
                sparse: true,
                primaryKey: true, },
        noHp: {
            type:      String,
            default:   null,
            maxlength: [15, "Nomor HP maksimal 15 karakter"],
            match:     [/^[0-9+\-\s]*$/, "Format nomor HP tidak valid"],
        },
        lastLoginAt:       { type: Date,   default: null },
        lastLoginIp:       { type: String, default: null },
        loginAttempts:     { type: Number, default: 0    },
        lockedUntil:       { type: Date,   default: null },
        refreshToken:      { type: String, default: null, select: false },
        passwordChangedAt: { type: Date,   default: null },
        approvedBy:        { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        approvedAt:        { type: Date,   default: null },
    },
    {
        timestamps: true,
        collection: "users",
        toJSON:     { virtuals: true },
        toObject:   { virtuals: true },
    }
);



userSchema.methods.toSafeJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.refreshToken;
    delete obj.loginAttempts;
    delete obj.lockedUntil;
    delete obj.lastLoginIp;
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
};

module.exports = mongoose.model("User", userSchema);