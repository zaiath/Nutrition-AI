require('dotenv').config();
const { MongoClient } = require('mongodb');

// Hardcode your connection string temporarily
const URI = "mongodb://admin:password@localhost:27018/nutrition?authSource=admin";

async function testWithPostman() {
  const client = new MongoClient(URI);
  
  try {
    // 1. Connect
    await client.connect();
    
    // 2. Test insert
    const db = client.db("nutrition");
    const result = await db.collection("dishes").insertOne({
      test: "from_postman",
      date: new Date()
    });
    
    return {
      success: true,
      insertedId: result.insertedId
    };
    
  } catch (err) {
    return {
      error: err.message,
      solution: "Check MongoDB container is running"
    };
  } finally {
    await client.close();
  }
}

module.exports = { testWithPostman };