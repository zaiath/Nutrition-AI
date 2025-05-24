const { MongoClient } = require('mongodb');

// Use your exact connection details
const uri = "mongodb://admin:password@localhost:27018/nutrition?authSource=admin";

async function testConnection() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
    
    const db = client.db("nutrition");
    const collection = db.collection("dishes");
    
    // Insert test document
    const result = await collection.insertOne({
      test: "simple_connection_works",
      timestamp: new Date()
    });
    console.log("📝 Inserted document ID:", result.insertedId);
    
    // Verify by counting documents
    const count = await collection.countDocuments();
    console.log("📊 Total documents:", count);
    
    return true;
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    return false;
  } finally {
    await client.close();
  }
}

// Run the test immediately
testConnection();