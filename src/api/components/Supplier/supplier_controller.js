const supplierService = require("./supplier_service");

async function getAllSuppliers(req, res) {
  try {
    const suppliers = await supplierService.getSuppliers();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSupplierById(req, res) {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createSupplier(req, res) {
  try {
    const newSupplier = await supplierService.createSupplier(req.body);
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateSupplier(req, res) {
  try {
    const updatedSupplier = await supplierService.updateSupplier(
      req.params.id,
      req.body,
    );

    if (!updatedSupplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteSupplier(req, res) {
  try {
    const deletedSupplier = await supplierService.deleteSupplier(req.params.id);

    if (!deletedSupplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};