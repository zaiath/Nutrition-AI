const axios = require('axios');

async function testOllama() {
  try {
    const response = await axios.post('http://localhost:11502/api/generate', {
      model: "deepseek-r1:7b",
      prompt: "Return ONLY this exact JSON: {\"message\":\"Hello from Ollama\"}",
      stream: false,
      format: "json"  // ← Key addition to enforce JSON
    });

    console.log("Cleaned response:", JSON.parse(response.data.response));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testOllama();