# MongoDB Atlas Database Migration

A simple Node.js utility to migrate all collections and documents from one MongoDB Atlas database to another.

This tool is useful when:

- Migrating data between two MongoDB Atlas clusters
- Creating a copy of an existing database
- Moving a project to a new Atlas cluster
- Backing up data into another database

---

## Features

- Copies all collections automatically
- Preserves document `_id` values
- Creates collections in the destination database if they don't exist
- Supports migration between different MongoDB Atlas clusters
- Simple setup with environment variables

---

## Technologies

- Node.js
- MongoDB Node.js Driver
- dotenv

---

## Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or later recommended)
- npm
- Two MongoDB Atlas databases (Source & Destination)

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project

```bash
cd mongodb-atlas-migration
```

### 3. Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
SOURCE_URI=mongodb+srv://<username>:<password>@source-cluster.mongodb.net/?retryWrites=true&w=majority

TARGET_URI=mongodb+srv://<username>:<password>@destination-cluster.mongodb.net/?retryWrites=true&w=majority

SOURCE_DB=YourSourceDatabase
TARGET_DB=YourDestinationDatabase
```

Replace:

- `<username>`
- `<password>`
- `YourSourceDatabase`
- `YourDestinationDatabase`

with your own values.

---

## Running the Script

Execute:

```bash
node index.js
```

If the migration is successful, you'll see output similar to:

```text
Found 12 collections

Copying users...
✔ users (52 documents)

Copying products...
✔ products (180 documents)

Copying orders...
✔ orders (94 documents)

Migration completed successfully!
```

---

## What Gets Copied

- Collections
- Documents
- ObjectIds
- Dates
- Nested Objects
- Arrays

---

## What Does NOT Get Copied

This script does **not** copy:

- Collection indexes
- Database users
- Atlas configuration
- Triggers
- Functions
- Network settings

---

## Project Structure

```text
.
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Notes

- The source database is **read-only** during migration.
- Existing data in the destination database is not deleted.
- If a document with the same `_id` already exists in the destination, MongoDB will throw a duplicate key error.

---

## License

This project is licensed under the MIT License.