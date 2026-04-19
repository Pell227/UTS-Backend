// src/repositories/auth.repository.js
const User     = require("../models/user.model");
const AuditLog = require("../models/auditLog.model");
const logger   = require("../utils/logger");

class AuthRepository {
    async findByUsernameOrEmail(identifier) {
        const lower = identifier.toLowerCase();
        return User.findOne({ $or: [{ username: lower }, { email: lower }] })
            .select("+password +refreshToken +loginAttempts +lockedUntil");
    }

    async findById(id) {
        return User.findById(id).select("+password +refreshToken");
    }

    async findByRefreshToken(token) {
        return User.findOne({ refreshToken: token }).select("+refreshToken");
    }

    async isUsernameTaken(username, excludeId = null) {
        const query = { username: username.toLowerCase() };
        if (excludeId) query._id = { $ne: excludeId };
        return (await User.countDocuments(query)) > 0;
    }

    async isEmailTaken(email, excludeId = null) {
        const query = { email: email.toLowerCase() };
        if (excludeId) query._id = { $ne: excludeId };
        return (await User.countDocuments(query)) > 0;
    }

    async isNipTaken(nip, excludeId = null) {
        if (!nip) return false;
        const query = { nip };
        if (excludeId) query._id = { $ne: excludeId };
        return (await User.countDocuments(query)) > 0;
    }

    async countUsers() {
        return User.countDocuments();
    }

    async createUser(data) {
        const user = new User(data);
        await user.save();
        return user;
    }

    async updateRefreshToken(userId, token) {
        return User.findByIdAndUpdate(userId, { refreshToken: token }, { new: true });
    }

    async clearRefreshToken(userId) {
        return User.findByIdAndUpdate(userId, { refreshToken: null });
    }

    async updateLastLogin(userId, ip) {
        return User.findByIdAndUpdate(
            userId,
            { lastLoginAt: new Date(), lastLoginIp: ip, loginAttempts: 0, lockedUntil: null },
            { new: true }
        );
    }

    async approveUser(userId, approverId) {
        return User.findByIdAndUpdate(
            userId,
            { isApproved: true, approvedBy: approverId, approvedAt: new Date() },
            { new: true }
        );
    }
    
    async rejectUser(userId) {
        return User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
    }

    async getPendingUsers() {
        return User.find({ isApproved: false, isActive: true })
            .sort({ createdAt: 1 })
            .select("-password -refreshToken -loginAttempts -lockedUntil -lastLoginIp");
    }

    async getAllUsers({ page = 1, limit = 20, status = null, search = null } = {}) {
        const filter = {};
        if (status) filter.status = status;
        if (search) {
            filter.$or = [
                { nama:{ $regex: search, $options: "i" } },
                { username:{ $regex: search, $options: "i" } },
                { email:{ $regex: search, $options: "i" } },
            ];
        }

        const [total, users] = await Promise.all([
            User.countDocuments(filter),
            User.find(filter)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .select("-password -refreshToken -loginAttempts -lockedUntil -lastLoginIp"),
        ]);

        return { users, total, page, totalPages: Math.ceil(total / limit) };
    }

    async createAuditLog({ userId, action, detail, ipAddress, userAgent, username }) {
        try {
            return AuditLog.create({ userId, action, detail, ipAddress, userAgent, username });
        } catch (err) {
            logger.error("Gagal simpan audit log:", err);
        }
    }

    async getAuditLogs(userId, limit = 50) {
        return AuditLog.find({ userId })
            .sort({ createdAt: -1 })
            .limit(limit);
    }
}

module.exports = new AuthRepository();