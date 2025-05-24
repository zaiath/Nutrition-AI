require('dotenv').config();
const axios = require('axios');

class OllamaNutrition {
  constructor() {
    this.ollamaUrl = `${process.env.OLLAMA_URL}/api/generate`;
  }

  async getNutrition(dishName) {
    const prompt = `Provide nutrition facts for ${dishName} in JSON format with: calories, protein_g, fat_g, carbs_g. Only return valid JSON.`;
    
    const response = await axios.post(this.ollamaUrl, {
      model: "deepseek-r1:7b",
      prompt: prompt,
      stream: false
    });

    return JSON.parse(response.data.response);
  }
}

module.exports = new OllamaNutrition();