# Dokumentasi API Sistem Manajemen Gudang (Warehouse Management System)
Oleh: Arasel Bezaleel Thenilo (240030052)

## Deskripsi Singkat
Aplikasi ini adalah layanan backend (REST API) untuk Sistem Manajemen Gudang (WMS). Sistem dirancang untuk menangani operasional logistik mulai dari pengelolaan data master (produk, kategori, supplier), pengadaan barang (*procurement*), hingga pencatatan keluar-masuk barang (*inventory logging*) secara *real-time*.

Sistem memisahkan hak akses antara **Administrator** (manajemen data & keuangan) dan **Staff** (operasional gudang & penerimaan barang). Keunggulan utama sistem ini meliputi integritas data menggunakan transaksi database atomik, keamanan berbasis token, dan audit trail yang lengkap.

Jika ingin mencobanya, jangan lupa ganti `username`, `password`, serta `jwt_token` yang hendak dipakai.
Terkait dokumentasi API lebih lengkap dapat diakses dengan, contoh:
```plaintext
DB_HOST=localhost
API_PORT=3000

Maka link yang dapat diakses adalah: http://localhost:3000/api-docs

```

---

## Daftar Isi
1. [Arsitektur & Teknologi Utama](#arsitektur--teknologi-utama)  
2. [Struktur Folder](#struktur-folder)  
3. [Mekanisme Autentikasi](#mekanisme-autentikasi)  
4. [Daftar Endpoint API](#daftar-endpoint-api)  
5. [Contoh Request & Response](#contoh-request--response)

---

## Arsitektur & Teknologi Utama

### Desain RESTful API
Kami menerapkan standar HTTP Method yang ketat untuk efisiensi dan keamanan:

- **POST:** Membuat resource baru (Create).  
- **GET:** Mengambil data (Read).  
- **PATCH:** Pembaruan data parsial (Partial Update). Digunakan menggantikan PUT agar klien hanya mengirim field yang berubah, mengurangi beban payload.  
- **DELETE:** Mengimplementasikan **Soft Delete** (menggunakan fitur `paranoid: true` pada Sequelize). Data tidak dihapus permanen, melainkan ditandai dengan timestamp `deletedAt` untuk audit dan *data recovery*.

### Keamanan & Autentikasi
- **JWT (JSON Web Token):** Digunakan untuk autentikasi *stateless*. Token berisi `role` (otorisasi Admin/Staff) dan `user_id` (otomatisasi pencatatan actor pada Purchase Order dan Inventory Log).  
- **Password Hashing:** Penggunaan Bcrypt melalui **Sequelize Hooks** (`beforeCreate` / `beforeUpdate`) untuk memastikan password tersimpan dalam bentuk hash sebelum disimpan di database.

---

## Struktur Folder

Proyek disusun dengan pola **MVC (Model-View-Controller)** yang dimodifikasi untuk API (tanpa View), dengan pemisahan tegas antara *logic*, *validation*, dan *routing*.

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

---

## Mekanisme Autentikasi

1. **Login:** Klien mengirim `username` dan `password` ke endpoint `/auth/login`.  
2. **Verifikasi:** Server memverifikasi hash password. Jika valid, server menerbitkan **Access Token (JWT)**.  
3. **Akses Resource:** Untuk mengakses endpoint yang dilindungi (mis. membuat PO atau menambah produk), klien wajib menyertakan header:
   ```
   Authorization: Bearer <your_token_here>
   ```
4. **Middleware Check:**
   - `verifyToken`: Memastikan token valid dan belum kadaluwarsa.  
   - `verifyAdminRole`: Memastikan user memiliki hak akses level Administrator.

---

## Daftar Endpoint API

Berikut ringkasan endpoint utama yang tersedia.

### A. Autentikasi (`/auth`)

| Method | URL      | Deskripsi                          | Akses       |
| ------ | -------- | ---------------------------------- | ------------|
| POST   | /login   | Masuk ke sistem & dapatkan Token   | Public      |
| GET    | /logout  | Keluar sistem (Client-side clear)  | Public      |
| GET    | /profile | Mengambil data diri akun           | Sudah Login |

---

### B. Master Data (Produk, Kategori, Supplier)  
Base URLs: `/users`, `/products`, `/categories`, `/suppliers`

| Method | Endpoint       | Body (JSON)           | Deskripsi                         |
| ------ | -------------- | -------------------   | ----------------------------------|
| GET    | `/`            | -                     | Mengambil semua data aktif        |
| GET    | `/:id`         | -                     | Mengambil detail per ID           |
| POST   | `/`            | `{ name, ... }`       | Membuat data baru (Admin Only)    |
| PATCH  | `/:id`         | `{ field_to_update }` | Update sebagian (Admin Only)      |
| DELETE | `/:id`         | -                     | Soft delete (Admin Only)          |
| GET    | `/deleted`     | -                     | Melihat semua data di "Trash Bin" (Admin Only) |
| GET    | `/deleted/:id` | -                     | Melihat satu di "Trash Bin" (Admin Only) |
| POST   | `/restore/:id` | -                     | Mengembalikan data yang dihapus (Admin Only) |

---

### C. Purchase Order (Transaksi Pembelian)  
Base URL: `/purchase-orders`

| Method | Endpoint             | Body (JSON)                              | Deskripsi |
| ------ | -------------------- | ---------------------------------------- | --------- |
| POST   | `/`                  | `{ supplier_id, product_id, quantity }`  | Admin membuat pesanan ke supplier (Admin Only)|
| PATCH  | `/receive/:id`       | `{ received_quantity? }`                 | **PENTING** Staff/Admin menerima barang. Update stok & log otomatis. |
| GET    | `/`                  | -                                        | Melihat history pesanan |
| GET    | `/:id`         | -                     | Mengambil detail pesanan per ID           |
| PATCH  | `/:id`         | `{ field_to_update }` | Update sebagian (Admin Only)      |
| DELETE | `/:id`         | -                     | Soft delete (Admin Only)          |
| GET    | `/deleted`     | -                     | Melihat semua data di "Trash Bin" (Admin Only) |
| GET    | `/deleted/:id` | -                     | Melihat satu di "Trash Bin" (Admin Only) |
| POST   | `/restore/:id` | -                     | Mengembalikan data yang dihapus (Admin Only) |

---

### D. Inventory Log (Audit Trail)  
Base URL: `/inventory-logs`

| Method | Endpoint | Body (JSON)                                     | Deskripsi |
| ------ | -------- | ----------------------------------------------- | --------- |
| GET    | `/`      | -                                               | Melihat riwayat keluar-masuk barang |
| GET    | `/:id`   | -                                               | Mengambil detail riwayat keluar-masuk barang per ID           |
| POST   | `/`      | `{ product_id, type, quantity, reason }`        | Mencatat penyesuaian stok manual (rusak/hilang) |

---

## Contoh Request & Response

### 1. Login Berhasil
**Request:** `POST /api/auth/login`

```json
{
  "email": "admin@gudang.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
}
```
Token disimpan melalui cookie untuk user

---

### 2. Menerima Barang (Receive Order)
Endpoint ini menggunakan transaksi database untuk mengupdate status PO, menambah stok Produk, dan membuat Log.

**Request:** `PATCH /purchase-orders/receive/15`  
(Header: `Authorization: Bearer <token>`)

```json
{
  "received_quantity": 50
  // Opsional. Jika kosong, sistem menganggap jumlah sesuai pesanan awal.
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Barang berhasil diterima dan stok diperbarui.",
  "data": {
    "received": 50,
    "current_stock": 120
  }
}
```

---

### 3. Response Error (Contoh: Validasi Gagal dengan Joi)
**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": [
    ""quantity" must be a number",
    ""supplier_id" is required"
  ]
}
```