const { MongoClient } = require('mongodb');

// Your confirmed working connection string
const URI = "mongodb://admin:password@localhost:27018/nutrition?authSource=admin";

class NutritionDB {
  constructor() {
    this.client = new MongoClient(URI, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000
    });
  }

  async saveNutrition(dish, nutritionData) {
    try {
      await this.client.connect();
      const db = this.client.db("nutrition");
      const result = await db.collection("dishes").insertOne({
        name: dish,
        ...nutritionData,
        createdAt: new Date()
      });
      return result.insertedId;
    } finally {
      await this.client.close();
    }
  }

  async getHistory() {
    try {
      await this.client.connect();
      const db = this.client.db("nutrition");
      return await db.collection("dishes")
        .find()
        .sort({ createdAt: -1 })
        .limit(20)
        .toArray();
    } finally {
      await this.client.close();
    }
  }
}

module.exports = new NutritionDB();