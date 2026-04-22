const service = require("./promo_service");
const { errorTypes, errorResponder } = require("../../../core/error");

// GET ALL
const getPromos = async (req, res, next) => {
  try {
    const data = await service.getPromos();
    res.json(data);
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

// GET BY ID
const getPromoById = async (req, res, next) => {
  try {
    const data = await service.getPromoById(req.params.id);

    if (!data) {
      return next(errorResponder(errorTypes.NOT_FOUND, "Promo not found"));
    }

    res.json(data);
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

// CREATE
const createPromo = async (req, res, next) => {
  try {
    const data = await service.createPromo(req.body);
    res.status(201).json(data);
  } catch (error) {
    return next(errorResponder(errorTypes.BAD_REQUEST, error.message));
  }
};

// UPDATE
const updatePromo = async (req, res, next) => {
  try {
    const data = await service.updatePromo(req.params.id, req.body);

    if (!data) {
      return next(errorResponder(errorTypes.NOT_FOUND, "Promo not found"));
    }

    res.json(data);
  } catch (error) {
    return next(errorResponder(errorTypes.BAD_REQUEST, error.message));
  }
};

// DELETE
const deletePromo = async (req, res, next) => {
  try {
    const data = await service.deletePromo(req.params.id);

    if (!data) {
      return next(errorResponder(errorTypes.NOT_FOUND, "Promo not found"));
    }

    res.json({ message: "Promo deleted" });
  } catch (error) {
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};

// APPLY PROMO
const applyPromo = async (req, res, next) => {
  try {
    const { code, amount } = req.body;

    const result = await service.applyPromo(code, amount);

    res.json(result);
  } catch (error) {
    return next(errorResponder(errorTypes.BAD_REQUEST, error.message));
  }
};

module.exports = {
  getPromos,
  getPromoById,
  createPromo,
  updatePromo,
  deletePromo,
  applyPromo,
};
