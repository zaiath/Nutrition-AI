require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const axios = require('axios');

// 1. Initialize Express app FIRST
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

// 2. MongoDB Connection
const uri = "mongodb://admin:password@localhost:27018/nutrition?authSource=admin";
const mongoUri = "mongodb://admin:password@localhost:27018/nutrition?authSource=admin";
const client = new MongoClient(uri);

// 3. Nutrition Analysis Function
async function getNutrition(dish) {
  const response = await axios.post('http://localhost:11502/api/generate', {
    model: "deepseek-r1:7b",
    prompt: `Return JSON nutrition for ${dish}: {"calories":number,"protein_g":number,"fat_g":number,"carbs_g":number}`,
    stream: false,
    format: "json"
  });
  return JSON.parse(response.data.response);
}

// 4. API Endpoints
app.post('/nutrition', async (req, res) => {
  try {
    const nutrition = await getNutrition(req.body.dish);
    
    // Save to MongoDB
    await client.connect();
    const db = client.db("nutrition");
    await db.collection("dishes").insertOne({
      name: req.body.dish,
      ...nutrition,
      createdAt: new Date()
    });
    
    res.json({ success: true, nutrition });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// 5. Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});