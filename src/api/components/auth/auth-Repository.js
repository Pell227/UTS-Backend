const { Op } = require("sequelize");
const { User, AuditLog } = require("../models");
const logger = require("../utils/logger");
 
class AuthRepository {
  // USER QUERIES
 
    //Cari user berdasarkan username atau email (untuk login)  
  async findByUsernameOrEmail(identifier) {
    return User.findOne({
      where: {
        [Op.or]: [
          { username: identifier.toLowerCase() },
          { email: identifier.toLowerCase() },
        ],
      },
    });
  }
 
  
    //Cari user berdasarkan ID
   
  async findById(id) {
    return User.findByPk(id);
  }
 
  
   // Cari user berdasarkan refresh token
   
  async findByRefreshToken(token) {
    return User.findOne({ where: { refreshToken: token } });
  }
 
  
   // Cek apakah username sudah ada
   
  async isUsernameTaken(username, excludeId = null) {
    const where = { username: username.toLowerCase() };
    if (excludeId) where.id = { [Op.ne]: excludeId };
    const count = await User.count({ where });
    return count > 0;
  }
 
  
  //  Cek apakah email sudah ada
   
  async isEmailTaken(email, excludeId = null) {
    const where = { email: email.toLowerCase() };
    if (excludeId) where.id = { [Op.ne]: excludeId };
    const count = await User.count({ where });
    return count > 0;
  }
 
  
   // Cek apakah NIP sudah ada
   
  async isNipTaken(nip, excludeId = null) {
    if (!nip) return false;
    const where = { nip };
    if (excludeId) where.id = { [Op.ne]: excludeId };
    const count = await User.count({ where });
    return count > 0;
  }
 
  
   //Hitung jumlah user yang ada (untuk bootstrap admin pertama)
   
  async countUsers() {
    return User.count();
  }
 
  //USER MUTATIONS
 
  
   //Buat user baru
   
  async createUser(data) {
    return User.create(data);
  }
 
  
   // Update refresh token user
   
  async updateRefreshToken(userId, token) {
    return User.update({ refreshToken: token }, { where: { id: userId } });
  }
 
  
   // Update data last login
   
  async updateLastLogin(userId, ip) {
    return User.update(
      {
        lastLoginAt: new Date(),
        lastLoginIp: ip,
        loginAttempts: 0,
        lockedUntil: null,
      },
      { where: { id: userId } }
    );
  }
 
  
    //Hapus refresh token (logout)
   
  async clearRefreshToken(userId) {
    return User.update({ refreshToken: null }, { where: { id: userId } });
  }
 
  
   //Approve registrasi user
   
  async approveUser(userId, approverId) {
    return User.update(
      {
        isApproved: true,
        approvedBy: approverId,
        approvedAt: new Date(),
      },
      { where: { id: userId } }
    );
  }
 
  
   //Reject / nonaktifkan user
   
  async rejectUser(userId) {
    return User.update({ isActive: false }, { where: { id: userId } });
  }
 
  
   // Ambil daftar user pending approval
   
  async getPendingUsers() {
    return User.findAll({
      where: { isApproved: false, isActive: true },
      attributes: { exclude: ["password", "refreshToken"] },
      order: [["createdAt", "ASC"]],
    });
  }
 
  
   //Ambil semua user (untuk supervisor/admin)
   
  async getAllUsers({ page = 1, limit = 20, status = null, search = null } = {}) {
    const where = {};
    if (status) where.status = status;
    if (search) {
      where[Op.or] = [
        { nama: { [Op.like]: `%${search}%` } },
        { username: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }
 
    const { count, rows } = await User.findAndCountAll({
      where,
      attributes: { exclude: ["password", "refreshToken"] },
      order: [["createdAt", "DESC"]],
      limit,
      offset: (page - 1) * limit,
    });
 
    return {
      users: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    };
  }
 
  //AUDIT LOG
 
 //simpan logg aktivitas
  async createAuditLog({ userId, action, detail, ipAddress, userAgent, username }) {
    try {
      return AuditLog.create({
        userId,
        action,
        detail,
        ipAddress,
        userAgent,
        username,
      });
    } catch (err) {
      logger.error("Gagal menyimpan audit log:", err);
    }
  }
 
  //ambil audit user
  async getAuditLogs(userId, limit = 50) {
    return AuditLog.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit,
    });
  }
}
 
module.exports = new AuthRepository();