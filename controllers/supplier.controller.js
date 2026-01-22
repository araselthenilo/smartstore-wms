import Supplier from '../models/Supplier.js';
import { Op } from 'sequelize';

const getAllDeletedSuppliers = async (req, res) => {
    try {
        const deletedSuppliers = await Supplier.findAll({
            paranoid: false,
            where: {
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        res.status(200).json({
            success: true,
            deletedSuppliers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getDeletedSupplierByID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSupplier = await Supplier.findOne({
            paranoid: false,
            where: {
                supplier_id: id,
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        if (!deletedSupplier) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found or is not deleted.'
            });
        }

        res.status(200).json({
            success: true,
            deletedSupplier
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const restoreDeletedSupplierByID = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSupplier = await Supplier.findOne({
            paranoid: false,
            where: {
                supplier_id: id,
                deletedAt: {
                    [Op.not]: null
                }
            }
        });

        if (!deletedSupplier) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found or is not deleted.'
            });
        }

        await deletedSupplier.restore();

        res.status(200).json({
            success: true,
            message: 'Supplier successfully restored!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const createSupplier = async (req, res) => {
    try {
        const createdSupplier = await Supplier.create(req.validData);

        const userResponse = {
            supplier_id: createdSupplier.supplier_id,
            name: createdSupplier.name,
            contact_person: createdSupplier.contact_person
        };

        res.status(201).json({
            success: true,
            message: 'Supplier successfully created!',
            data: userResponse
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();

        res.status(200).json({
            success: true,
            suppliers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const getSupplierByID = async (req, res) => {
    try {
        const { id } = req.params;

        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found or is deleted.'
            });
        }

        res.status(200).json({
            success: true,
            supplier
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const updateSupplierByID = async (req, res) => {
    try {
        const { id } = req.params;

        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found or is deleted.'
            });
        }

        await supplier.update(req.validData);

        res.status(200).json({
            success: true,
            message: 'Supplier successfully updated!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

const deleteSupplierByID = async (req, res) => {
    try {
        const { id } = req.params;

        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found or is deleted.'
            });
        }

        supplier.destroy();

        res.status(200).json({
            success: true,
            message: 'Supplier successfully deleted!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.'
        });
    }
};

export default {
    getAllDeletedSuppliers,
    getDeletedSupplierByID,
    restoreDeletedSupplierByID,
    createSupplier,
    getAllSuppliers,
    getSupplierByID,
    updateSupplierByID,
    deleteSupplierByID
};