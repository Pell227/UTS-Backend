const supplierService = require("./supplier_service");
const { errorTypes, errorResponder } = require("../../../core/error");

// GET ALL
async function getAllSuppliers(req, res, next) {
  try {
    const suppliers = await supplierService.getSuppliers();
    res.json(suppliers);
  } catch (error) {
    return next(
      errorResponder(errorTypes.SERVER, error.message)
    );
  }
}

// GET BY ID
async function getSupplierById(req, res, next) {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id);

    if (!supplier) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Supplier not found")
      );
    }

    res.json(supplier);
  } catch (error) {
    return next(
      errorResponder(errorTypes.SERVER, error.message)
    );
  }
}

// CREATE
async function createSupplier(req, res, next) {
  try {
    const newSupplier = await supplierService.createSupplier(req.body);
    res.status(201).json(newSupplier);
  } catch (error) {
    return next(
      errorResponder(errorTypes.BAD_REQUEST, error.message)
    );
  }
}

// UPDATE
async function updateSupplier(req, res, next) {
  try {
    const updatedSupplier = await supplierService.updateSupplier(
      req.params.id,
      req.body
    );

    if (!updatedSupplier) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Supplier not found")
      );
    }

    res.json(updatedSupplier);
  } catch (error) {
    return next(
      errorResponder(errorTypes.BAD_REQUEST, error.message)
    );
  }
}

// DELETE
async function deleteSupplier(req, res, next) {
  try {
    const deletedSupplier = await supplierService.deleteSupplier(req.params.id);

    if (!deletedSupplier) {
      return next(
        errorResponder(errorTypes.NOT_FOUND, "Supplier not found")
      );
    }

    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    return next(
      errorResponder(errorTypes.SERVER, error.message)
    );
  }
}

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};