const {DataType} =require("sequelize");
const bcrypt = require("bcryptjs");
const {sequelize} = require(".../config/database");

const User = sequelize.define(
    "User",
    {
        id:{
            type: dataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nama:{
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                nptEmpty: { msg: "Nama tidak boleh kosong"},
                len: { args: [2, 50], msg: "Nama harus antara 2 - 50 karakter"},
            },
        },
        username: {
            type: DataType.STRING(50),
            allowNull: false,
            unique: { msg: "Username sudah digunakan"},
            validate: {
                notEmpty: { msg: "Username tidak boleh kosong"},
                len: { args: [3, 50], massage:"User harus antara 3 - 50 karakter"},
                is: {
                    args: /^[a-zA-Z0-9_]+$/,
                    massage: "Username hanya boleh huruf, angka, dan underscore",
                },
            },
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: { massage: " Email sudah terdaftar "},
            validate: {
                isEmail: { massage: "Format email tidak valid"},
                notEmpty: { massage: "Email tidak boleh kosong"},
            },
        },
        password: {
            type: DataType.STRING(300),
            allowNull: false,
            validate: {
                notEmpty: { massage: "Password tidak boleh kosong"},
            },
        },
        status: {
            type: DataType.ENUM("karyawan","supervisor","admin"),
            allowNull: false,
            defaultValue: "karyawan",
            validate: {
                isIn: {
                    args: [["karyawan", "supervisor", "admin"]],
                    massage: "Status harus: karyawan, supervisor, atau admin",
                },
            },
        },
        isActive: {
            type: DataType.BOOLEAN,
            defaultValue: true,
            comment: "Akun bisa dinonaktifkan admin atau supervisor",
        },

        isApproved: {
            type: DataType.BOOLEAN,
            defaultValue: false,
            comment: "HArus diapprove admin/supervisor",
        },
        nip: {
            type: DataType.STRING(20),
            allowNull: true,
            validate: {
                is: {
                    args: /^[a-zA-Z0-9_]+$/,
                    massage: "Format nomor HP tidak valid",
                },
            },
        },
        lastLoginAt: {
            type: DataType.DATE,
            allowNull:true,
        },
        lastLoginUp: {
            type: dataTypes.STRING(45),
            allowNull: true,
        },
        loginAttemps: {
            type: DataType.INTEGER,
            defaultValue: 0,
        },
        lockedUntil: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Akun terkunci sampai waktu ini, jika terlalu banyak percobaan login",
        },
        refreshToken: {
            type: DataType.TEXT,
            allowNull: true,
        },
        passwordChangedAt: {
            type: DataType.DATE,
            allowNull: true,
        },
        approvedBy: {
            type: DataTypess.UUID,
            allowNull: true,
            references: {
                model: "Users",
                key: "id",
            },
        },
        approvedAt: {
            type: DataType.DATE,
            allowNull: true,
        },
    },

    {
        tableName: "users",
        hooks: {
            //Hash password sebelum create
            beforeCreate: async (user) => {
                if(user.password) {
                    const rounds = parseInt(process.env.BCRYPT_ROUND) || 12;
                    user.password = await bcrypt.hash(user.password, rounds);
                }
                user.username = user.username.toLowerCase();
                user.email = user.email.toLowerCase();
            },
            //hash password sebelum update (Jika berubah)
            beforeupdate: async (user) => {
                if(user.changed("password")) {
                    const rounds = parseInt(process.env.BCRYPT_ROUND) || 12;
                    user.password = await bcrypt.hash(user.password, rounds);
                    user.passwordChangedAt = new Date();
                }
                if (user.changed("username")) {
                    user.username = user.username.toLowerCase();
                }
                if (user.changed("Email")) {
                    user.email = user.email.toLowerCase();
                }
            },
        },
    }
);


// Instance methods
User.prototype.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
};

User.prototype.isLocked = function (){
    if (!this.lockedUntil) return false;
    return this.lockedUntil > new Date();
};

User.prototype.incrementLoginAttempts = async function(){
    const MAX_ATTEMPTS = 5;
    const LOCK_MINUTES = parseInt(process.env.LOGIN_WINDOW_MINUTES) || 15;

    this.loginAttemps += 1;
    if (this.loginAttempts >= MAX_ATTEMPTS){
        this.lockeddUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
    }
    await this.save();
};

User.prototype.resetLoginAttempts = async function(){
    this.loginAttempts = 0;
    this.lockedUntil = null;
    await this.save();
};

User.prototype.toSafeJSON = function (){
    const { password, refreshToken, loginAttempts, lockedUntil, lastLoginIp, ...safe} =
    this.toJSON();
    return safe;
};

module.exports = User;

