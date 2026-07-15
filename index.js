require("dotenv").config();
const { MongoClient } = require("mongodb");

async function migrate() {
  const sourceClient = new MongoClient(process.env.SOURCE_URI);
  const targetClient = new MongoClient(process.env.TARGET_URI);

  try {
    await sourceClient.connect();
    await targetClient.connect();

    const sourceDb = sourceClient.db(process.env.SOURCE_DB);
    const targetDb = targetClient.db(process.env.TARGET_DB);

    const collections = await sourceDb.listCollections().toArray();

    console.log(`Found ${collections.length} collections\n`);

    for (const { name } of collections) {
      console.log(`Copying ${name}...`);

      const docs = await sourceDb.collection(name).find({}).toArray();

      // Skip if collection is empty
      if (docs.length > 0) {
        await targetDb.collection(name).insertMany(docs);
      }

      console.log(`✔ ${name} (${docs.length} documents)\n`);
    }

    console.log("Database migration completed successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await sourceClient.close();
    await targetClient.close();
  }
}

migrate();