# Practical 09: File Upload Module using Multer & MongoDB Metadata Storage

## 🎯 Practical Objective
Create a file upload module using **Multer middleware** in Express.js, validate file formats and limits (size, MIME types), save files securely to disk storage, and store comprehensive file metadata in **MongoDB**.

---

## 🛠️ Architecture & Concepts
- **Multer DiskStorage**:
  - Timestamp & random suffix for Collision-free filenames.
  - MIME type filtering: `image/jpeg`, `image/png`, `application/pdf`, `docx`, `txt`.
  - File size restriction: Max `5 MB`.
- **Mongoose Schema (`FileMetadata`)**:
  - `originalName`, `storedFileName`, `mimeType`, `sizeBytes`, `filePath`, `category`, `uploadedBy`, `uploadedAt`.
- **Endpoints**:
  - `POST /api/files/upload`: Multer single file upload + MongoDB save.
  - `GET /api/files`: Retrieve all uploaded files metadata list.
  - `GET /api/files/:id/download`: Direct stream file download.
  - `DELETE /api/files/:id`: Remove physical file from disk & remove MongoDB document.

---

## 🚀 How to Run Locally
```bash
cd Practical-09_Express_Multer_FileUpload_MongoDB
npm install
node server.js
```
Open [http://localhost:5000](http://localhost:5000) or open in Apache XAMPP [http://localhost/Practicals_Journal/Practical-09_Express_Multer_FileUpload_MongoDB/](http://localhost/Practicals_Journal/Practical-09_Express_Multer_FileUpload_MongoDB/).
