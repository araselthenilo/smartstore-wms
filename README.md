```plaintext
src/
│   .env
│   .env.example
│   .gitignore
│   index.js
│   package-lock.json
│   package.json
│   README.md
├───node_modules
│
├───controllers
│       auth.controller.js
│       category.controller.js
│       inventoryLog.controller.js
│       product.controller.js
│       purchaseOrder.controller.js
│       supplier.controller.js
│       user.controller.js
│
├───docs
│       openapi.yaml
│
├───middlewares
│   ├───auth
│   │       validateLoginData.middleware.js
│   │       verifyAdminRole.middleware.js
│   │       verifyToken.middleware.js
│   │
│   ├───category
│   │       validateNewCategoryData.middleware.js
│   │       validateUpdateCategoryData.middleware.js
│   │
│   ├───inventoryLog
│   │       validateNewInventoryLogData.middleware.js
│   │       validateUpdateInventoryLogData.middleware.js
│   │
│   ├───product
│   │       validateNewProductData.middleware.js
│   │       validateUpdateProductData.middleware.js
│   │
│   ├───purchaseOrder
│   │       validateNewPurchaseOrderData.middleware.js
│   │       validateReceivePurchaseOrderData.middleware.js
│   │       validateUpdatePurchaseOrderData.middleware.js
│   │
│   ├───supplier
│   │       validateNewSupplierData.middleware.js
│   │       validateUpdateSupplierData.middleware.js
│   │
│   └───user
│           validateNewUserData.middleware.js
│           validateUpdateUserData.middleware.js
│
├───models
│       Category.js
│       index.js
│       InventoryLog.js
│       Product.js
│       PurchaseOrder.js
│       Supplier.js
│       User.js
│
├───routes
│       auth.route.js
│       category.route.js
│       inventoryLog.route.js
│       product.route.js
│       purchaseOrder.route.js
│       supplier.route.js
│       user.route.js
│
├───utils
│       db.util.js
│
└───validators
    ├───auth
    │       login.schema.js
    │
    ├───category
    │       category.schema.js
    │       updateCategory.schema.js
    │
    ├───inventoryLog
    │       inventoryLog.schema.js
    │
    ├───product
    │       product.schema.js
    │       updateProduct.schema.js
    │
    ├───purchaseOrder
    │       purchaseOrder.schema.js
    │       receivePurchaseOrder.schema.js
    │       updatePurchaseOrder.schema.js
    │
    ├───supplier
    │       supplier.schema.js
    │       updateSupplier.schema.js
    │
    └───user
            updateUser.schema.js
            user.schema.js
```