import User from './User.js';
import Product from './Product.js';
import Category from './Category.js';
import Supplier from './Supplier.js';
import InventoryLog from './InventoryLog.js';
import PurchaseOrder from './PurchaseOrder.js';

/* User Relationship(s) */
User.hasMany(PurchaseOrder, {
    foreignKey: 'user_id'
});

User.hasMany(InventoryLog, {
    foreignKey: 'user_id'
});
/* End User Relationship(s) */

/* Product Relationship(s) */
Product.belongsTo(Category, {
    foreignKey: 'category_id'
});

Product.hasMany(PurchaseOrder, {
    foreignKey: 'product_id'
})

Product.hasMany(InventoryLog, {
    foreignKey: 'product_id'
});
/* End Product Relationship(s) */

/* Category Relationship(s) */
Category.hasMany(Product, {
    foreignKey: 'category_id'
});
/* End Category Relationship(s) */

/* Supplier Relationship(s) */
Supplier.hasMany(PurchaseOrder, {
    foreignKey: 'supplier_id'
});
/* End Supplier Relationship(s) */

/* Inventory Log Relationship(s) */
InventoryLog.belongsTo(Product, {
    foreignKey: 'product_id'
});

InventoryLog.belongsTo(User, {
    foreignKey: 'user_id'
});
/* End Inventory Log Relationship(s) */

/* Purchase Order Relationship(s) */
PurchaseOrder.belongsTo(Supplier, {
    foreignKey: 'supplier_id'
});

PurchaseOrder.belongsTo(Product, {
    foreignKey: 'product_id'
});

PurchaseOrder.belongsTo(User, {
    foreignKey: 'admin_id'
});
/* End Purchase Order Relationship(s) */