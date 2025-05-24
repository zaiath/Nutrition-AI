const axios = require('axios');


// Add this debug route ABOVE your existing /nutrition endpoint
app.get('/test', (req, res) => {
    res.send("Server is working!");
  });
  
  // Your existing /nutrition endpoint

  app.post('/nutrition', (req, res) => {
    console.log("Raw request body:", req.body);
    res.json({ 
      message: "POST received",
      yourData: req.body 
    });
  });
//   app.post('/nutrition', async (req, res) => {
//     console.log("Received request for:", req.body.dish); // Debug log
//     try {
//       const nutrition = await getNutrition(req.body.dish);
//       await saveToDB(req.body.dish, nutrition);
//       res.json(nutrition);
//     } catch (err) {
//       console.error("Full error:", err); // Detailed logging
//       res.status(500).json({ error: err.message });
//     }
//   });
async function getNutrition(dish) {
  const prompt = `Return nutrition facts for ${dish} as JSON with ONLY these fields: 
    { "calories": number, "protein_g": number, "fat_g": number, "carbs_g": number }`;

  const response = await axios.post('http://localhost:11502/api/generate', {
    model: "deepseek-r1:7b",
    prompt: prompt,
    stream: false,
    format: "json"
  });

  return JSON.parse(response.data.response);
}

// Test with chicken biryani
getNutrition("chicken biryani").then(console.log).catch(console.error);